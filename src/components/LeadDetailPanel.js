'use client';

import { useState } from 'react';

function routingStyle(routing) {
  if (routing === 'HOT') return { bg: '#fef2f2', text: '#dc2626', dot: '#ef4444' };
  if (routing === 'WARM') return { bg: '#fffbeb', text: '#d97706', dot: '#f59e0b' };
  if (routing === 'COLD') return { bg: '#f8fafc', text: '#64748b', dot: '#94a3b8' };
  return { bg: '#f1f5f9', text: '#64748b', dot: '#94a3b8' };
}

function RoutingPill({ routing }) {
  const s = routingStyle(routing);
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
      style={{ background: s.bg, color: s.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
      {routing || 'NEW'}
    </span>
  );
}

function BriefTab({ lead }) {
  if (!lead.brokerSummary) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl">🤖</span>
        </div>
        <p className="text-sm font-medium text-gray-500">Brief not yet generated</p>
        <p className="text-xs text-gray-400 mt-1">Lead is still in the qualification queue</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">AI Summary</p>
        <p className="text-sm text-gray-700 leading-relaxed">{lead.brokerSummary}</p>
      </div>

      {lead.talkingPoints?.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Talking Points</p>
          <ul className="space-y-2.5">
            {lead.talkingPoints.map((point, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700">
                <span className="font-bold mt-0.5 flex-shrink-0" style={{ color: '#4d9fff' }}>→</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {lead.flags?.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Flags to Watch</p>
          <ul className="space-y-2">
            {lead.flags.map((flag, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-sm p-3 rounded-lg"
                style={{ background: '#fffbeb', color: '#92400e' }}
              >
                <span className="flex-shrink-0" style={{ color: '#d97706' }}>⚠</span>
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function QualTab({ lead }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Qualification Data</p>
      <div className="grid grid-cols-2 gap-2.5">
        {Object.entries(lead.qualData).map(([key, value]) => (
          <div key={key} className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-400 uppercase tracking-wide leading-none">{key}</p>
            <p className="text-sm font-semibold text-gray-800 mt-1">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SMSTab({ lead }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 text-center">
        AI Qualification Conversation
      </p>
      <div className="space-y-3">
        {lead.conversation.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === 'ai' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.from === 'lead' && (
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0 mt-1 mr-2">
                {lead.firstName[0]}
              </div>
            )}
            <div
              className="max-w-[80%] rounded-2xl px-3.5 py-2.5"
              style={
                msg.from === 'ai'
                  ? { background: '#0f2044', borderBottomRightRadius: '4px' }
                  : { background: '#f1f5f9', borderBottomLeftRadius: '4px' }
              }
            >
              <p className="text-sm leading-snug" style={{ color: msg.from === 'ai' ? '#fff' : '#1e293b' }}>
                {msg.text}
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: msg.from === 'ai' ? 'rgba(147,197,253,0.8)' : '#94a3b8' }}
              >
                {msg.time}
              </p>
            </div>
            {msg.from === 'ai' && (
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-1 ml-2"
                style={{ background: '#4d9fff' }}
              >
                AI
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const TABS = [
  { key: 'brief', label: 'Call Brief' },
  { key: 'qualification', label: 'Qualification' },
  { key: 'sms', label: 'SMS Transcript' },
];

export default function LeadDetailPanel({ lead, onClose }) {
  const [tab, setTab] = useState('brief');
  const isOpen = !!lead;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: 'rgba(15, 32, 68, 0.45)',
          backdropFilter: 'blur(2px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed inset-y-0 right-0 z-50 flex flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out"
        style={{
          width: '500px',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {lead && (
          <>
            {/* Header */}
            <div className="flex-shrink-0 p-5" style={{ background: '#0f2044' }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgba(147,197,253,0.7)' }}>
                    Lead Profile
                  </p>
                  <h2 className="text-xl font-bold text-white">
                    {lead.firstName} {lead.lastName}
                  </h2>
                  <p className="text-sm mt-0.5" style={{ color: 'rgba(147,197,253,0.8)' }}>
                    {lead.source} · {lead.phone} · {lead.email}
                  </p>
                </div>
                <div className="flex items-center gap-3 ml-3">
                  <RoutingPill routing={lead.routing} />
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg transition-colors"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Score bar */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium" style={{ color: 'rgba(147,197,253,0.7)', whiteSpace: 'nowrap' }}>
                  AI Score
                </span>
                <div className="flex-1 rounded-full h-1.5" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <div
                    className="rounded-full h-1.5 transition-all"
                    style={{ width: `${(lead.score / 24) * 100}%`, background: '#4d9fff' }}
                  />
                </div>
                <span className="text-sm font-bold text-white">{lead.score}/24</span>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[
                  { label: 'Loan Amount', value: `$${(lead.loanAmount / 1000).toFixed(0)}k` },
                  { label: 'Credit', value: lead.creditRange },
                  { label: 'Timeline', value: lead.timeline },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-lg px-3 py-2"
                    style={{ background: 'rgba(255,255,255,0.07)' }}
                  >
                    <p className="text-xs" style={{ color: 'rgba(147,197,253,0.6)' }}>{label}</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div
              className="flex flex-shrink-0"
              style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}
            >
              {TABS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className="flex-1 py-3 text-xs font-semibold transition-all"
                  style={{
                    color: tab === key ? '#4d9fff' : '#94a3b8',
                    borderBottom: tab === key ? '2px solid #4d9fff' : '2px solid transparent',
                    background: tab === key ? '#fff' : 'transparent',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-5">
              {tab === 'brief' && <BriefTab lead={lead} />}
              {tab === 'qualification' && <QualTab lead={lead} />}
              {tab === 'sms' && <SMSTab lead={lead} />}
            </div>

            {/* Action buttons */}
            <div
              className="flex-shrink-0 p-4 flex gap-2.5"
              style={{ borderTop: '1px solid #f1f5f9', background: '#f8fafc' }}
            >
              <button
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
                style={{ background: '#4d9fff' }}
              >
                Mark as Called
              </button>
              <button
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
                style={{ background: '#0f2044' }}
              >
                Book Appointment
              </button>
              <button
                className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{ border: '1px solid #e2e8f0', color: '#64748b', background: '#fff' }}
              >
                Nurture
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
