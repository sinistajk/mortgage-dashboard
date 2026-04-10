'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';

function HomeIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function MailIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function ClockIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CogIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

const navItems = [
  { href: '/', label: 'Dashboard', Icon: HomeIcon },
  { href: '/nurture', label: 'Nurture Queue', Icon: MailIcon },
  { href: '/activity', label: 'Activity', Icon: ClockIcon },
  { href: '/settings', label: 'Settings', Icon: CogIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { t } = useTheme();

  return (
    <aside
      className="flex-shrink-0 flex flex-col h-screen overflow-y-auto transition-colors duration-300"
      style={{ width: '240px', background: t.sidebar }}
    >
      {/* Logo */}
      <div className="p-5 flex items-center gap-3" style={{ borderBottom: `1px solid ${t.sidebarBorder}` }}>
        <div
          className="flex items-center justify-center w-9 h-9 rounded-xl text-white font-bold text-base flex-shrink-0"
          style={{ background: t.accent }}
        >
          A
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-none tracking-wide">APEX</p>
          <p className="text-xs mt-0.5" style={{ color: t.sidebarBadgeText }}>Mortgage AI</p>
        </div>
      </div>

      {/* Nav label */}
      <div className="px-4 pt-5 pb-2">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Menu
        </p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map(({ href, label, Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150"
              style={{
                color: isActive ? t.sidebarActiveText : t.sidebarText,
                background: isActive ? t.sidebarActiveBg : 'transparent',
                fontWeight: isActive ? '600' : '400',
              }}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
              {label === 'Nurture Queue' && (
                <span
                  className="ml-auto text-xs font-semibold px-1.5 py-0.5 rounded-full"
                  style={{ background: t.sidebarBadgeBg, color: t.sidebarBadgeText }}
                >
                  10
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4 my-2" style={{ height: '1px', background: t.sidebarBorder }} />

      {/* Broker profile */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ background: t.accent }}
          >
            JB
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold leading-none truncate">John Broker</p>
            <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>Senior Broker</p>
          </div>
          <Link
            href="/settings"
            className="ml-auto flex-shrink-0 p-1 rounded-md transition-colors"
            style={{ color: 'rgba(255,255,255,0.35)' }}
            title="Settings"
          >
            <CogIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
