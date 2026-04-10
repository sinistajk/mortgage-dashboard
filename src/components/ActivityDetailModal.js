'use client';

import { useTheme } from '@/components/ThemeProvider';
import { leads } from '@/lib/mockData';

const typeLabels = {
  qualified: 'Lead Qualified',
  reply: 'Lead Replied',
  nurture: 'Nurture Message Sent',
  upgrade: 'Routing Upgraded',
  new: 'New Lead Submitted',
  booked: 'Appointment Booked',
};

const typeColors = {
  qualified: '#dc2626',
  reply: '#2563eb',
  nurture: '#d97706',
  upgrade: '#16a34a',
  new: '#7c3aed',
  booked: '#059669',
};

const routingStyle = {
  HOT: { bg: '#fef2f2', text: '#dc2626', dot: '#ef4444' },
  WARM: { bg: '#fffbeb', text: '#d97706', dot: '#f59e0b' },
  COLD: { bg: '#f8fafc', text: '#64748b', dot: '#94a3b8' },
};

function RoutingPill({ routing }) {
  const s = routingStyle[routing] || { bg: '#f1f5f9', text: '#64748b', dot: '#94a3b8' };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
      style={{ background: s.bg, color: s.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />
      {routing}
    </span>
  );
}

export default function ActivityDetailModal({ event, onClose }) {
  const { t } = useTheme();
  const isOpen = !!event;
  const lead = event ? leads.find(l => l.id === event.leadId) : null;
  const typeColor = event ? (typeColors[event.type] || '#64748b') : '#64748b';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300 flex items-center justify-center p-4"
        style={{
          background: t.modalOverlay,
          backdropFilter: 'blur(2px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="w-full max-w-lg rounded-2xl shadow-2xl transition-all duration-300"
          style={{
            background: t.cardBg,
            transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(8px)',
            maxHeight: '85vh',
            overflowY: 'auto',
          }}
          onClick={e => e.stopPropagation()}
        >
          {event && (
            <>
              {/* Modal header */}
              <div className="p-5" style={{ borderBottom: `1px solid ${t.divider}` }}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: typeColor + '15' }}
                    >
                      {event.icon}
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: typeColor }}
                      >
                        {typeLabels[event.type] || 'Activity Event'}
                      </p>
                      <h2 className="text-base font-bold mt-0.5" style={{ color: t.heading }}>
                        {event.text}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg flex-shrink-0 ml-2"
                    style={{ color: t.textMuted }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  {event.routing && <RoutingPill routing={event.routing} />}
                  <span className="text-xs" style={{ color: t.textMuted }}>{event.time}</span>
                  <span className="text-xs" style={{ color: t.textMuted }}>· {event.subtext}</span>
                </div>
              </div>

              {/* Action detail */}
              <div className="p-5" style={{ borderBottom: `1px solid ${t.divider}` }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: t.textMuted }}>
                  What Happened
                </p>
                <p className="text-sm leading-relaxed" style={{ color: t.text }}>
                  {event.actionDetail}
                </p>
              </div>

              {/* Lead overview */}
              {lead && (
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: t.textMuted }}>
                    Lead Overview
                  </p>
                  <div
                    className="rounded-xl p-4"
                    style={{ background: t.tableHead, border: `1px solid ${t.cardBorder}` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{
                            background:
                              lead.routing === 'HOT' ? '#ef4444' :
                              lead.routing === 'WARM' ? '#f59e0b' : '#94a3b8',
                          }}
                        >
                          {lead.firstName[0]}{lead.lastName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold" style={{ color: t.heading }}>
                            {lead.firstName} {lead.lastName}
                          </p>
                          <p className="text-xs" style={{ color: t.textMuted }}>
                            {lead.source} · {lead.phone}
                          </p>
                        </div>
                      </div>
                      {lead.routing && <RoutingPill routing={lead.routing} />}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Loan', value: `$${(lead.loanAmount / 1000).toFixed(0)}k ${lead.loanType}` },
                        { label: 'Credit', value: lead.creditRange },
                        { label: 'Score', value: `${lead.score}/24` },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className="rounded-lg p-2.5"
                          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
                        >
                          <p className="text-xs" style={{ color: t.textMuted }}>{label}</p>
                          <p className="text-sm font-semibold mt-0.5" style={{ color: t.text }}>{value}</p>
                        </div>
                      ))}
                    </div>

                    {lead.brokerSummary && (
                      <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${t.divider}` }}>
                        <p className="text-xs" style={{ color: t.textMuted, lineHeight: 1.6 }}>
                          {lead.brokerSummary.slice(0, 180)}…
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div
                className="px-5 py-4 flex justify-end"
                style={{ borderTop: `1px solid ${t.divider}`, background: t.panelTabsBg }}
              >
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-sm font-medium"
                  style={{
                    background: t.actionTertiaryBg,
                    border: `1px solid ${t.actionTertiaryBorder}`,
                    color: t.actionTertiaryText,
                  }}
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
