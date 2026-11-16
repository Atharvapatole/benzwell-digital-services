-- BenzWell Database Schema & Migrations
-- Created for BenzWell - Website Development & Lead Management Platform

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CUSTOMER LEADS TABLE
CREATE TABLE IF NOT EXISTS public.customer_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    calling_number TEXT NOT NULL,
    selected_plan TEXT NOT NULL,
    budget TEXT NOT NULL,
    message TEXT,
    consent BOOLEAN NOT NULL DEFAULT true,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'interested', 'demo_requested', 'converted', 'not_interested')),
    source TEXT NOT NULL DEFAULT 'website',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexing for fast dashboard searching and filtering
CREATE INDEX IF NOT EXISTS idx_customer_leads_status ON public.customer_leads(status);
CREATE INDEX IF NOT EXISTS idx_customer_leads_created_at ON public.customer_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_customer_leads_email ON public.customer_leads(email);
CREATE INDEX IF NOT EXISTS idx_customer_leads_whatsapp ON public.customer_leads(whatsapp_number);

-- 3. PLANS CONFIGURATION TABLE
CREATE TABLE IF NOT EXISTS public.plans (
    slug TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    original_price NUMERIC,
    currency TEXT NOT NULL DEFAULT '₹',
    badge TEXT,
    description TEXT NOT NULL,
    recommended BOOLEAN NOT NULL DEFAULT false,
    demo_url TEXT,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    editing_policy TEXT NOT NULL,
    additional_edits_cost TEXT,
    included JSONB NOT NULL DEFAULT '[]'::jsonb,
    not_included JSONB NOT NULL DEFAULT '[]'::jsonb,
    hosting_conditions TEXT NOT NULL,
    domain_conditions TEXT NOT NULL,
    service_duration TEXT NOT NULL,
    renewal_conditions TEXT NOT NULL,
    recommended_businesses JSONB NOT NULL DEFAULT '[]'::jsonb,
    faqs JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. WEBSITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.website_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. AUTOMATIC UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_customer_leads_updated_at ON public.customer_leads;
CREATE TRIGGER trigger_customer_leads_updated_at
    BEFORE UPDATE ON public.customer_leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_plans_updated_at ON public.plans;
CREATE TRIGGER trigger_plans_updated_at
    BEFORE UPDATE ON public.plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_website_settings_updated_at ON public.website_settings;
CREATE TRIGGER trigger_website_settings_updated_at
    BEFORE UPDATE ON public.website_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 6. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.customer_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- Customer Leads Policies
-- Public can NOT select, update, or delete any leads.
-- Insert is allowed for service role, or authenticated users, or anon insert via server action (service role bypasses RLS safely on server).
-- Authenticated admins can view, update, delete all leads.
DROP POLICY IF EXISTS "Admins can view all leads" ON public.customer_leads;
CREATE POLICY "Admins can view all leads"
    ON public.customer_leads
    FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Admins can update leads" ON public.customer_leads;
CREATE POLICY "Admins can update leads"
    ON public.customer_leads
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can delete leads" ON public.customer_leads;
CREATE POLICY "Admins can delete leads"
    ON public.customer_leads
    FOR DELETE
    TO authenticated
    USING (true);

-- Public can submit lead through API endpoint or direct insert
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.customer_leads;
CREATE POLICY "Anyone can insert leads"
    ON public.customer_leads
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Plans Policies
-- Public can read active plans
DROP POLICY IF EXISTS "Anyone can view active plans" ON public.plans;
CREATE POLICY "Anyone can view active plans"
    ON public.plans
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true OR auth.role() = 'authenticated');

-- Admins can update plans
DROP POLICY IF EXISTS "Admins can manage plans" ON public.plans;
CREATE POLICY "Admins can manage plans"
    ON public.plans
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Website Settings Policies
-- Public can read settings
DROP POLICY IF EXISTS "Anyone can view settings" ON public.website_settings;
CREATE POLICY "Anyone can view settings"
    ON public.website_settings
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Admins can manage settings
DROP POLICY IF EXISTS "Admins can manage settings" ON public.website_settings;
CREATE POLICY "Admins can manage settings"
    ON public.website_settings
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 7. INITIAL SEED DATA

