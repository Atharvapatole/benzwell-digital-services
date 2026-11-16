import { Server, Globe, Clock, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { ServicePolicies } from '@/types';

interface TransparentTermsSectionProps {
  policies?: ServicePolicies;
}

export default function TransparentTermsSection({ policies }: TransparentTermsSectionProps) {
  return (
    <section id="terms" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            100% Honest Disclosure
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Transparent Pricing & Service Terms
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            We believe in complete clarity from day one. Here is exactly how hosting, domains, and
            annual service terms work for every BenzWell package.
          </p>
        </div>

        {/* 3 Clear Columns for Hosting, Domain, Service Duration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 1. Hosting Policy */}
          <div className="rounded-2xl p-7 bg-slate-50 border border-slate-200/90 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Hosting Terms</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {policies?.hosting_terms ||
                  'Hosting is included for one full year in every package. The first-year hosting cost is built into the package price.'}
              </p>
              <ul className="space-y-2.5 pt-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>First-year cloud hosting is included in your package fee.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>High-speed server setup and free SSL encryption included.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Hosting renewal is required after 1 year. The website may be suspended if hosting
                    is not renewed after the agreed expiry and notice period.
                  </span>
                </li>
              </ul>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-500 font-medium">
              Renewal fees are communicated with ample advance notice before expiration.
            </div>
          </div>

          {/* 2. Domain Policy */}
          <div className="rounded-2xl p-7 bg-slate-50 border border-slate-200/90 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Domain Policy</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Domain registration is not automatically included in the package price. However, we
                provide a clear ₹1,000 allowance policy:
              </p>
              <div className="bg-white p-3.5 rounded-xl border border-emerald-200 text-xs text-slate-700 space-y-2">
                <div className="font-semibold text-emerald-800">Special Condition:</div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  If your selected domain registration price is <strong>₹1,000 or less</strong>, it is
                  provided completely within the package price.
                </p>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  If the domain costs more than ₹1,000, only the additional difference is paid by the
                  customer.
                </p>
              </div>

              {/* Real World Examples */}
              <div className="space-y-1.5 pt-1 text-xs">
                <div className="font-semibold text-slate-800 text-[11px] uppercase tracking-wide">
                  Transparent Examples:
                </div>
                <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 text-slate-700 text-xs flex justify-between">
                  <span>Eligible domain costing ₹799:</span>
                  <span className="font-bold text-emerald-700">Fully Included</span>
                </div>
                <div className="p-2 rounded-lg bg-amber-50/60 border border-amber-100 text-slate-700 text-xs flex justify-between">
                  <span>Premium domain costing ₹1,499:</span>
                  <span className="font-bold text-amber-700">You pay only ₹499 extra</span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-500 font-medium">
              Domains are registered directly in the customer’s legal ownership.
            </div>
          </div>

          {/* 3. Service Duration & Support */}
          <div className="rounded-2xl p-7 bg-slate-50 border border-slate-200/90 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Service Duration</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {policies?.service_duration_terms ||
                  'One year of service support is included with your website to guarantee uptime and smooth operation.'}
              </p>
              <ul className="space-y-2.5 pt-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>12 months of technical uptime maintenance and assistance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Renewal discount offered to continuing clients.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Renewal pricing is communicated based on prevailing cloud and registry costs. We
                    never display or charge invented rates.
                  </span>
                </li>
              </ul>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-500 font-medium">
              Terms are agreed upon upfront prior to project commencement.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
