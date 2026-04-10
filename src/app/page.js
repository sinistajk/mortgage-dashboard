'use client';

import { useState, useMemo } from 'react';
import { leads } from '@/lib/mockData';
import { useTheme } from '@/components/ThemeProvider';
import LeadDetailPanel from '@/components/LeadDetailPanel';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(amount) {
  return amount >= 1000000
    ? `$${(amount / 1000000).toFixed(2)}M`
    : `$${(amount / 1000).toFixed(0)}k`;
}

function pipelineValue(list) {
  const total = list.reduce((s, l) => s + l.loanAmount, 0);
  return total >= 1000000
    ? `$${(total / 1000000).toFixed(1)}M`
    : `$${(total / 1000).toFixed(0)}k`;
}

// ─── Badge components ─────────────────────────────────────────────────────────

function RoutingBadge({ routing }) {
  const configs = {
    HOT: { bg: '#fef2f2', text: '#dc2626', dot: '#ef4444' },
    WARM: { bg: '#fffbeb', text: '#d97706', dot: '#f59e0b' },
    COLD: { bg: '#f8fafc', text: '#64748b', dot: '#94a3b8' },
  };
  const s = configs[routing] || { bg: '#f1f5f9', text: '#64748b', dot: '#94a3b8' };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
      style={{ background: s.bg, color: s.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />
      {routing || 'NEW'}
    </span>
  );
}

function StatusBadge({ status }) {
  const configs = {
    New: { bg: '#eff6ff', text: '#2563eb' },
    Contacted: { bg: '#f5f3ff', text: '#7c3aed' },
    Qualified: { bg: '#f0fdf4', text: '#16a34a' },
    Booked: { bg: '#ecfdf5', text: '#059669' },
    Closed: { bg: '#f1f5f9', text: '#64748b' },
  };
  const s = configs[status] || { bg: '#f1f5f9', text: '#64748b' };
  return (
    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: s.bg, color: s.text }}>
      {status}
    </span>
  );
}

// ─── Hot Lead Banner ──────────────────────────────────────────────────────────

function HotLeadBanner({ lead, t, onViewBrief }) {
  if (!lead) return null;
  return (
    <div
      className="rounded-xl mb-6 hot-lead-glow"
      style={{
        background: t.cardBg,
        border: `1px solid #fecaca`,
        borderLeftWidth: '4px',
        borderLeftColor: '#ef4444',
      }}
    >
      <div className="p-4 flex items-center gap-4">
        <div className="relative flex-shrink-0 flex items-center justify-center w-10 h-10">
          <span className="animate-ping absolute inline-flex w-8 h-8 rounded-full opacity-30" style={{ background: '#ef4444' }} />
          <span className="relative flex items-center justify-center w-8 h-8 rounded-full" style={{ background: '#fef2f2' }}>
            <span className="text-base">🔥</span>
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ background: '#fef2f2', color: '#dc2626' }}
            >
              Hot Lead
            </span>
            <span className="text-base font-bold" style={{ color: t.heading }}>
              {lead.firstName} {lead.lastName}
            </span>
            <span className="text-xs" style={{ color: t.textMuted }}>· {lead.lastContacted}</span>
          </div>
          <p className="text-sm truncate" style={{ color: t.textSub }}>
            {lead.brokerSummary?.slice(0, 110)}…
          </p>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-xs" style={{ color: t.textMuted }}>Loan Amount</p>
            <p className="text-lg font-bold" style={{ color: t.heading }}>{fmt(lead.loanAmount)}</p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs" style={{ color: t.textMuted }}>AI Score</p>
            <p className="text-lg font-bold" style={{ color: t.accent }}>{lead.score}/24</p>
          </div>
          <button
            onClick={() => onViewBrief(lead)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: t.accent }}
          >
            View Call Brief
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Stat Cards ───────────────────────────────────────────────────────────────

function StatCards({ all, t }) {
  const hot = all.filter(l => l.routing === 'HOT');
  const stats = [
    { label: 'Total Leads', value: all.length, sub: 'Active pipeline', color: t.heading },
    { label: 'Hot Leads', value: hot.length, sub: 'Ready to close', color: '#dc2626', badge: hot.length > 0 ? '🔥' : null },
    { label: 'Avg AI Response', value: '38s', sub: <span>vs <span className="line-through" style={{ color: t.textMuted }}>5 min</span> industry avg</span>, color: t.accent },
    { label: 'Pipeline Value', value: pipelineValue(all), sub: 'Across all leads', color: t.heading },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map(({ label, value, sub, color, badge }) => (
        <div
          key={label}
          className="rounded-xl p-5 shadow-sm transition-colors duration-300"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: t.textMuted }}>{label}</p>
          <div className="flex items-end gap-2 mt-1.5">
            <p className="text-3xl font-bold leading-none" style={{ color }}>{value}</p>
            {badge && <span className="text-lg mb-0.5">{badge}</span>}
          </div>
          <p className="text-xs mt-1.5" style={{ color: t.textMuted }}>{sub}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Filter Pills ─────────────────────────────────────────────────────────────

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'HOT', label: '🔥 Hot' },
  { key: 'WARM', label: 'Warm' },
  { key: 'COLD', label: 'Cold' },
];