-- Insert default website settings
INSERT INTO public.website_settings (key, value, description)
VALUES 
(
    'business_info',
    '{
        "brand_name": "BenzWell",
        "tagline": "Professional Websites. Powerful Digital Experiences.",
        "support_email": "contact@benzwell.in",
        "whatsapp_number": "+91 9876543210",
        "calling_number": "+91 9876543210",
        "address": "Digital Solutions & Web Development, India",
        "production_url": "https://digital.benzwell.in"
    }'::jsonb,
    'Business contact details and general branding'
),
(
    'service_policies',
    '{
        "hosting_terms": "Hosting is included for one year in every package. The first-year hosting cost is included in the package price. Hosting renewal is required after the first year. The website may be suspended if hosting is not renewed after the agreed expiry and notice period.",
        "domain_terms": "Domain registration is not automatically included in the package price. Special condition: If the selected domain registration price is ₹1,000 or less, it will be provided within the package price. If the domain costs more than ₹1,000, the additional domain cost must be paid separately by the customer (e.g. ₹799 domain is included; ₹1,499 domain means customer pays the additional ₹499). The actual domain price is checked at registration and registered in the customer ownership.",
        "service_duration_terms": "One year of service support is included. After one year, renewal is required to continue hosting and applicable service support. Renewal pricing will be communicated transparently with an eligible renewal discount where applicable. We never invent or inflate renewal pricing."
    }'::jsonb,
    'Hosting, Domain, and Service policies'
)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Insert initial Plans
INSERT INTO public.plans (
    slug, name, price, original_price, currency, badge, description, recommended, demo_url,
    features, editing_policy, additional_edits_cost, included, not_included,
    hosting_conditions, domain_conditions, service_duration, renewal_conditions,
    recommended_businesses, faqs, is_active, sort_order
)
VALUES
(
    'basic',
    'Basic Website',
    7999,
    11999,
    '₹',
    'Starter Package',
    'A professional starting point for businesses that need an online presence.',
    false,
    'https://demo-basic.benzwell.in',
    '[
        "Simple professional 5-page website",
        "Home page",
        "About Us page",
        "Products / Services page",
        "Contact page",
        "One additional custom page",
        "Product display section",
        "Business contact information",
        "WhatsApp contact integration",
        "Mobile responsive design",
        "Basic SEO-friendly structure",
        "Website hosting included for one year",
        "Three free minor content edits included",
        "Domain cost subject to domain pricing policy"
    ]'::jsonb,
    'Three minor edits are included free. Examples: Adding products, deleting products, changing text, replacing images, updating contact details. Major changes are not included (e.g. changing overall layout, changing entire design structure, adding major new functionality, or rebuilding pages).',
    '₹1,000 for five additional minor edits',
    '[
        "5 static/structured responsive pages",
        "Home, About Us, Products/Services, Contact, 1 extra page",
        "Direct WhatsApp chat click-to-talk button",
        "Google Maps embed and direct calling links",
        "1-Year Fast Cloud Hosting included",
        "3 Minor Content Updates included free of charge",
        "SSL Security Certificate & Mobile Optimization",
        "Domain included if price is ₹1,000 or below"
    ]'::jsonb,
    '[
        "Admin panel or CMS dashboard (Available in Full Stack)",
        "Database driven dynamic portal",
        "E-commerce payment gateway integration",
        "Major structural or layout overhauls"
    ]'::jsonb,
    'Fast and reliable cloud hosting is included for the first 12 months at no extra cost.',
    'If the selected domain costs ₹1,000 or less, it is included in the package. If above ₹1,000, the customer only pays the remaining difference.',
    '1 Year of technical support and website uptime monitoring.',
    'Annual renewal required after 1 year for hosting & domain maintenance. Transparent rates with renewal discount.',
    '[
        "Local retail shops & traders",
        "Consultants, lawyers & chartered accountants",
        "Clinics & medical practitioners",
        "Small service contractors",
        "Startups looking for a quick digital footprint"
    ]'::jsonb,
    '[
        {"question": "How many pages are included?", "answer": "You receive up to 5 fully designed pages: Home, About, Products/Services, Contact, and 1 custom page tailored to your needs."},
        {"question": "Can I edit content myself?", "answer": "The Basic package is a static website. We include 3 free minor edits. For self-service editing via your own admin dashboard, choose our Full Stack package."},
        {"question": "Can I see a demo first?", "answer": "Yes! Click the \"See Demo Website\" button to explore a live sample of our Basic Website layout."}
    ]'::jsonb,
    true,
    1
),
(
    'medium',
    'Medium Website',
    14999,
    21999,
    '₹',
    'Recommended Solution',
    'A customized professional website designed around your business identity and requirements.',
    true,
    NULL,
    '[
        "Everything included in Basic Website",
        "Customized website design tailored to your brand",
        "Customized layouts and page structures",
        "Premium UI/UX with smooth transitions",
        "Multiple customized sections",
        "Advanced product and service presentation",
        "Custom business branding & color schemes",
        "Enhanced interactive contact forms",
        "WhatsApp integration & direct lead triggers",
        "Responsive desktop, tablet and mobile layouts",
        "SEO-friendly structure & semantic markup",
        "One-year high-speed hosting included",
        "Three free minor content edits included"
    ]'::jsonb,
    'Three minor edits are included free. Examples: Adding products, deleting products, changing text, replacing images, updating contact details. Major structural rebuilds are not included.',
    '₹1,000 for five additional minor edits',
    '[
        "Everything in the Basic package",
        "Tailored custom design matching your exact business identity",
        "Advanced service & product showcase galleries",
        "Interactive lead capture forms",
        "Tablet, mobile & ultra-wide screen optimizations",
        "1-Year High Performance Cloud Hosting",
        "On-page SEO optimization & metadata configuration",
        "Domain included if price is ₹1,000 or below"
    ]'::jsonb,
    '[
        "Self-service admin panel (Choose Full Stack plan for this)",
        "Backend database and user accounts",
        "Payment gateway checkout workflows"
    ]'::jsonb,
    'High performance cloud hosting included for the initial 12 months with 99.9% uptime target.',
    'If the selected domain costs ₹1,000 or less, it is included in the package. If above ₹1,000, only the difference is payable.',
    '1 Year of priority technical support and performance monitoring.',
    'Annual renewal for hosting and domain maintenance. Eligible for loyal client renewal discounts.',
    '[
        "Established small and medium businesses",
        "Manufacturers & exporters",
        "Real estate builders & agencies",
        "Educational institutions & coaching centers",
        "B2B service providers requiring strong brand presence"
    ]'::jsonb,
    '[
        {"question": "Why is this the recommended plan?", "answer": "The Medium plan strikes the perfect balance for growing businesses: a completely bespoke design aligned with your branding without the expense of a custom backend."},
        {"question": "Does it have a demo button?", "answer": "No. Because each Medium website is custom-designed specifically to the client branding and layout requirements, every build is uniquely crafted."}
    ]'::jsonb,
    true,
    2
),
(
    'full-stack',
    'Higher Website – Full Stack',
    19999,
    29999,
    '₹',
    'Complete Custom & Dashboard',
    'A complete custom business website with backend functionality and your own admin dashboard.',
    false,
    NULL,
    '[
        "Everything included in Medium package where applicable",
        "Fully customized frontend tailored to your brand",
        "Full-stack backend development & APIs",
        "Custom secure admin dashboard",
        "Admin login and authentication system",
        "Manage website content directly from your dashboard",
        "Add, edit and delete products & listings easily",
        "Manage business information & announcements",
        "Manage media, images and dynamic content",
        "Backend database integration (PostgreSQL / Supabase)",
        "Custom functionality according to agreed scope",
        "One-year premium cloud hosting included",
        "One-year comprehensive service support"
    ]'::jsonb,
    'No paid minor-edit packages are required for normal content changes that the client can perform through their admin panel. The client controls supported website content through the admin dashboard. Major new features, structural redesigns and additional development work outside the agreed scope may be quoted separately.',
    'Not needed for content managed via admin panel',
    '[
        "Everything in the Medium package",
        "Custom Admin Dashboard with secure login",
        "Live content management: products, services, photos, contact details",
        "Dedicated PostgreSQL backend database",
        "Full-stack custom functionality as per agreed scope",
        "1-Year Premium Hosting with automated backups",
        "Full documentation on how to manage your website",
        "Domain included if price is ₹1,000 or below"
    ]'::jsonb,
    '[
        "Features outside agreed project scope (quoted separately)",
        "Third-party paid API subscription charges (if any)"
    ]'::jsonb,
    'Premium hosting with automated backups and database infrastructure included for 1 full year.',
    'If the selected domain costs ₹1,000 or less, it is included in the package. If above ₹1,000, the customer pays the remaining difference.',
    '1 Year of full-stack support, security updates, and database maintenance.',
    'Annual hosting, database, and maintenance renewal with transparent renewal pricing.',
    '[
        "Businesses with frequently changing catalogs or price lists",
        "Distributors & multi-product companies",
        "Organizations needing private internal management portals",
        "Companies looking for long-term scalability and independence"
    ]'::jsonb,
    '[
        {"question": "Do I need to pay for minor edits with this plan?", "answer": "No! You have your own secure admin panel. You can add, edit, or delete products, change phone numbers, update text, and upload images yourself anytime without paying for minor edits."},
        {"question": "Is the admin dashboard easy to use?", "answer": "Yes, it is designed specifically for non-technical business owners with a clean, intuitive interface that works on both desktop and mobile."}
    ]'::jsonb,
    true,
    3
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    original_price = EXCLUDED.original_price,
    badge = EXCLUDED.badge,
    description = EXCLUDED.description,
    recommended = EXCLUDED.recommended,
    demo_url = EXCLUDED.demo_url,
    features = EXCLUDED.features,
    editing_policy = EXCLUDED.editing_policy,
    additional_edits_cost = EXCLUDED.additional_edits_cost,
    included = EXCLUDED.included,
    not_included = EXCLUDED.not_included,
    hosting_conditions = EXCLUDED.hosting_conditions,
    domain_conditions = EXCLUDED.domain_conditions,
    service_duration = EXCLUDED.service_duration,
    renewal_conditions = EXCLUDED.renewal_conditions,
    recommended_businesses = EXCLUDED.recommended_businesses,
    faqs = EXCLUDED.faqs,
    sort_order = EXCLUDED.sort_order;
