'use client';

import { useState } from 'react';
import { activityEvents } from '@/lib/mockData';
import { useTheme } from '@/components/ThemeProvider';
import ActivityDetailModal from '@/components/ActivityDetailModal';

const typeStyles = {
  qualified: { bg: '#fef2f2', icon: '⚡', border: '#fecaca' },
  reply: { bg: '#eff6ff', icon: '💬', border: '#bfdbfe' },
  nurture: { bg: '#fffbeb', icon: '📧', border: '#fde68a' },
  upgrade: { bg: '#f0fdf4', icon: '📈', border: '#bbf7d0' },
  new: { bg: '#f5f3ff', icon: '✨', border: '#ddd6fe' },
  booked: { bg: '#ecfdf5', icon: '📅', border: '#a7f3d0' },
};

const routingColor = {
  HOT: '#dc2626',
  WARM: '#d97706',
  COLD: '#64748b',
};

export default function ActivityPage() {
  const { t } = useTheme();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const today = activityEvents.filter(e =>
    e.time.includes('min') || e.time.includes('hr') || e.time.includes('Today')
  );
  const older = activityEvents.filter(e =>
    !e.time.includes('min') && !e.time.includes('hr') && !e.time.includes('Today')
  );

  function EventCard({ event, isToday }) {
    const s = typeStyles[event.type] || typeStyles.new;
    return (
      <div
        onClick={() => setSelectedEvent(event)}
        className="rounded-xl shadow-sm p-4 flex items-start gap-4 cursor-pointer transition-all duration-150"
        style={{
          background: t.cardBg,
          border: isToday ? `1px solid ${s.border}` : `1px solid ${t.cardBorder}`,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = t.tableRowHover; }}
        onMouseLeave={e => { e.currentTarget.style.background = t.cardBg; }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0"
          style={{ background: s.bg }}
        >
          {s.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold" style={{ color: t.heading }}>{event.text}</p>
          <p className="text-xs mt-0.5" style={{ color: t.textMuted }}>{event.subtext}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {event.routing && (
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{
                background: `${routingColor[event.routing]}18`,
                color: routingColor[event.routing],
              }}
            >
              {event.routing}
            </span>
          )}
          <span className="text-xs" style={{ color: t.textMuted }}>{event.time}</span>
          <svg
            className="w-3.5 h-3.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
            style={{ color: t.textMuted }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 lg:p-8 min-h-screen transition-colors duration-300" style={{ background: t.pageBg }}>
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold" style={{ color: t.heading }}>Activity Feed</h1>
          <p className="text-sm mt-1" style={{ color: t.textMuted }}>
            Real-time lead events and system activity · click any entry for details
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-7">
          {[
            { label: 'Events Today', value: today.length, color: t.accent },
            {
              label: 'HOT Qualifications',
              value: activityEvents.filter(e => e.routing === 'HOT').length,
              color: '#dc2626',
            },
            {
              label: 'Nurture Sends',
              value: activityEvents.filter(e => e.type === 'nurture').length,
              color: '#d97706',
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="rounded-xl p-4 shadow-sm transition-colors duration-300"
              style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
            >
              <p className="text-xs uppercase tracking-wider font-medium" style={{ color: t.textMuted }}>{label}</p>
              <p className="text-2xl font-bold mt-1" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: t.textMuted }}>
            Today
          </p>
          {today.map(event => <EventCard key={event.id} event={event} isToday />)}

          <p className="text-xs font-semibold uppercase tracking-widest mt-6 mb-3" style={{ color: t.textMuted }}>
            Earlier
          </p>
          {older.map(event => <EventCard key={event.id} event={event} isToday={false} />)}
        </div>
      </div>

      <ActivityDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  );
}
