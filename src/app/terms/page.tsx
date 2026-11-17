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
              For the <strong>Basic Plan</strong> (₹7,999), three (3) minor edits are included free of charge. For the <strong>Standard Plan</strong> (₹14,999), five (5) minor edits are included free of charge.
            </p>
            <p>
              Free minor edits include: adding products, deleting products, updating product information, changing text, replacing images, and updating business contact details.
            </p>
            <p>
              Free minor edits do NOT include: changing the website’s overall layout, changing the entire design structure, adding major new functionality, or rebuilding pages. Major redesigns require a separate quote. Additional minor edits packages can be purchased at ₹1,000 for five (5) edits.
            </p>
            <p>
              For the <strong>Premium Plan</strong> (₹19,999), content edits within the supported admin dashboard can be performed directly by the customer with zero editing charges. Major layout redesigns or custom backend scope additions outside the agreed terms are quoted separately.
            </p>
          </section>

          <section className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900">5. Service Duration & Renewal</h2>
            <p>{settings.service_policies.service_duration_terms}</p>
          </section>

          <section className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900">6. Professional Business Email Mailbox Policy</h2>
            <p>
              All three website packages (Basic Plan, Standard Plan, and Premium Plan) include <strong>1 Professional Business Email Mailbox</strong> associated with your registered domain (e.g., info@yourdomain.com or contact@yourdomain.com) for one (1) full year.
            </p>
            <p>
              This is an actual professional business mailbox hosted on enterprise email infrastructure. It is separate and distinct from automated transactional lead notifications (e.g. Resend).
            </p>
            <p>
              Renewal after the first year is charged separately at the prevailing standard email hosting provider rate. Additional email mailboxes can be purchased separately at standard rates. Domain registration policies apply.
            </p>
          </section>
        </div>
      </main>
      <Footer businessInfo={settings.business_info} />
    </div>
  );
}
