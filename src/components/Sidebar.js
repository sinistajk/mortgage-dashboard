'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function HomeIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function UsersIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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
  { href: '/leads', label: 'Leads', Icon: UsersIcon },
  { href: '/nurture', label: 'Nurture Queue', Icon: MailIcon },
  { href: '/activity', label: 'Activity', Icon: ClockIcon },
  { href: '/settings', label: 'Settings', Icon: CogIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex-shrink-0 flex flex-col h-screen overflow-y-auto"
      style={{ width: '240px', background: '#0f2044' }}
    >
      {/* Logo */}
      <div className="p-5 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div
          className="flex items-center justify-center w-9 h-9 rounded-xl text-white font-bold text-base flex-shrink-0"
          style={{ background: '#4d9fff' }}
        >
          A
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-none tracking-wide">APEX</p>
          <p className="text-xs mt-0.5" style={{ color: '#93c5fd' }}>Mortgage AI</p>
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
          const isActive = pathname === href || (href === '/leads' && pathname === '/');
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150"
              style={{
                color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
                background: isActive ? 'rgba(77,159,255,0.18)' : 'transparent',
                fontWeight: isActive ? '600' : '400',
              }}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
              {label === 'Nurture Queue' && (
                <span
                  className="ml-auto text-xs font-semibold px-1.5 py-0.5 rounded-full"
                  style={{ background: 'rgba(77,159,255,0.25)', color: '#93c5fd' }}
                >
                  10
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4 my-2" style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />

      {/* Broker profile */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ background: '#4d9fff' }}
          >
            JB
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold leading-none truncate">John Broker</p>
            <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>Senior Broker</p>
          </div>
          <button
            className="ml-auto flex-shrink-0 p-1 rounded-md transition-colors"
            style={{ color: 'rgba(255,255,255,0.35)' }}
            title="Account settings"
          >
            <CogIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
