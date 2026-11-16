import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { DEFAULT_PLANS, DEFAULT_BUSINESS_INFO, DEFAULT_SERVICE_POLICIES } from '@/lib/constants';
import { Plan, BusinessInfo, ServicePolicies, Lead } from '@/types';

export async function getPlans(): Promise<Plan[]> {
  try {
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_PLANS;
    }

    return data as Plan[];
  } catch {
    return DEFAULT_PLANS;
  }
}

export async function getAllPlansForAdmin(): Promise<Plan[]> {
  try {
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_PLANS;
    }

    return data as Plan[];
  } catch {
    return DEFAULT_PLANS;
  }
}

export async function getPlanBySlug(slug: string): Promise<Plan | null> {
  const normalizedSlug = slug === 'full-stack' ? 'higher' : slug;
  try {
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .eq('slug', normalizedSlug)
      .maybeSingle();

    if (error || !data) {
      return DEFAULT_PLANS.find((p) => p.slug === normalizedSlug) || null;
    }

    return data as Plan;
  } catch {
    return DEFAULT_PLANS.find((p) => p.slug === normalizedSlug) || null;
  }
}

export async function getWebsiteSettings(): Promise<{
  business_info: BusinessInfo;
  service_policies: ServicePolicies;
}> {
  try {
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase.from('website_settings').select('*');

    if (error || !data || data.length === 0) {
      return {
        business_info: DEFAULT_BUSINESS_INFO,
        service_policies: DEFAULT_SERVICE_POLICIES,
      };
    }

    const businessInfoRow = data.find((r) => r.key === 'business_info');
    const policiesRow = data.find((r) => r.key === 'service_policies');

    return {
      business_info: (businessInfoRow?.value as BusinessInfo) || DEFAULT_BUSINESS_INFO,
      service_policies: (policiesRow?.value as ServicePolicies) || DEFAULT_SERVICE_POLICIES,
    };
  } catch {
    return {
      business_info: DEFAULT_BUSINESS_INFO,
      service_policies: DEFAULT_SERVICE_POLICIES,
    };
  }
}

export async function getAdminDashboardStats(): Promise<{
  totalEnquiries: number;
  newEnquiries: number;
  contactedLeads: number;
  interestedLeads: number;
  convertedCustomers: number;
  recentLeads: Lead[];
}> {
  try {
    const supabase = createAdminSupabaseClient();

    const { data: leads, error } = await supabase
      .from('customer_leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !leads) {
      return {
        totalEnquiries: 0,
        newEnquiries: 0,
        contactedLeads: 0,
        interestedLeads: 0,
        convertedCustomers: 0,
        recentLeads: [],
      };
    }

    const typedLeads = leads as Lead[];

    return {
      totalEnquiries: typedLeads.length,
      newEnquiries: typedLeads.filter((l) => l.status === 'new').length,
      contactedLeads: typedLeads.filter((l) => l.status === 'contacted').length,
      interestedLeads: typedLeads.filter((l) => l.status === 'interested').length,
      convertedCustomers: typedLeads.filter((l) => l.status === 'converted').length,
      recentLeads: typedLeads.slice(0, 10),
    };
  } catch {
    return {
      totalEnquiries: 0,
      newEnquiries: 0,
      contactedLeads: 0,
      interestedLeads: 0,
      convertedCustomers: 0,
      recentLeads: [],
    };
  }
}
