export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'interested'
  | 'demo_requested'
  | 'converted'
  | 'not_interested';

export interface Lead {
  id: string;
  customer_name: string;
  email: string;
  whatsapp_number: string;
  calling_number: string;
  selected_plan: string;
  budget: string;
  message?: string | null;
  consent: boolean;
  status: LeadStatus;
  source: string;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface PlanFaq {
  question: string;
  answer: string;
}

export interface Plan {
  slug: string; // 'basic' | 'medium' | 'higher'
  name: string;
  price: number;
  original_price?: number;
  currency: string;
  badge?: string;
  description: string;
  recommended: boolean;
  demo_url?: string | null;
  features: string[];
  editing_policy: string;
  additional_edits_cost?: string;
  included: string[];
  not_included: string[];
  hosting_conditions: string;
  domain_conditions: string;
  service_duration: string;
  renewal_conditions: string;
  recommended_businesses: string[];
  faqs: PlanFaq[];
  is_active: boolean;
  sort_order: number;
}

export interface BusinessInfo {
  brand_name: string;
  tagline: string;
  support_email: string;
  whatsapp_number: string;
  calling_number: string;
  address: string;
  production_url: string;
}

export interface ServicePolicies {
  hosting_terms: string;
  domain_terms: string;
  service_duration_terms: string;
}

export interface WebsiteSettings {
  business_info: BusinessInfo;
  service_policies: ServicePolicies;
}