function FilterPills({ active, counts, onChange, t }) {
  return (
    <div className="flex items-center gap-2">
      {FILTERS.map(({ key, label }) => {
        const isActive = active === key;
        const count = key === 'all' ? counts.all : counts[key] ?? 0;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all"
            style={{
              background: isActive ? t.heading : t.tableHead,
              color: isActive ? '#fff' : t.textMuted,
              border: `1px solid ${isActive ? t.heading : t.cardBorder}`,
            }}
          >
            {label}
            <span
              className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
              style={{
                background: isActive ? 'rgba(255,255,255,0.2)' : t.cardBorder,
                color: isActive ? '#fff' : t.textMuted,
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Pipeline Table ───────────────────────────────────────────────────────────

const COL_HEADERS = [
  { key: 'name', label: 'Name' },
  { key: 'routing', label: 'Score' },
  { key: 'source', label: 'Source' },
  { key: 'loanType', label: 'Loan Type' },
  { key: 'loanAmount', label: 'Amount' },
  { key: 'creditRange', label: 'Credit' },
  { key: 'status', label: 'Status' },
  { key: 'lastContacted', label: 'Last Contact' },
];

function PipelineTable({ leads: rows, onRowClick, selectedId, t }) {
  if (rows.length === 0) {
    return (
      <div className="text-center py-16" style={{ color: t.textMuted }}>
        <p className="text-sm">No leads in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead style={{ background: t.tableHead, borderBottom: `2px solid ${t.divider}` }}>
          <tr>
            {COL_HEADERS.map(h => (
              <th
                key={h.key}
                className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                style={{ color: t.textMuted }}
              >
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(lead => {
            const isSelected = lead.id === selectedId;
            return (
              <tr
                key={lead.id}
                onClick={() => onRowClick(lead)}
                className="cursor-pointer transition-colors duration-150"
                style={{
                  borderBottom: `1px solid ${t.divider}`,
                  background: isSelected ? t.sidebarActiveBg : undefined,
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = t.tableRowHover; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = ''; }}
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
                      <p className="text-xs" style={{ color: t.textMuted }}>{lead.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <RoutingBadge routing={lead.routing} />
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className="text-xs font-medium px-2 py-1 rounded-md"
                    style={{ background: t.tableHead, color: t.textSub, border: `1px solid ${t.cardBorder}` }}
                  >
                    {lead.source}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-sm" style={{ color: t.text }}>{lead.loanType}</td>
                <td className="px-4 py-3.5 text-sm font-semibold" style={{ color: t.heading }}>
                  {fmt(lead.loanAmount)}
                </td>
                <td className="px-4 py-3.5 text-sm" style={{ color: t.text }}>{lead.creditRange}</td>
                <td className="px-4 py-3.5"><StatusBadge status={lead.status} /></td>
                <td className="px-4 py-3.5 text-sm" style={{ color: t.textMuted }}>{lead.lastContacted}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { t } = useTheme();
  const [filter, setFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);

  const hotLead = leads.find(l => l.routing === 'HOT');

  const counts = useMemo(() => ({
    all: leads.length,
    HOT: leads.filter(l => l.routing === 'HOT').length,
    WARM: leads.filter(l => l.routing === 'WARM').length,
    COLD: leads.filter(l => l.routing === 'COLD').length,
  }), []);

  const filteredLeads = useMemo(() =>
    filter === 'all' ? leads : leads.filter(l => l.routing === filter),
    [filter]
  );

  function handleRowClick(lead) {
    setSelectedLead(prev => (prev?.id === lead.id ? null : lead));
  }

  return (
    <>
      <div className="p-6 lg:p-8 min-h-screen transition-colors duration-300" style={{ background: t.pageBg }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: t.heading }}>Lead Pipeline</h1>
            <p className="text-sm mt-0.5" style={{ color: t.textMuted }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: t.accent }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Lead
          </button>
        </div>

        <HotLeadBanner lead={hotLead} t={t} onViewBrief={setSelectedLead} />
        <StatCards all={leads} t={t} />

        <div
          className="rounded-xl shadow-sm overflow-hidden transition-colors duration-300"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: `1px solid ${t.divider}` }}
          >
            <FilterPills active={filter} counts={counts} onChange={setFilter} t={t} />
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: t.textMuted }}>{filteredLeads.length} leads</span>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                style={{ border: `1px solid ${t.cardBorder}`, color: t.textMuted, background: t.tableHead }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h4" />
                </svg>
                Filter
              </button>
            </div>
          </div>

          <PipelineTable
            leads={filteredLeads}
            onRowClick={handleRowClick}
            selectedId={selectedLead?.id}
            t={t}
          />
        </div>

        <div className="h-8" />
      </div>

      <LeadDetailPanel lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </>
  );
}
