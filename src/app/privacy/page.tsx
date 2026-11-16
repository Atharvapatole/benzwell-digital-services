import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getWebsiteSettings } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | BenzWell',
  description: 'How BenzWell collects, handles, and protects your business and contact data.',
};

export default async function PrivacyPage() {
  const settings = await getWebsiteSettings();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-6">
          <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
          <p className="text-xs text-slate-400">Last updated: November 2026</p>

          <section className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              When you submit an enquiry through BenzWell (digital.benzwell.in), we collect your name,
              email address, WhatsApp number, calling phone number, preferred website plan, estimated
              budget, and optional requirement notes.
            </p>
          </section>

          <section className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900">2. How We Use Your Information</h2>
            <p>
              We use your contact details solely to communicate with you regarding your website development
              project, discuss requirements, provide technical consultations, and deliver website updates.
              We do not sell, rent, or trade your personal information to third parties.
            </p>
          </section>

          <section className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900">3. Data Security & Storage</h2>
            <p>
              All customer lead data is stored securely in encrypted PostgreSQL databases utilizing
              Row Level Security (RLS). Public visitors cannot view, query, or delete customer data.
              Only verified administrative team members have access to review incoming leads.
            </p>
          </section>

          <section className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900">4. Contact Us</h2>
            <p>
              If you have any questions or requests regarding your data, please contact us at{' '}
              <a href={`mailto:${settings.business_info.support_email}`} className="text-brand-600 underline">
                {settings.business_info.support_email}
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer businessInfo={settings.business_info} />
    </div>
  );
}
