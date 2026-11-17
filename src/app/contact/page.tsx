import { Suspense } from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryForm from '@/components/home/EnquiryForm';
import { getWebsiteSettings } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contact Us – Select Your Website Plan & Build Your Business Presence | BenzWell',
  description:
    "Tell us about your requirements. Our team will contact you to discuss the best website solution for your business. Choose from Basic Plan, Standard Plan, or Premium Plan.",
  alternates: {
    canonical: 'https://digital.benzwell.in/contact',
  },
};

export default async function ContactPage() {
  const settings = await getWebsiteSettings();

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 selection:bg-brand-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-12 sm:pt-16">
        <Suspense
          fallback={
            <div className="py-32 text-center text-slate-400 text-sm">
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
