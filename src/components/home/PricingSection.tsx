import Link from 'next/link';
import { Check, ExternalLink, ArrowRight, Sparkles, Shield, Info } from 'lucide-react';
import { Plan } from '@/types';
import QrCodeCard from '@/components/common/QrCodeCard';

interface PricingSectionProps {
  plans: Plan[];
}

export default function PricingSection({ plans }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-100 text-brand-800 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            Clear, Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Choose the Perfect Plan for Your Business
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Every package includes 1-year fast cloud hosting, responsive design, and transparent
            terms. No hidden maintenance fees or surprise charges.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isMedium = plan.slug === 'medium';
            const isBasic = plan.slug === 'basic';
            const isHigher = plan.slug === 'higher' || plan.slug === 'full-stack';

            return (
              <div
                key={plan.slug}
                className={`relative flex flex-col rounded-3xl transition-all duration-300 ${
                  isMedium
                    ? 'bg-white border-2 border-brand-500 shadow-2xl shadow-brand-500/10 lg:-translate-y-3 z-10'
                    : 'bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:border-slate-300'
                }`}
              >
                {/* Visual Recommendation Highlight for Medium Package */}
                {isMedium && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-600 to-brand-800 text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-brand-200" />
                    Recommended Package
                  </div>
                )}

                <div className="p-8 sm:p-9 flex-1 flex flex-col">
                  {/* Top Header */}
                  <div className="space-y-2 pb-6 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                        {plan.badge || (isBasic ? 'Starter' : isMedium ? 'Customized' : 'Advanced')}
                      </span>
                      {plan.original_price && (
                        <span className="text-xs text-slate-400 line-through">
                          {plan.currency}
                          {plan.original_price.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>

                    <p className="text-xs text-slate-600 leading-relaxed min-h-[40px]">
                      {plan.description}
                    </p>

                    <div className="pt-3 flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                        {plan.currency}
                        {plan.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-medium text-slate-500">/ 1st year included</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="py-6 flex-1 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Package Features:
                    </div>
                    <ul className="space-y-2.5">
                      {plan.features.slice(0, 10).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Editing Policy Notice */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600 mb-6 space-y-1">
                    <div className="font-semibold text-slate-800 flex items-center gap-1">
                      <Info className="w-3 h-3 text-slate-400" />
                      Editing Policy:
                    </div>
                    <p className="line-clamp-2 leading-relaxed">
                      {plan.editing_policy}
                    </p>
                  </div>

                  {/* Card Actions */}
                  <div className="space-y-3 pt-2">
                    {/* Primary Plan CTA */}
                    <Link
                      href={`/#contact?plan=${encodeURIComponent(
                        plan.slug === 'basic'
                          ? 'Basic Plan – ₹7,999'
                          : plan.slug === 'medium'
                          ? 'Standard Plan – ₹14,999'
                          : 'Premium Plan – ₹19,999'
                      )}`}
                      className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm active:scale-95 ${
                        isMedium
                          ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/25 shadow-lg'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <span>
                        {isBasic
                          ? 'Get Basic Plan'
                          : isMedium
                          ? 'Get Standard Plan'
                          : 'Get Premium Plan'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {/* Basic Plan ONLY: See Demo Website button */}
                    {isBasic && (
                      <a
                        href={plan.demo_url || process.env.NEXT_PUBLIC_BASIC_DEMO_URL || 'https://demo-basic.benzwell.in'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-brand-200 bg-brand-50/70 hover:bg-brand-100 text-brand-800 text-xs font-semibold transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-brand-600" />
                        <span>See Demo Website</span>
                      </a>
                    )}

                    {/* QR Code Scanner / Download component */}
                    <QrCodeCard planSlug={plan.slug} planName={plan.name} />

                    {/* Detailed Specifications Link */}
                    <div className="text-center pt-1">
                      <Link
                        href={`/plans/${plan.slug}`}
                        className="text-xs font-semibold text-brand-600 hover:text-brand-800 hover:underline inline-flex items-center gap-1"
                      >
                        <span>View complete terms & specifications</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Comparison Link */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-slate-600 bg-white px-5 py-3 rounded-full border border-slate-200 shadow-sm">
            <Shield className="w-4 h-4 text-brand-600" />
            <span>Need an in-depth feature breakdown?</span>
            <Link
              href="/plans/basic#comparison"
              className="text-brand-600 font-semibold hover:underline"
            >
              Compare All Three Plans &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
