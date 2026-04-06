import prisma from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getLead(id) {
  const lead = await prisma.lead.findUnique({
    where: { id }
  });
  if (!lead) notFound();
  return lead;
}

export default async function LeadPage({ params }) {
  const { id } = await params;
  const lead = await getLead(id);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">

        {/* Back button */}
        <Link href="/" className="text-sm text-blue-600 hover:underline mb-6 block">
          ← Back to pipeline
        </Link>

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{lead.firstName}</h1>
              <p className="text-gray-500 mt-1">{lead.source} · {lead.phone}</p>
            </div>
            <div className="text-right">
              {lead.score !== null && (
                <p className="text-3xl font-bold text-gray-900">{lead.score}<span className="text-lg text-gray-400">/24</span></p>
              )}
              {lead.routing && (
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  lead.routing === 'HOT' ? 'bg-red-100 text-red-700' :
                  lead.routing === 'WARM' ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>{lead.routing}</span>
              )}
            </div>
          </div>
        </div>

        {/* Broker summary */}
        {lead.brokerSummary && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-2">Summary</h2>
            <p className="text-gray-600">{lead.brokerSummary}</p>
          </div>
        )}

        {/* Talking points */}
        {lead.talkingPoints && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-3">Talking Points</h2>
            <ul className="space-y-2">
              {lead.talkingPoints.map((point, i) => (
                <li key={i} className="flex gap-2 text-gray-600">
                  <span className="text-green-500 font-bold">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Flags */}
        {lead.flags && lead.flags.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-3">Flags to Watch</h2>
            <ul className="space-y-2">
              {lead.flags.map((flag, i) => (
                <li key={i} className="flex gap-2 text-gray-600">
                  <span className="text-yellow-500">⚠</span>
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Qualification data */}
        {lead.extractedData && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-3">Qualification Data</h2>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(lead.extractedData).map(([key, value]) => (
                value && (
                  <div key={key} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">{key.replace(/_/g, ' ')}</p>
                    <p className="text-sm font-medium text-gray-800 mt-1">{String(value)}</p>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}