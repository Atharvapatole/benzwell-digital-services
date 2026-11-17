'use client';

import { useState } from 'react';
import { WebsiteSettings } from '@/types';
import { updateWebsiteSetting } from '@/actions/leads';
import {
  Building2,
  Mail,
  Phone,
  MessageSquare,
  Globe,
  Server,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Save,
} from 'lucide-react';

interface SettingsClientProps {
  settings: WebsiteSettings;
  adminEmail: string;
}

export default function SettingsClient({ settings, adminEmail }: SettingsClientProps) {
  // Business Info form state
  const [brandName, setBrandName] = useState(settings.business_info.brand_name || 'BenzWell');
  const [tagline, setTagline] = useState(settings.business_info.tagline || '');
  const [supportEmail, setSupportEmail] = useState(settings.business_info.support_email || '');
  const [whatsappNumber, setWhatsappNumber] = useState(settings.business_info.whatsapp_number || '');
  const [callingNumber, setCallingNumber] = useState(settings.business_info.calling_number || '');
  const [address, setAddress] = useState(settings.business_info.address || '');

  // Service Policies state
  const [hostingTerms, setHostingTerms] = useState(settings.service_policies.hosting_terms || '');
  const [domainTerms, setDomainTerms] = useState(settings.service_policies.domain_terms || '');
  const [serviceDurationTerms, setServiceDurationTerms] = useState(
    settings.service_policies.service_duration_terms || ''
  );

  const [isSavingInfo, setIsSavingInfo] = useState(false);
  const [infoSuccess, setInfoSuccess] = useState(false);
  const [infoError, setInfoError] = useState<string | null>(null);

  const [isSavingPolicies, setIsSavingPolicies] = useState(false);
  const [policySuccess, setPolicySuccess] = useState(false);
  const [policyError, setPolicyError] = useState<string | null>(null);

  const handleSaveBusinessInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingInfo(true);
    setInfoError(null);
    setInfoSuccess(false);

    try {
      await updateWebsiteSetting('business_info', {
        brand_name: brandName.trim(),
        tagline: tagline.trim(),
        support_email: supportEmail.trim(),
        whatsapp_number: whatsappNumber.trim(),
        calling_number: callingNumber.trim(),
        address: address.trim(),
        production_url: settings.business_info.production_url || 'https://digital.benzwell.in',
      });
      setInfoSuccess(true);
      setTimeout(() => setInfoSuccess(false), 3000);
    } catch (err: unknown) {
      setInfoError(err instanceof Error ? err.message : 'Failed to save business info.');
    } finally {
      setIsSavingInfo(false);
    }
  };

  const handleSavePolicies = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingPolicies(true);
    setPolicyError(null);
    setPolicySuccess(false);

    try {
      await updateWebsiteSetting('service_policies', {
        hosting_terms: hostingTerms.trim(),
        domain_terms: domainTerms.trim(),
        service_duration_terms: serviceDurationTerms.trim(),
      });
      setPolicySuccess(true);
      setTimeout(() => setPolicySuccess(false), 3000);
    } catch (err: unknown) {
      setPolicyError(err instanceof Error ? err.message : 'Failed to save policies.');
    } finally {
      setIsSavingPolicies(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Admin Account Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Administrative Access
          </span>
          <div className="text-lg font-bold text-slate-900 mt-0.5">BenzWell Admin Panel</div>
          <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5 mt-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Direct Access • Full Management Privileges</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Business Information Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <Building2 className="w-5 h-5 text-brand-600" />
            <h2 className="text-lg font-bold text-slate-900">Business Details & Contact Info</h2>
          </div>

          {infoError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{infoError}</span>
            </div>
          )}

          {infoSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Business details updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSaveBusinessInfo} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Brand Name
              </label>
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-brand-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-brand-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Support Email
              </label>
              <input
                type="email"
                required
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-brand-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  required
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Calling Number
                </label>
                <input
                  type="text"
                  required
                  value={callingNumber}
                  onChange={(e) => setCallingNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-brand-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Physical / Operations Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-brand-600"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSavingInfo}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors disabled:opacity-60"
              >
                {isSavingInfo ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Business Info</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Policy Terms Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <Server className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900">Hosting & Domain Policy Text</h2>
          </div>

          {policyError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{policyError}</span>
            </div>
          )}

          {policySuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Service policies updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSavePolicies} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Hosting Terms (Visible on Homepage & Plan details)
              </label>
              <textarea
                rows={3}
                required
                value={hostingTerms}
                onChange={(e) => setHostingTerms(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-600 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Domain Policy Text (Transparent ₹1,000 threshold explanation)
              </label>
              <textarea
                rows={4}
                required
                value={domainTerms}
                onChange={(e) => setDomainTerms(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-600 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Service Duration & Renewal Terms
              </label>
              <textarea
                rows={3}
                required
                value={serviceDurationTerms}
                onChange={(e) => setServiceDurationTerms(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-600 leading-relaxed"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSavingPolicies}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors disabled:opacity-60"
              >
                {isSavingPolicies ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Service Policies</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
