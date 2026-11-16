import { Plan, BusinessInfo, ServicePolicies } from '@/types';

export const PRODUCTION_URL = 'https://digital.benzwell.in';
export const ADMIN_URL = 'https://digital.benzwell.in/admin';

export const DEFAULT_BUSINESS_INFO: BusinessInfo = {
  brand_name: 'BenzWell',
  tagline: 'Professional Websites. Powerful Digital Experiences.',
  support_email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@benzwell.in',
  whatsapp_number: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || '+919876543210',
  calling_number: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+919876543210',
  address: 'Digital Solutions & Web Development, India',
  production_url: process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_URL,
};

export const DEFAULT_SERVICE_POLICIES: ServicePolicies = {
  hosting_terms:
    'Hosting is included for one year in every package. The first-year hosting cost is included in the package price. Hosting renewal is required after the first year to maintain server uptime and security. The website may be suspended if hosting is not renewed after the agreed expiry and formal notice period.',
  domain_terms:
    'Domain registration is not automatically included in the package price. Special condition: If the selected domain registration price is ₹1,000 or less, it will be provided within the package price. If the domain costs more than ₹1,000, the additional domain cost must be paid separately by the customer (e.g., an eligible domain costing ₹799 is fully included; a domain costing ₹1,499 means the customer pays the additional ₹499). The actual domain price must be checked at the time of registration, and the domain is registered in the customer’s ownership.',
  service_duration_terms:
    'One year of service support is included with every package. After one year, renewal is required to continue hosting and applicable service support. Renewal pricing will be communicated transparently with an eligible renewal discount where applicable. We never display an invented or arbitrary renewal price.',
};

