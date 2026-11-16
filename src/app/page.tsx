import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import PricingSection from '@/components/home/PricingSection';
import TransparentTermsSection from '@/components/home/TransparentTermsSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import FaqSection from '@/components/home/FaqSection';
import EnquiryForm from '@/components/home/EnquiryForm';
import { getPlans, getWebsiteSettings } from '@/lib/data';

export const revalidate = 60; // ISR cache revalidation every 60s

export default async function HomePage() {
  const [plans, settings] = await Promise.all([
    getPlans(),
    getWebsiteSettings(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-brand-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <WhyChooseSection />
        <PricingSection plans={plans} />
        <TransparentTermsSection policies={settings.service_policies} />
        <HowItWorksSection />
        <FaqSection />

        <Suspense
          fallback={
            <div className="py-24 bg-slate-900 text-center text-slate-400 text-sm">
              Loading enquiry form...
            </div>
          }
        >
          <EnquiryForm whatsappNumber={settings.business_info.whatsapp_number} />
        </Suspense>
      </main>

      <Footer businessInfo={settings.business_info} />
    </div>
  );
}
