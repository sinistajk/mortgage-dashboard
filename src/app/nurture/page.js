'use client';

import { leads } from '@/lib/mockData';

const nurtureLeads = leads.filter(l => l.nurtureSequence !== null);

function RoutingPill({ routing }) {
  const configs = {
    HOT: { bg: '#fef2f2', text: '#dc2626', dot: '#ef4444' },
    WARM: { bg: '#fffbeb', text: '#d97706', dot: '#f59e0b' },
    COLD: { bg: '#f8fafc', text: '#64748b', dot: '#94a3b8' },
  };
  const s = configs[routing] || configs.COLD;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-bold"
      style={{ background: s.bg, color: s.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />
      {routing}
    </span>
  );
}

function StatusPill({ status }) {
  const configs = {
    New: { bg: '#eff6ff', text: '#2563eb' },
    Contacted: { bg: '#f5f3ff', text: '#7c3aed' },
    Qualified: { bg: '#f0fdf4', text: '#16a34a' },
    Booked: { bg: '#ecfdf5', text: '#059669' },
  };
  const s = configs[status] || { bg: '#f1f5f9', text: '#64748b' };
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: s.bg, color: s.text }}
    >
      {status}
    </span>
  );
}

export default function NurturePage() {
  const warmLeads = nurtureLeads.filter(l => l.routing === 'WARM');
  const coldLeads = nurtureLeads.filter(l => l.routing === 'COLD');

  return (
    <div className="p-6 lg:p-8 min-h-screen" style={{ background: '#f8fafc' }}>
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold" style={{ color: '#0f2044' }}>Nurture Queue</h1>
        <p className="text-sm text-gray-500 mt-1">
          {nurtureLeads.length} leads in automated SMS sequences ·{' '}
          {warmLeads.length} Warm, {coldLeads.length} Cold
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-7">
        {[
          { label: 'Active Sequences', value: nurtureLeads.length, sub: 'All routing tiers' },
          {
            label: 'Avg Sequence Progress',
            value: `${Math.round(
              nurtureLeads.reduce((a, l) => a + l.nurtureDay / l.nurtureTotal, 0) / nurtureLeads.length * 100
            )}%`,
            sub: 'Across all leads',
          },
          {
            label: 'Messages Scheduled Today',
            value: nurtureLeads.filter(l =>
              l.nextMessageScheduled?.toLowerCase().includes('today') ||
              l.nextMessageScheduled?.toLowerCase().includes('tomorrow')
            ).length,
            sub: 'Sending in next 24 hrs',
          },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: '#0f2044' }}>{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">All Sequences</h2>
          <span className="text-xs text-gray-400">{nurtureLeads.length} leads</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
              <tr>
                {['Lead', 'Routing', 'Sequence', 'Progress', 'Last Sent', 'Next Message', 'Status'].map(h => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#94a3b8' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {nurtureLeads.map(lead => (
                <tr
                  key={lead.id}
                  style={{ borderBottom: '1px solid #f8fafc' }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-semibold text-gray-900">
                      {lead.firstName} {lead.lastName}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {lead.source} · ${(lead.loanAmount / 1000).toFixed(0)}k {lead.loanType}
                    </p>
                  </td>
                  <td className="px-4 py-3.5">
                    <RoutingPill routing={lead.routing} />
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm text-gray-700">{lead.nurtureSequence}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-20 rounded-full h-1.5" style={{ background: '#e2e8f0' }}>
                        <div
                          className="rounded-full h-1.5"
                          style={{
                            width: `${(lead.nurtureDay / lead.nurtureTotal) * 100}%`,
                            background: '#4d9fff',
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        Day {lead.nurtureDay} of {lead.nurtureTotal}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-500">{lead.lastMessageSent}</td>
                  <td className="px-4 py-3.5">
                    <p
                      className="text-sm font-medium"
                      style={{
                        color:
                          lead.nextMessageScheduled?.toLowerCase().includes('today')
                            ? '#d97706'
                            : '#374151',
                      }}
                    >
                      {lead.nextMessageScheduled}
                    </p>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusPill status={lead.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
