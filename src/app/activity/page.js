import { activityEvents } from '@/lib/mockData';

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
  const today = activityEvents.filter(e =>
    e.time.includes('min') || e.time.includes('hr') || e.time.includes('Today')
  );
  const older = activityEvents.filter(e =>
    !e.time.includes('min') && !e.time.includes('hr') && !e.time.includes('Today')
  );

  return (
    <div className="p-6 lg:p-8 min-h-screen" style={{ background: '#f8fafc' }}>
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold" style={{ color: '#0f2044' }}>Activity Feed</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time lead events and system activity</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-7">
        {[
          { label: 'Events Today', value: today.length, color: '#4d9fff' },
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
          <div key={label} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="max-w-2xl space-y-2">
        {/* Today */}
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Today</p>
        {today.map(event => {
          const s = typeStyles[event.type] || typeStyles.new;
          return (
            <div
              key={event.id}
              className="bg-white rounded-xl border shadow-sm p-4 flex items-start gap-4"
              style={{ borderColor: s.border }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0"
                style={{ background: s.bg }}
              >
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{event.text}</p>
                <p className="text-xs text-gray-400 mt-0.5">{event.subtext}</p>
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
                <span className="text-xs text-gray-400">{event.time}</span>
              </div>
            </div>
          );
        })}

        {/* Earlier */}
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mt-6 mb-3">Earlier</p>
        {older.map(event => {
          const s = typeStyles[event.type] || typeStyles.new;
          return (
            <div
              key={event.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-start gap-4"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0"
                style={{ background: s.bg }}
              >
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700">{event.text}</p>
                <p className="text-xs text-gray-400 mt-0.5">{event.subtext}</p>
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
                <span className="text-xs text-gray-400">{event.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
