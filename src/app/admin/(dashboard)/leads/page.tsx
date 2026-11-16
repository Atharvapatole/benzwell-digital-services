import { createAdminSupabaseClient } from '@/lib/supabase/server';
import LeadsTableClient from '@/components/admin/LeadsTableClient';
import { Lead } from '@/types';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ id?: string }>;
}

export default async function AdminLeadsPage({ searchParams }: Props) {
  const { id } = await searchParams;
  let leads: Lead[] = [];

  try {
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase
      .from('customer_leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      leads = data as Lead[];
    }
  } catch (err) {
    console.error('Failed to query customer leads:', err);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Customer Leads Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review, filter, update statuses, and directly contact leads via WhatsApp, Phone, or Email.
        </p>
      </div>

      <LeadsTableClient initialLeads={leads} initialSelectedId={id} />
    </div>
  );
}
