import prisma from '@/lib/db';
import Link from 'next/link';

// This runs on the server and fetches leads from the database
async function getLeads() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return leads;
}

// Colour coding for each routing type
function RoutingBadge({ routing }) {
  const styles = {
    HOT: 'bg-red-100 text-red-700',
    WARM: 'bg-orange-100 text-orange-700',
    COLD: 'bg-blue-100 text-blue-700',
    default: 'bg-gray-100 text-gray-600',
  };

  const style = styles[routing] || styles.default;

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${style}`}>
      {routing || 'Qualifying'}
    </span>
  );
}

export default async function DashboardPage() {
  const leads = await getLeads();

  const hot  = leads.filter(l => l.routing === 'HOT');
  const warm = leads.filter(l => l.routing === 'WARM');
  const cold = leads.filter(l => l.routing === 'COLD');
  const qualifying = leads.filter(l => !l.routing);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lead Pipeline</h1>
          <p className="text-gray-500 mt-1">{leads.length} total leads</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-500">Hot</p>
            <p className="text-3xl font-bold text-red-600">{hot.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-500">Warm</p>
            <p className="text-3xl font-bold text-orange-500">{warm.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-500">Cold</p>
            <p className="text-3xl font-bold text-blue-500">{cold.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-500">Qualifying</p>
            <p className="text-3xl font-bold text-gray-600">{qualifying.length}</p>
          </div>
        </div>

        {/* Leads table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Name</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Source</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Score</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Routing</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Created</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <Link href={`/leads/${lead.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                      {lead.firstName}
                    </Link>
                  </td>
                  <td className="p-4 text-sm text-gray-500">{lead.source || '—'}</td>
                  <td className="p-4 text-sm text-gray-500">{lead.status}</td>
                  <td className="p-4 text-sm font-medium text-gray-900">
                    {lead.score !== null ? `${lead.score}/24` : '—'}
                  </td>
                  <td className="p-4">
                    <RoutingBadge routing={lead.routing} />
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">
                    No leads yet. Send a test lead to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}