import {
  Code2,
  Smartphone,
  Server,
  Briefcase,
  FileText,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export default function WhyChooseSection() {
  const pillars = [
    {
      icon: Code2,
      title: 'Professional Website Development',
      description:
        'Clean, modern code built with Next.js, React, and industry best practices. Your website loads fast, displays your brand cleanly, and communicates credibility.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Responsive Design',
      description:
        'Over 75% of your customers visit from smartphones. Every page is meticulously designed and tested to look and perform seamlessly across mobiles, tablets, and desktops.',
    },
    {
      icon: Server,
      title: 'Reliable Hosting',
      description:
        'First-year cloud hosting is included in every package price with high uptime and free SSL security certificates configured out of the box.',
    },
    {
      icon: Briefcase,
      title: 'Business-Focused Solutions',
      description:
        'Built specifically for real-world businesses. Featuring direct WhatsApp contact triggers, quick-call buttons, product galleries, and custom inquiries.',
    },
    {
      icon: FileText,
      title: 'Transparent Pricing',
      description:
        'No hidden costs, no surprise renewals, and clear guidelines on domains, hosting, and content edits stated openly before you commit.',
    },
    {
      icon: Clock,
      title: 'One-Year Service Support',
      description:
        'You receive 12 months of service support and technical assistance to ensure your online presence remains active and trouble-free.',
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            Why BenzWell
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            A Transparent, Reliable Digital Partner
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            We focus on practical, high-value web solutions that give Indian businesses a solid
            digital presence without confusing jargon or inflated charges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group p-7 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand-600 shadow-sm group-hover:bg-brand-600 group-hover:text-white transition-colors duration-200 mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
