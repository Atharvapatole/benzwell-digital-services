import Link from 'next/link';
import { ArrowRight, MessageSquare, CheckCircle2, Shield, Laptop, Smartphone, ExternalLink } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial gradient decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-brand-200/50 via-brand-100/30 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-800 text-xs font-semibold tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
            Clear Terms • Real Quality • 1-Year Hosting Included
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            Your Business Deserves a{' '}
            <span className="bg-gradient-to-r from-brand-600 via-brand-700 to-brand-900 bg-clip-text text-transparent">
              Professional Website.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Build your online presence with professionally designed websites, customized business
            solutions and powerful admin dashboards.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-brand-600 text-white font-semibold shadow-lg shadow-brand-500/25 hover:bg-brand-700 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Plans</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-slate-700 font-semibold border border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4 text-slate-500" />
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>100% Transparent Terms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Fast Mobile Responsive</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>One-Year Support</span>
            </div>
          </div>
        </div>

        {/* Visual Mockup: Desktop + Mobile Devices */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          {/* Main Desktop Mockup */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-brand-500/10">
            {/* Browser Top Bar */}
            <div className="h-10 bg-slate-100 border-b border-slate-200 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="bg-white border border-slate-200 text-slate-500 text-xs px-6 py-1 rounded-md flex items-center gap-2 max-w-xs w-full justify-center shadow-inner">
                <Shield className="w-3 h-3 text-emerald-500" />
                <span className="font-mono truncate">https://yourbusiness.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Laptop className="w-4 h-4 text-slate-500" />
              </div>
            </div>

            {/* Desktop Website Preview Canvas */}
            <div className="bg-slate-50 p-6 md:p-8 space-y-6">
              {/* Simulated Hero Banner */}
              <div className="bg-white rounded-xl p-6 md:p-10 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 max-w-lg">
                  <div className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-md">
                    Custom Business Solution
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                    Elevate Your Brand with a Fast, Modern Website
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Showcase your products, capture customer enquiries instantly via WhatsApp, and manage your online presence effortlessly.
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold">
                      Explore Services
                    </div>
                    <div className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      WhatsApp Ready
                    </div>
                  </div>
                </div>

                {/* Simulated Product / Service Cards */}
                <div className="grid grid-cols-2 gap-3 w-full md:w-72">
                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/70 text-center">
                    <div className="w-8 h-8 mx-auto bg-brand-100 text-brand-700 rounded-lg flex items-center justify-center font-bold text-xs mb-2">
                      01
                    </div>
                    <div className="text-xs font-semibold text-slate-800">5-Page Setup</div>
                    <div className="text-[10px] text-slate-500">Responsive</div>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/70 text-center">
                    <div className="w-8 h-8 mx-auto bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center font-bold text-xs mb-2">
                      02
                    </div>
                    <div className="text-xs font-semibold text-slate-800">WhatsApp Chat</div>
                    <div className="text-[10px] text-slate-500">Instant Leads</div>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/70 text-center">
                    <div className="w-8 h-8 mx-auto bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center font-bold text-xs mb-2">
                      03
                    </div>
                    <div className="text-xs font-semibold text-slate-800">1-Yr Hosting</div>
                    <div className="text-[10px] text-slate-500">SSL Included</div>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/70 text-center">
                    <div className="w-8 h-8 mx-auto bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center font-bold text-xs mb-2">
                      04
                    </div>
                    <div className="text-xs font-semibold text-slate-800">Admin Portal</div>
                    <div className="text-[10px] text-slate-500">Full Stack</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlapping Mobile Device Mockup */}
          <div className="hidden lg:block absolute -bottom-8 -right-6 w-60 rounded-3xl border-4 border-slate-900 bg-slate-950 p-2 shadow-2xl">
            {/* Mobile Screen */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 p-3.5 space-y-3">
              {/* Phone notch */}
              <div className="w-16 h-2.5 bg-slate-900 rounded-full mx-auto mb-2" />
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-xs text-slate-900">BenzWell Client</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-slate-900 leading-tight">
                  Mobile First Experience
                </div>
                <div className="text-[9px] text-slate-500">
                  Tap to call & message directly on WhatsApp.
                </div>
              </div>
              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-[10px] font-semibold flex items-center justify-center gap-1.5 shadow-sm">
                <span>Chat on WhatsApp</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 text-[9px] text-slate-600 space-y-1">
                <div className="font-medium text-slate-800">Product Catalog</div>
                <div className="h-1 bg-slate-200 rounded w-3/4"></div>
                <div className="h-1 bg-slate-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
