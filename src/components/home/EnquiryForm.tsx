'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  Phone,
  Mail,
  User,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { leadFormSchema, LeadFormData } from '@/lib/validations/lead';
import { submitCustomerLead } from '@/actions/leads';
import { PLAN_OPTIONS, BUDGET_OPTIONS } from '@/lib/constants';

interface EnquiryFormProps {
  initialPlan?: string;
  whatsappNumber?: string;
}

export default function EnquiryForm({ initialPlan, whatsappNumber = '+919876543210' }: EnquiryFormProps) {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedLeadName, setSubmittedLeadName] = useState('');

  const queryPlan = searchParams.get('plan');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      customer_name: '',
      email: '',
      whatsapp_number: '',
      calling_number: '',
      selected_plan: (queryPlan || initialPlan || 'Basic Website – ₹7,999') as LeadFormData['selected_plan'],
      budget: '₹5,000 – ₹8,000',
      message: '',
      consent: true,
    },
  });

  useEffect(() => {
    if (queryPlan) {
      // Find matching option
      const found = PLAN_OPTIONS.find((p) => p.value === queryPlan);
      if (found) {
        setValue('selected_plan', found.value as LeadFormData['selected_plan']);
      }
    }
  }, [queryPlan, setValue]);

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitCustomerLead(data);
      if (result.success) {
        setSubmittedLeadName(data.customer_name);
        setIsSuccess(true);
        reset();
      } else {
        setSubmitError(result.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch {
      setSubmitError('A network error occurred. Please contact us via WhatsApp or phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cleanWhatsappNumber = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-900/60 border border-brand-700/60 text-brand-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              Direct Communication • No Spams
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Let&apos;s Build Your Business Website
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Tell us about your requirements. Our team will contact you to discuss the best
              solution for your business.
            </p>

            {/* Commitments */}
            <div className="pt-4 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-950 border border-brand-800/80 flex items-center justify-center text-brand-400 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Fixed, Transparent Scope</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    You know exactly what you are paying for with zero surprise costs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-950 border border-brand-800/80 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Direct WhatsApp Coordination</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Quick discussions and live milestone updates via WhatsApp.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-950 border border-brand-800/80 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Dedicated Call Discussion</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    A direct telephone walkthrough of your business requirements and domain.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Container or Success View */}
          <div className="lg:col-span-7 bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-100">
            {isSuccess ? (
              /* Success Screen */
              <div className="text-center py-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Thank You, {submittedLeadName}!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Your enquiry has been received securely. Our team will review your requirements
                    and contact you promptly to discuss the next steps.
                  </p>
                </div>

                {/* Direct WhatsApp Call to Action */}
                <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl max-w-md mx-auto space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-900">
                    Need an immediate response?
                  </div>
                  <p className="text-xs text-slate-600">
                    Connect directly with our website solutions team right now on WhatsApp.
                  </p>
                  <a
                    href={`https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
                      `Hello BenzWell Team, I just submitted an enquiry for a website development package on your website. My name is ${submittedLeadName}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-600/20 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp Now</span>
                  </a>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Submit another enquiry &rarr;
                  </button>
                </div>
              </div>
            ) : (
              /* Active Form */
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Submit Your Enquiry
                  </h3>
                  <p className="text-xs text-slate-500">
                    All fields are validated. We never share your data.
                  </p>
                </div>

                {submitError && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" />
                    <span className="leading-snug">{submitError}</span>
                  </div>
                )}

                {/* 1. Customer Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Customer Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      {...register('customer_name')}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.customer_name
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-slate-300 focus:border-brand-600 focus:ring-brand-100'
                      }`}
                    />
                  </div>
                  {errors.customer_name && (
                    <p className="text-[11px] text-rose-600 mt-1 font-medium">
                      {errors.customer_name.message}
                    </p>
                  )}
                </div>

                {/* 2. Email Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      {...register('email')}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-slate-300 focus:border-brand-600 focus:ring-brand-100'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[11px] text-rose-600 mt-1 font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* 3 & 4. WhatsApp Number & Primary Calling Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      WhatsApp Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        {...register('whatsapp_number')}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.whatsapp_number
                            ? 'border-rose-400 focus:ring-rose-200'
                            : 'border-slate-300 focus:border-brand-600 focus:ring-brand-100'
                        }`}
                      />
                    </div>
                    {errors.whatsapp_number && (
                      <p className="text-[11px] text-rose-600 mt-1 font-medium">
                        {errors.whatsapp_number.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Calling Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        {...register('calling_number')}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.calling_number
                            ? 'border-rose-400 focus:ring-rose-200'
                            : 'border-slate-300 focus:border-brand-600 focus:ring-brand-100'
                        }`}
                      />
                    </div>
                    {errors.calling_number && (
                      <p className="text-[11px] text-rose-600 mt-1 font-medium">
                        {errors.calling_number.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* 5. Which Website Plan Do You Want? */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Which Website Plan Do You Want? <span className="text-rose-500">*</span>
                  </label>
                  <select
                    {...register('selected_plan')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 transition-all"
                  >
                    {PLAN_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.selected_plan && (
                    <p className="text-[11px] text-rose-600 mt-1 font-medium">
                      {errors.selected_plan.message}
                    </p>
                  )}
                </div>

                {/* 6. What Is Your Budget? */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    What Is Your Budget? <span className="text-rose-500">*</span>
                  </label>
                  <select
                    {...register('budget')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 transition-all"
                  >
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.budget && (
                    <p className="text-[11px] text-rose-600 mt-1 font-medium">
                      {errors.budget.message}
                    </p>
                  )}
                </div>

                {/* 7. Optional Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Tell us about your business or website requirements{' '}
                    <span className="text-slate-400 font-normal normal-case">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your products, services, any preferred domain name, or specific design style..."
                    {...register('message')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 transition-all resize-none"
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-600 mt-1 font-medium">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* 8. Consent Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('consent')}
                      className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 mt-1 flex-shrink-0 cursor-pointer"
                    />
                    <span className="text-xs text-slate-600 leading-snug">
                      I agree to be contacted by the BenzWell team via WhatsApp, phone, or email
                      regarding this website development enquiry.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-[11px] text-rose-600 mt-1 font-medium">
                      {errors.consent.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Your Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit My Enquiry</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
