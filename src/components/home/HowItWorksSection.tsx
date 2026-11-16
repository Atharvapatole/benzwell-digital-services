import { CheckCircle, PhoneCall, Code, Layers } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Select Your Plan',
      description:
        'Choose a package that matches your current business requirements—whether a simple 5-page static site, a custom design, or a full-stack dashboard.',
      icon: Layers,
    },
    {
      number: '02',
      title: 'Submit Your Enquiry',
      description:
        'Fill out our straightforward enquiry form with your contact details, business category, and any initial notes or preferences.',
      icon: CheckCircle,
    },
    {
      number: '03',
      title: 'Discuss & Confirm',
      description:
        'We contact you via phone or WhatsApp to understand your precise needs, review your domain choice, and confirm the exact project scope.',
      icon: PhoneCall,
    },
    {
      number: '04',
      title: 'Website Development',
      description:
        'We design, develop, test across all device sizes, configure your hosting & security, and deliver your live, production-ready website.',
      icon: Code,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-200/70 text-slate-800 text-xs font-semibold uppercase tracking-wider">
            Clear Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            How It Works
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            From your first enquiry to final launch, we keep the process structured, transparent,
            and collaborative. Delivery timelines are finalized based on your confirmed scope.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-brand-600/30 tracking-tight">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-700">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-medium text-slate-400">
                  Step {idx + 1} of 4
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
