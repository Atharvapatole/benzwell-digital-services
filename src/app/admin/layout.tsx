import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import AdminNav from '@/components/admin/AdminNav';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If unauthenticated, redirect to login page (double layer with middleware)
  if (!user) {
    redirect('/admin/login');
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
