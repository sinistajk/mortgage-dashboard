'use client';

import { useTheme } from '@/components/ThemeProvider';
import { nurtureData } from '@/lib/nurtureData';

const sentimentColor = {
  Positive: '#16a34a',
  Engaged: '#4d9fff',
  Urgent: '#dc2626',
  Warm: '#d97706',
  Optimistic: '#059669',
  Curious: '#7c3aed',
  Neutral: '#64748b',
  Uncertain: '#94a3b8',
  Improving: '#d97706',
  'Ready to engage': '#dc2626',
};

export default function NurtureDetailPanel({ lead, onClose }) {
  const { t } = useTheme();
  const isOpen = !!lead;
  const data = lead ? nurtureData[lead.id] : null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: t.modalOverlay,
          backdropFilter: 'blur(2px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed inset-y-0 right-0 z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out"
        style={{
          width: '480px',
          background: t.panelBg,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {lead && data && (
          <>
            {/* Header */}
            <div className="flex-shrink-0 p-5" style={{ background: t.panelHeader }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: t.panelHeaderSub }}>
                    Nurture Profile
                  </p>
                  <h2 className="text-xl font-bold" style={{ color: t.panelHeaderText }}>
                    {lead.firstName} {lead.lastName}
                  </h2>
                  <p className="text-sm mt-0.5" style={{ color: t.panelHeaderSub }}>
                    {lead.nurtureSequence} · Day {lead.nurtureDay} of {lead.nurtureTotal}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg transition-colors mt-1"
                  style={{ color: t.panelHeaderSub }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium" style={{ color: t.panelHeaderSub }}>Progress</span>
                <div className="flex-1 rounded-full h-1.5" style={{ background: t.scoreTrack }}>
                  <div
                    className="rounded-full h-1.5"
                    style={{ width: `${(lead.nurtureDay / lead.nurtureTotal) * 100}%`, background: t.accent }}
                  />
                </div>
                <span className="text-xs font-bold" style={{ color: t.panelHeaderText }}>
                  {Math.round((lead.nurtureDay / lead.nurtureTotal) * 100)}%
                </span>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                {[
                  { label: 'Routing', value: lead.routing },
                  { label: 'Last Sent', value: lead.lastMessageSent },
                  { label: 'Next Message', value: lead.nextMessageScheduled },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-lg px-3 py-2" style={{ background: t.panelHeaderStatBg }}>
                    <p className="text-xs" style={{ color: t.panelHeaderSub }}>{label}</p>
                    <p className="text-sm font-semibold mt-0.5" style={{ color: t.panelHeaderText }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* AI Summary */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: t.textMuted }}>
                  AI Summary
                </p>
                <p className="text-sm leading-relaxed" style={{ color: t.text }}>
                  {data.aiSummary}
                </p>
              </div>

              {/* Key topics + sentiment */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="rounded-xl p-4"
                  style={{ background: t.cardBg === '#ffffff' ? '#f8fafc' : t.cardBorder + '30', border: `1px solid ${t.cardBorder}` }}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: t.textMuted }}>
                    Key Topics
                  </p>
                  <ul className="space-y-1.5">
                    {data.keyTopics.map((topic, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs" style={{ color: t.text }}>
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: t.accent }} />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="rounded-xl p-4"
                  style={{ background: t.cardBg === '#ffffff' ? '#f8fafc' : t.cardBorder + '30', border: `1px solid ${t.cardBorder}` }}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: t.textMuted }}>
                    Sentiment
                  </p>
                  <p
                    className="text-sm font-bold"
                    style={{ color: sentimentColor[data.sentiment] || t.accent }}
                  >
                    {data.sentiment}
                  </p>
                  <div className="mt-3">
                    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: t.textMuted }}>
                      Next Steps
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: t.text }}>{data.nextSteps}</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: t.divider }} />

              {/* Message history */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-center" style={{ color: t.textMuted }}>
                  Nurture Message History
                </p>
                <div className="space-y-3">
                  {data.messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.from === 'ai' ? 'justify-end' : 'justify-start'}`}>
                      {msg.from === 'lead' && (
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-1 mr-2"
                          style={{ background: t.textMuted }}
                        >
                          {lead.firstName[0]}
                        </div>
                      )}
                      <div
                        className="max-w-[80%] rounded-2xl px-3.5 py-2.5"
                        style={
                          msg.from === 'ai'
                            ? { background: t.msgAiBg, borderBottomRightRadius: '4px' }
                            : { background: t.msgLeadBg, borderBottomLeftRadius: '4px' }
                        }
                      >
                        <p className="text-sm leading-snug" style={{ color: msg.from === 'ai' ? t.msgAiText : t.msgLeadText }}>
                          {msg.text}
                        </p>
                        <p className="text-xs mt-1" style={{ color: msg.from === 'ai' ? t.msgAiTime : t.msgLeadTime }}>
                          {msg.time} · {msg.date}
                        </p>
                      </div>
                      {msg.from === 'ai' && (
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-1 ml-2"
                          style={{ background: t.accent }}
                        >
                          AI
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div
              className="flex-shrink-0 p-4 flex gap-2.5"
              style={{ borderTop: `1px solid ${t.divider}`, background: t.panelTabsBg }}
            >
              <button
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white"
                style={{ background: t.accent }}
              >
                Escalate to Broker
              </button>
              <button
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold"
                style={{ background: t.actionTertiaryBg, border: `1px solid ${t.actionTertiaryBorder}`, color: t.actionTertiaryText }}
              >
                Pause Sequence
              </button>
            </div>
          </>
        )}

        {lead && !data && (
          <>
            <div className="flex-shrink-0 p-5 flex items-center justify-between" style={{ background: t.panelHeader }}>
              <h2 className="text-lg font-bold" style={{ color: t.panelHeaderText }}>
                {lead.firstName} {lead.lastName}
              </h2>
              <button onClick={onClose} className="p-1.5" style={{ color: t.panelHeaderSub }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center p-8 text-center">
              <div>
                <p className="text-sm font-medium" style={{ color: t.text }}>No nurture data available</p>
                <p className="text-xs mt-1" style={{ color: t.textMuted }}>This lead hasn't started a sequence yet.</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
