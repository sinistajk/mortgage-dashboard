'use client';

import { useState } from 'react';
import { leads } from '@/lib/mockData';
import { useTheme } from '@/components/ThemeProvider';
import NurtureDetailPanel from '@/components/NurtureDetailPanel';

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

function StatusPill({ status, t }) {
  const configs = {
    New: { bg: '#eff6ff', text: '#2563eb' },
    Contacted: { bg: '#f5f3ff', text: '#7c3aed' },
    Qualified: { bg: '#f0fdf4', text: '#16a34a' },
    Booked: { bg: '#ecfdf5', text: '#059669' },
  };
  const s = configs[status] || { bg: t.tableHead, text: t.textMuted };
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
  const { t } = useTheme();
  const [selectedLead, setSelectedLead] = useState(null);

  const warmLeads = nurtureLeads.filter(l => l.routing === 'WARM');
  const coldLeads = nurtureLeads.filter(l => l.routing === 'COLD');

  return (
    <>
      <div className="p-6 lg:p-8 min-h-screen transition-colors duration-300" style={{ background: t.pageBg }}>
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold" style={{ color: t.heading }}>Nurture Queue</h1>
          <p className="text-sm mt-1" style={{ color: t.textMuted }}>
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
            <div
              key={label}
              className="rounded-xl p-4 shadow-sm transition-colors duration-300"
              style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
            >
              <p className="text-xs uppercase tracking-wider font-medium" style={{ color: t.textMuted }}>{label}</p>
              <p className="text-2xl font-bold mt-1" style={{ color: t.heading }}>{value}</p>
              <p className="text-xs mt-0.5" style={{ color: t.textMuted }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div
          className="rounded-xl shadow-sm overflow-hidden transition-colors duration-300"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{ borderBottom: `1px solid ${t.divider}` }}
          >
            <h2 className="text-sm font-semibold" style={{ color: t.text }}>All Sequences</h2>
            <span className="text-xs" style={{ color: t.textMuted }}>
              {nurtureLeads.length} leads · click any row to view details
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ background: t.tableHead, borderBottom: `1px solid ${t.divider}` }}>
                <tr>
                  {['Lead', 'Routing', 'Sequence', 'Progress', 'Last Sent', 'Next Message', 'Status'].map(h => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: t.textMuted }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {nurtureLeads.map(lead => {
                  const isSelected = selectedLead?.id === lead.id;
                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(isSelected ? null : lead)}
                      className="cursor-pointer transition-colors duration-150"
                      style={{
                        borderBottom: `1px solid ${t.divider}`,
                        background: isSelected ? t.sidebarActiveBg : undefined,
                      }}
                      onMouseEnter={e => {
                        if (!isSelected) e.currentTarget.style.background = t.tableRowHover;
                      }}
                      onMouseLeave={e => {
                        if (!isSelected) e.currentTarget.style.background = '';
                      }}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{
                              background:
                                lead.routing === 'HOT' ? '#ef4444' :
                                lead.routing === 'WARM' ? '#f59e0b' : '#94a3b8',
                            }}
                          >
                            {lead.firstName[0]}{lead.lastName[0]}
                          </div>
                          <div>
                            <p className="text-sm font-semibold" style={{ color: t.heading }}>
                              {lead.firstName} {lead.lastName}
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: t.textMuted }}>
                              {lead.source} · ${(lead.loanAmount / 1000).toFixed(0)}k {lead.loanType}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <RoutingPill routing={lead.routing} />
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="text-sm" style={{ color: t.text }}>{lead.nurtureSequence}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-20 rounded-full h-1.5" style={{ background: t.scoreTrack }}>
                            <div
                              className="rounded-full h-1.5"
                              style={{
                                width: `${(lead.nurtureDay / lead.nurtureTotal) * 100}%`,
                                background: t.accent,
                              }}
                            />
                          </div>
                          <span className="text-xs whitespace-nowrap" style={{ color: t.textSub }}>
                            Day {lead.nurtureDay} of {lead.nurtureTotal}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-sm" style={{ color: t.textSub }}>{lead.lastMessageSent}</td>
                      <td className="px-4 py-3.5">
                        <p
                          className="text-sm font-medium"
                          style={{
                            color:
                              lead.nextMessageScheduled?.toLowerCase().includes('today')
                                ? '#d97706'
                                : t.text,
                          }}
                        >
                          {lead.nextMessageScheduled}
                        </p>
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusPill status={lead.status} t={t} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <NurtureDetailPanel lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </>
  );
}