export const DEFAULT_PLANS: Plan[] = [
  {
    slug: 'basic',
    name: 'Basic Website',
    price: 7999,
    original_price: 11999,
    currency: '₹',
    badge: 'Starter Package',
    description: 'A professional starting point for businesses that need an online presence.',
    recommended: false,
    demo_url: process.env.NEXT_PUBLIC_BASIC_DEMO_URL || 'https://demo-basic.benzwell.in',
    features: [
      'Simple professional 5-page website',
      'Home page',
      'About Us page',
      'Products / Services page',
      'Contact page',
      'One additional page',
      'Product display section',
      'Business contact information',
      'WhatsApp contact integration',
      'Mobile responsive design',
      'Basic SEO-friendly structure',
      'Website hosting included for one year',
      'Three free minor content edits included',
      'Domain cost subject to domain pricing policy',
    ],
    editing_policy:
      'Three minor edits are included free. Examples: Adding products, deleting products, changing text, replacing images, updating contact details. Major changes are not included: changing the website’s overall layout, changing the entire design structure, adding major new functionality, or rebuilding pages.',
    additional_edits_cost: '₹1,000 for five additional minor edits',
    included: [
      'Up to 5 clean, responsive pages (Home, About, Products/Services, Contact + 1 Custom)',
      'Product & service catalog display section',
      'One-click WhatsApp chat integration',
      'Direct calling buttons and Google Maps embed',
      'Fast Cloud Hosting for 1 full year',
      '3 free minor content edits (text, images, contact info)',
      'SSL Security Certificate & Mobile Optimization',
      'Domain included if registration price is ₹1,000 or less',
    ],
    not_included: [
      'Self-service admin panel (available in Full Stack)',
      'Database-driven dynamic backend or user logins',
      'E-commerce payment gateway checkout',
      'Major structural redesigns or complete layout overhauls',
    ],
    hosting_conditions:
      'Reliable cloud hosting is provided for 1 full year at zero additional charge. First-year hosting is included in the package price. Annual renewal is required after 12 months.',
    domain_conditions:
      'If your chosen standard domain (.com, .in, etc.) costs ₹1,000 or less at registration, it is included inside the ₹7,999 package. If it exceeds ₹1,000, only the additional difference is payable.',
    service_duration: '1 Year of technical support and website uptime monitoring.',
    renewal_conditions:
      'Hosting and maintenance renewal is required after 1 year. Rates are communicated clearly with an applicable renewal discount. Never arbitrary.',
    recommended_businesses: [
      'Local retail shops & merchants',
      'Independent consultants, lawyers & accountants',
      'Clinics, doctors & wellness practices',
      'Contractors & home service providers',
      'New businesses establishing their first online footprint',
    ],
    faqs: [
      {
        question: 'Which pages are included in the 5-page Basic Website?',
        answer:
          'You get Home, About Us, Products/Services, Contact, and 1 additional custom page tailored to your specific offering.',
      },
      {
        question: 'What qualifies as a free minor edit?',
        answer:
          'Minor edits include adding or removing a product, changing text, swapping out an image, or updating your phone number/address. Major structural redesigns are not minor edits.',
      },
      {
        question: 'Can I test drive a demo?',
        answer:
          'Yes! The Basic Website package features a live demo so you can preview the clean, responsive layout before getting started.',
      },
    ],
    is_active: true,
    sort_order: 1,
  },
  {
    slug: 'medium',
    name: 'Medium Website',
    price: 14999,
    original_price: 21999,
    currency: '₹',
    badge: 'Recommended Package',
    description:
      'A customized professional website designed around your business identity and requirements.',
    recommended: true,
    demo_url: null, // As specified: Do not display a demo button for this plan
    features: [
      'Everything included in Basic Website',
      'Customized website design',
      'Customized layouts and page structures',
      'Premium UI/UX',
      'Multiple customized sections',
      'Advanced product and service presentation',
      'Custom business branding',
      'Enhanced contact forms',
      'WhatsApp integration',
      'Responsive desktop, tablet and mobile layouts',
      'SEO-friendly structure',
      'One-year hosting',
      'Three free minor edits',
    ],
    editing_policy:
      'Same editing terms as the Basic package: Three minor edits are included free (adding/deleting products, changing text, replacing images, updating contact details). Major layout redesigns are not included.',
    additional_edits_cost: '₹1,000 for five additional minor edits',
    included: [
      'Everything included in the Basic Website package',
      'Bespoke visual design matched to your corporate identity and color palette',
      'Advanced presentation sections for products, case studies, or services',
      'Interactive custom contact and quote inquiry forms',
      'Tailored UI/UX optimized for high conversion on mobile & desktop',
      'One-year high-speed cloud hosting',
      '3 free minor content edits included',
      'Domain included if registration price is ₹1,000 or less',
    ],
    not_included: [
      'Admin content management dashboard (available in Full Stack)',
      'Backend database integration for self-service edits',
      'Full custom backend API architecture',
    ],
    hosting_conditions:
      'High-speed cloud hosting is included for 1 full year with 99.9% uptime target and SSL encryption.',
    domain_conditions:
      'If the selected domain costs ₹1,000 or less, it is covered in the package. If the domain exceeds ₹1,000, the client pays only the difference.',
    service_duration: '1 Year of priority technical support and performance monitoring.',
    renewal_conditions:
      'Annual renewal required after 12 months for hosting & domain maintenance. Transparent pricing with renewal discount.',
    recommended_businesses: [
      'Growing small and mid-sized businesses',
      'Manufacturers, exporters & B2B vendors',
      'Real estate agencies & developers',
      'Coaching institutes & training centers',
      'Professional firms wanting a distinct, branded online presence',
    ],
    faqs: [
      {
        question: 'Why is Medium the recommended package?',
        answer:
          'Medium provides custom design, bespoke sections, and brand-tailored styling that gives your business an elevated corporate appearance without the overhead of maintaining a database backend.',
      },
      {
        question: 'Is there a demo for the Medium package?',
        answer:
          'No demo button is shown for the Medium package because every Medium website is uniquely designed from scratch according to the specific branding and layouts of each client.',
      },
    ],
    is_active: true,
    sort_order: 2,
  },
  {
    slug: 'full-stack',
    name: 'Higher Website – Full Stack',
    price: 19999,
    original_price: 29999,
    currency: '₹',
    badge: 'Custom & Admin Dashboard',
    description:
      'A complete custom business website with backend functionality and your own admin dashboard.',
    recommended: false,
    demo_url: null, // As specified: Do not display a demo button for this plan
    features: [
      'Everything included in the Medium package where applicable',
      'Fully customized frontend',
      'Full-stack backend development',
      'Custom admin dashboard',
      'Admin login and authentication',
      'Manage website content from the dashboard',
      'Add, edit and delete products',
      'Manage website information',
      'Manage images and content',
      'Backend database integration',
      'Custom functionality according to agreed scope',
      'One-year hosting',
      'One-year service support',
    ],
    editing_policy:
      'No paid minor-edit packages are required for normal content changes that the client can perform through their admin panel. The client controls the supported website content through the admin dashboard. Major new features, structural redesigns and additional development work outside the agreed scope may be quoted separately.',
    additional_edits_cost: 'Self-service editing via your admin dashboard (zero editing fees)',
    included: [
      'Everything in the Medium package where applicable',
      'Custom secure Admin Dashboard with authenticated login',
      'Full-stack backend with PostgreSQL database integration',
      'Self-service management: add, edit, delete products & update business info',
      'Dynamic media and content management',
      'Custom backend logic tailored to your specific agreed workflow',
      'One-year premium cloud hosting with automated backups',
      'One-year comprehensive service support',
      'Domain included if registration price is ₹1,000 or less',
    ],
    not_included: [
      'Major scope extensions or new complex custom modules not agreed initially (quoted separately)',
      'Third-party paid SaaS API subscriptions (e.g. SMS gateways, paid external APIs)',
    ],
    hosting_conditions:
      'Premium cloud hosting with database server and daily automated backups included for the first full year.',
    domain_conditions:
      'If the selected domain costs ₹1,000 or less, it is covered in the package. If it costs more than ₹1,000, only the additional domain cost is paid separately by the customer.',
    service_duration:
      '1 Year of complete full-stack support, security updates, and database maintenance.',
    renewal_conditions:
      'Annual hosting, database infrastructure, and maintenance renewal required after 1 year. Fully transparent renewal rates with applicable client loyalty discount.',
    recommended_businesses: [
      'Businesses requiring regular catalog, price, or product updates',
      'Wholesalers, distributors, and multi-product companies',
      'Service companies needing internal dashboard management',
      'Businesses looking for long-term independence without relying on developers for every change',
    ],
    faqs: [
      {
        question: 'Do I need to pay for minor edits with the Full Stack package?',
        answer:
          'No! You get your own secure admin panel. You can add, edit, or delete products, change phone numbers, update text, and upload images yourself anytime without paying for minor edits.',
      },
      {
        question: 'Can non-technical business owners manage the dashboard?',
        answer:
          'Absolutely. The dashboard is crafted with an intuitive, clean interface designed specifically for business owners, accessible on both desktop and mobile.',
      },
    ],
    is_active: true,
    sort_order: 3,
  },
];

