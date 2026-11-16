'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is website hosting really included for a full year?',
      answer:
        'Yes. Every package (Basic Plan ₹7,999, Standard Plan ₹14,999, and Premium Plan ₹19,999) includes 1 full year of cloud hosting at zero additional charge. After the first year, an annual hosting renewal is required to keep your website live and secured.',
    },
    {
      question: 'How does the ₹1,000 domain policy work?',
      answer:
        'If the domain you select (.com, .in, .org, etc.) costs ₹1,000 or less at the time of registration, it is 100% included in the package price. If it costs more (for example, a premium domain costing ₹1,499), you only pay the ₹499 difference. All domains are registered in your legal ownership.',
    },
    {
      question: 'What is considered a "minor content edit"?',
      answer:
        'A minor content edit includes adding or deleting a product or service, updating prices, replacing photos, changing phone numbers/addresses, or modifying paragraph text. It does not include redesigning whole page structures, altering the underlying layout, or coding major new custom features.',
    },
    {
      question: 'How do content edits work on the Premium Plan?',
      answer:
        'With the Premium Plan (₹19,999), you receive your own private admin dashboard. You do not need to pay for minor edit packages because you can log in anytime to update products, images, text, and business information yourself with zero editing fees.',
    },
    {
      question: 'Why does only the Basic Plan package have a demo button?',
      answer:
        'The Basic Plan uses a standardized, high-performance 5-page layout that we can showcase via a live demo. The Standard Plan and Premium Plan packages are custom-crafted and tailored specifically around each client’s unique brand identity and functional scope.',
    },
    {
      question: 'How long does website development take?',
      answer:
        'We do not promise misleading fixed delivery times before understanding your project requirements. Timelines depend on the chosen package, the readiness of your content and images, and confirmed scope. We provide a firm delivery schedule after our initial discovery call.',
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-brand-600" />
            Common Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Straightforward answers to the most common questions about our packages, hosting, and
            support.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors duration-150"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-base font-bold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 bg-slate-50/50 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
