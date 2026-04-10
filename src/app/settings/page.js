'use client';

import { useTheme } from '@/components/ThemeProvider';

function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none"
      style={{ background: checked ? '#a78bfa' : '#cbd5e1' }}
    >
      <span
        className="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200"
        style={{ transform: checked ? 'translateX(24px)' : 'translateX(4px)' }}
      />
    </button>
  );
}

function SettingRow({ label, description, children, t }) {
  return (
    <div
      className="flex items-center justify-between py-4"
      style={{ borderBottom: `1px solid ${t.divider}` }}
    >
      <div>
        <p className="text-sm font-semibold" style={{ color: t.heading }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color: t.textMuted }}>{description}</p>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { t, isDark, toggle } = useTheme();

  return (
    <div className="p-6 lg:p-8 min-h-screen transition-colors duration-300" style={{ background: t.pageBg }}>
      <div className="mb-7">
        <h1 className="text-2xl font-bold" style={{ color: t.heading }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: t.textMuted }}>
          Manage your account and AI configuration
        </p>
      </div>

      <div className="max-w-lg space-y-5">
        {/* Appearance */}
        <div
          className="rounded-xl shadow-sm overflow-hidden"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <div className="px-5 py-4" style={{ borderBottom: `1px solid ${t.divider}` }}>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: t.textMuted }}>
              Appearance
            </p>
          </div>
          <div className="px-5">
            <SettingRow
              t={t}
              label="Dark Mode"
              description="Switch to a dark background with purple accents throughout the UI"
            >
              <Toggle checked={isDark} onChange={toggle} />
            </SettingRow>

            <SettingRow
              t={t}
              label="Compact View"
              description="Reduce table row height to show more leads at once"
            >
              <Toggle checked={false} onChange={() => {}} />
            </SettingRow>
          </div>
        </div>

        {/* Notifications */}
        <div
          className="rounded-xl shadow-sm overflow-hidden"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <div className="px-5 py-4" style={{ borderBottom: `1px solid ${t.divider}` }}>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: t.textMuted }}>
              Notifications
            </p>
          </div>
          <div className="px-5">
            <SettingRow
              t={t}
              label="HOT Lead Alerts"
              description="Get notified immediately when a lead qualifies as HOT"
            >
              <Toggle checked={true} onChange={() => {}} />
            </SettingRow>
            <SettingRow
              t={t}
              label="Nurture Replies"
              description="Get notified when a lead replies to a nurture sequence"
            >
              <Toggle checked={true} onChange={() => {}} />
            </SettingRow>
            <SettingRow
              t={t}
              label="Daily Pipeline Summary"
              description="Receive a morning email with your pipeline snapshot"
            >
              <Toggle checked={false} onChange={() => {}} />
            </SettingRow>
          </div>
        </div>

        {/* AI Configuration */}
        <div
          className="rounded-xl shadow-sm overflow-hidden"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <div className="px-5 py-4" style={{ borderBottom: `1px solid ${t.divider}` }}>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: t.textMuted }}>
              AI Configuration
            </p>
          </div>
          <div className="px-5">
            <SettingRow
              t={t}
              label="Auto-respond within 60s"
              description="AI texts new leads within 60 seconds of submission"
            >
              <Toggle checked={true} onChange={() => {}} />
            </SettingRow>
            <SettingRow
              t={t}
              label="Auto-route HOT leads"
              description="Automatically flag HOT leads to your inbox when qualified"
            >
              <Toggle checked={true} onChange={() => {}} />
            </SettingRow>
            <div className="py-4">
              <p className="text-sm font-semibold mb-1" style={{ color: t.heading }}>Broker Name in AI Messages</p>
              <p className="text-xs mb-2" style={{ color: t.textMuted }}>The name the AI uses when introducing itself to leads</p>
              <input
                type="text"
                defaultValue="Alex from Apex Mortgage"
                className="w-full rounded-lg px-3 py-2 text-sm transition-colors"
                style={{
                  background: t.pageBg,
                  border: `1px solid ${t.inputBorder}`,
                  color: t.text,
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
