import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getWebsiteSettings } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | BenzWell',
  description: 'Terms of service, hosting, domain policies, and minor edit rules for BenzWell websites.',
};

export default async function TermsPage() {
  const settings = await getWebsiteSettings();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-4">
            <h1 className="text-3xl font-extrabold text-slate-900">Terms & Conditions</h1>
            <p className="text-xs text-slate-400 mt-1">Effective Date: November 2026</p>
          </div>

          <section className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900">1. Website Development Scope</h2>
            <p>
              BenzWell develops websites based on the package selected by the customer (Basic Plan, Standard Plan,
              or Premium Plan). Project deliverables and specifications are confirmed during the initial
              discovery phase before development commences.
            </p>
          </section>

          <section className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900">2. Hosting Terms</h2>
            <p>{settings.service_policies.hosting_terms}</p>
          </section>

          <section className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900">3. Domain Registration Policy</h2>
            <p>{settings.service_policies.domain_terms}</p>
          </section>

          <section className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900">4. Content Edits & Maintenance Policy</h2>
            <p>
              For Basic Plan and Standard Plan packages, three minor edits are included free of charge (such as
              adding or removing products, swapping images, updating text or contact details). Major
              structural rebuilds, layout overhauls, or new backend features are not included and require
              a separate quote. Additional minor edits can be purchased at ₹1,000 for five edits.
            </p>
            <p>
              For the Premium Plan package, content edits within the supported admin dashboard can be performed
              directly by the customer with zero editing charges.
            </p>
          </section>

          <section className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900">5. Service Duration & Renewal</h2>
            <p>{settings.service_policies.service_duration_terms}</p>
          </section>
        </div>
      </main>
      <Footer businessInfo={settings.business_info} />
    </div>
  );
}
