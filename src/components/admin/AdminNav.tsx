'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { adminSignOut } from '@/actions/auth';
import {
  LayoutDashboard,
  Users,
  Layers,
  Settings,
  ExternalLink,
  LogOut,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

interface AdminNavProps {
  userEmail: string;
}

export default function AdminNav({ userEmail }: AdminNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await adminSignOut();
    } catch {
      window.location.href = '/admin/login';
    }
  };

  const navLinks = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/leads', label: 'Leads Management', icon: Users },
    { href: '/admin/plans', label: 'Website Plans', icon: Layers },
    { href: '/admin/settings', label: 'Settings & Terms', icon: Settings },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4 text-brand-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-white leading-none">
                  BenzWell
                </span>
                <span className="text-[10px] text-brand-400 font-semibold tracking-wider uppercase">
                  Admin Panel
                </span>
              </div>
            </Link>

            {/* Main Nav Items */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-slate-800 text-white border border-slate-700'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Site Link, User Info & Logout */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="text-right hidden sm:block">
              <div className="text-xs font-medium text-slate-200 truncate max-w-[150px]">
                {userEmail}
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold">Authorized Admin</div>
            </div>

            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/80 hover:text-rose-300 border border-slate-700 text-xs font-semibold text-slate-300 transition-colors disabled:opacity-50"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isSigningOut ? 'Signing out...' : 'Logout'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Subnav */}
        <div className="md:hidden py-2 border-t border-slate-800 flex items-center justify-around overflow-x-auto text-xs">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-md ${
                  isActive ? 'text-brand-400 font-bold' : 'text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px]">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