export const PLAN_OPTIONS = [
  { value: 'Basic Website – ₹7,999', label: 'Basic Website – ₹7,999' },
  { value: 'Medium Website – ₹14,999', label: 'Medium Website – ₹14,999' },
  { value: 'Higher Website – ₹19,999', label: 'Higher Website – ₹19,999' },
  { value: 'Not Sure – Need Guidance', label: 'Not Sure – Need Guidance' },
];

export const BUDGET_OPTIONS = [
  { value: 'Below ₹5,000', label: 'Below ₹5,000' },
  { value: '₹5,000 – ₹8,000', label: '₹5,000 – ₹8,000' },
  { value: '₹8,000 – ₹15,000', label: '₹8,000 – ₹15,000' },
  { value: '₹15,000 – ₹20,000', label: '₹15,000 – ₹20,000' },
  { value: 'Above ₹20,000', label: 'Above ₹20,000' },
  { value: 'Not Decided Yet', label: 'Not Decided Yet' },
];

export const LEAD_STATUS_CONFIG = {
  new: { label: 'New', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  contacted: { label: 'Contacted', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  interested: { label: 'Interested', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  demo_requested: { label: 'Demo Requested', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  converted: { label: 'Converted', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  not_interested: { label: 'Not Interested', color: 'bg-slate-100 text-slate-600 border-slate-200' },
};
