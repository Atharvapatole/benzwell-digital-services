import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isAuthorizedAdmin } from '@/lib/auth';
import AdminNav from '@/components/admin/AdminNav';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If not authenticated, redirect to login page
  if (!user) {
    redirect('/admin/login');
  }

  // Verify server-side administrator authorization
  const authorized = isAuthorizedAdmin(user);
  if (!authorized) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 max-w-md w-full space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Access Denied</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Signed in as <strong className="text-slate-200">{user.email}</strong>, but this account is not authorized to access the BenzWell administrative portal.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/admin/login"
              className="py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-colors"
            >
              Sign In with Authorized Account
            </Link>
            <Link
              href="/"
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      <AdminNav userEmail={user.email || 'Admin'} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
