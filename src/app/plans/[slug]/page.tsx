import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import QrCodeCard from '@/components/common/QrCodeCard';
import PackageComparisonTable from '@/components/plans/PackageComparisonTable';
import { getPlanBySlug, getWebsiteSettings, getPlans } from '@/lib/data';
import {
  Check,
  X,
  ArrowRight,
  Sparkles,
  Server,
  Globe,
  Clock,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  Building2,
  Edit3,
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const plan = await getPlanBySlug(slug);

  if (!plan) {
    return {
      title: 'Plan Not Found | BenzWell',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://digital.benzwell.in';

  return {
    title: `${plan.name} – Detailed Specifications & Pricing`,
    description: plan.description,
    alternates: {
      canonical: `${siteUrl}/plans/${plan.slug}`,
    },
    openGraph: {
      title: `${plan.name} (₹${plan.price.toLocaleString('en-IN')}) | BenzWell`,
      description: plan.description,
      url: `${siteUrl}/plans/${plan.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return [
    { slug: 'basic' },
    { slug: 'medium' },
    { slug: 'higher' },
    { slug: 'full-stack' },
  ];
}

export default async function PlanDetailPage({ params }: Props) {
  const { slug } = await params;
  const [plan, settings] = await Promise.all([
    getPlanBySlug(slug),
    getWebsiteSettings(),
  ]);

  if (!plan) {
    notFound();
  }

  const isBasic = plan.slug === 'basic';
  const isMedium = plan.slug === 'medium';
  const isFullStack = plan.slug === 'full-stack';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-brand-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/#pricing" className="hover:text-slate-900 transition-colors">
              Plans
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">{plan.name}</span>
          </nav>

          {/* Top Plan Hero Header */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-md bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider">
                    {plan.badge || 'Website Package'}
                  </span>
                  {plan.recommended && (
                    <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Recommended
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  {plan.name}
                </h1>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                  {plan.description}
                </p>

                <div className="pt-2 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900">
                    {plan.currency}
                    {plan.price.toLocaleString('en-IN')}
                  </span>
                  {plan.original_price && (
                    <span className="text-sm text-slate-400 line-through">
                      {plan.currency}
                      {plan.original_price.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-xs text-slate-500 font-medium">
                    (First year cloud hosting included)
                  </span>
                </div>
              </div>

              {/* Quick Actions & QR Box */}
              <div className="lg:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Ready to get started?
                </div>

                <Link
                  href={`/#contact?plan=${encodeURIComponent(
                    isBasic
                      ? 'Basic Plan – ₹7,999'
                      : isMedium
                      ? 'Medium Website Plan – ₹14,999'
                      : 'Higher Website Plan – ₹19,999'
                  )}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-colors"
                >
                  <span>Select This Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {isBasic && (
                  <a
                    href={plan.demo_url || process.env.NEXT_PUBLIC_BASIC_DEMO_URL || 'https://demo-basic.benzwell.in'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-brand-200 bg-white hover:bg-slate-50 text-brand-700 font-semibold text-xs transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>See Live Demo Website</span>
                  </a>
                )}

                <div className="pt-1">
                  <QrCodeCard planSlug={plan.slug} planName={plan.name} />
                </div>
              </div>
            </div>
          </div>

          {/* Grid: What is Included vs What is Not Included */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What is Included */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-lg">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Check className="w-5 h-5 text-emerald-600" />
                </div>
                <h3>What is Included</h3>
              </div>
              <ul className="space-y-3 pt-2">
                {plan.included.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What is Not Included */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <X className="w-5 h-5 text-slate-400" />
                </div>
                <h3>What is Not Included</h3>
              </div>
              <ul className="space-y-3 pt-2">
                {plan.not_included.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                    <X className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Policies Breakdown: Editing Policy, Hosting, Domain, Service Duration, Renewal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Editing Policy */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-600 flex items-center justify-center">
                <Edit3 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Editing Policy</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{plan.editing_policy}</p>
              {plan.additional_edits_cost && (
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-semibold text-slate-800">
                  Additional edits: {plan.additional_edits_cost}
                </div>
              )}
            </div>

            {/* Hosting Conditions */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Hosting Conditions</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{plan.hosting_conditions}</p>
            </div>

            {/* Domain Pricing Policy */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Domain Pricing Policy</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{plan.domain_conditions}</p>
            </div>

            {/* Service Duration */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Service Duration</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{plan.service_duration}</p>
            </div>

            {/* Renewal Conditions */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Renewal Conditions</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{plan.renewal_conditions}</p>
            </div>

            {/* Recommended Business Types */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Recommended For</h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {plan.recommended_businesses.map((biz, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                    <span>{biz}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Package Comparison Table */}
          <PackageComparisonTable currentSlug={plan.slug} />

          {/* Package Specific FAQs */}
          {plan.faqs && plan.faqs.length > 0 && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xl">
                <HelpCircle className="w-5 h-5 text-brand-600" />
                <h3>Frequently Asked Questions about {plan.name}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plan.faqs.map((faq, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <h5 className="font-bold text-sm text-slate-900">{faq.question}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Call to Action Banner */}
          <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to launch your {plan.name}?
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Submit your enquiry in less than a minute. Our team will contact you to answer any
              questions and confirm your project timeline.
            </p>
            <div>
              <Link
                href={`/#contact?plan=${encodeURIComponent(
                  isBasic
                    ? 'Basic Plan – ₹7,999'
                    : isMedium
                    ? 'Medium Website Plan – ₹14,999'
                    : 'Higher Website Plan – ₹19,999'
                )}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition-all"
              >
                <span>Submit Enquiry For {plan.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer businessInfo={settings.business_info} />
    </div>
  );
}
