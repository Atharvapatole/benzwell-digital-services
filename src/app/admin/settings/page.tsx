import { getWebsiteSettings } from '@/lib/data';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import SettingsClient from '@/components/admin/SettingsClient';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const [settings, supabase] = await Promise.all([
    getWebsiteSettings(),
    createServerSupabaseClient(),
  ]);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Admin Settings & Policies
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage business contact info, demo website URLs, and transparent domain and hosting terms.
        </p>
      </div>

      <SettingsClient
        settings={settings}
        adminEmail={user?.email || 'admin@benzwell.in'}
      />
    </div>
  );
}
