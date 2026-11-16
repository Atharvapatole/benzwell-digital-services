import { Check, X, Sparkles } from 'lucide-react';
import { Plan } from '@/types';

interface ComparisonFeature {
  name: string;
  description?: string;
  basic: string | boolean;
  medium: string | boolean;
  fullStack: string | boolean;
}

const COMPARISON_ROWS: ComparisonFeature[] = [
  {
    name: 'Website Pages',
    description: 'Number of pages developed and configured',
    basic: '5 Pages (Structured)',
    medium: '5-8 Custom Pages',
    fullStack: 'Custom Scope / Unlimited via CMS',
  },
  {
    name: 'Custom Design',
    description: 'Visual identity, custom fonts & brand styling',
    basic: false,
    medium: true,
    fullStack: true,
  },
  {
    name: 'Product / Service Showcase',
    description: 'Display your offerings cleanly with images and descriptions',
    basic: true,
    medium: true,
    fullStack: true,
  },
  {
    name: 'WhatsApp Integration',
    description: 'Instant lead click-to-chat triggers',
    basic: true,
    medium: true,
    fullStack: true,
  },
  {
    name: 'Responsive Design',
    description: 'Optimized for mobile phones, tablets & desktops',
    basic: true,
    medium: true,
    fullStack: true,
  },
  {
    name: 'Hosting Included',
    description: 'High-speed cloud hosting with SSL security certificate',
    basic: '1 Year Included',
    medium: '1 Year Included',
    fullStack: '1 Year Included',
  },
  {
    name: 'Free Minor Edits',
    description: 'Changes to text, images, contact details & products',
    basic: '3 Free Edits Included',
    medium: '3 Free Edits Included',
    fullStack: 'Unlimited (Self-Service CMS)',
  },
  {
    name: 'Admin Dashboard',
    description: 'Dedicated web portal with authentication for managing content',
    basic: false,
    medium: false,
    fullStack: true,
  },
  {
    name: 'Backend Functionality',
    description: 'PostgreSQL database, secure API endpoints & custom logic',
    basic: false,
    medium: false,
    fullStack: true,
  },
  {
    name: 'Self-Service Content Management',
    description: 'Add, update or delete products without developer fees',
    basic: false,
    medium: false,
    fullStack: true,
  },
];

interface PackageComparisonTableProps {
  currentSlug?: string;
}

export default function PackageComparisonTable({ currentSlug }: PackageComparisonTableProps) {
  return (
    <div id="comparison" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Comprehensive Package Comparison
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          A side-by-side transparent overview of features included across all three BenzWell website packages.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-700">
              <th className="p-4 sm:p-5 w-2/5">Feature & Specification</th>
              <th
                className={`p-4 sm:p-5 text-center w-1/5 ${
                  currentSlug === 'basic' ? 'bg-brand-50/80 text-brand-900' : ''
                }`}
              >
                <div>Basic Plan</div>
                <div className="text-[11px] font-normal text-slate-500 mt-0.5">₹7,999</div>
              </th>
              <th
                className={`p-4 sm:p-5 text-center w-1/5 ${
                  currentSlug === 'medium' ? 'bg-brand-50/80 text-brand-900' : ''
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Standard Plan</span>
                  <Sparkles className="w-3 h-3 text-brand-600" />
                </div>
                <div className="text-[11px] font-normal text-slate-500 mt-0.5">₹14,999</div>
              </th>
              <th
                className={`p-4 sm:p-5 text-center w-1/5 ${
                  currentSlug === 'higher' || currentSlug === 'full-stack' ? 'bg-brand-50/80 text-brand-900' : ''
                }`}
              >
                <div>Premium Plan</div>
                <div className="text-[11px] font-normal text-slate-500 mt-0.5">₹19,999</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {COMPARISON_ROWS.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                <td className="p-4 sm:p-5">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">{row.name}</div>
                  {row.description && (
                    <div className="text-[11px] text-slate-500 leading-snug mt-0.5">
                      {row.description}
                    </div>
                  )}
                </td>

                {/* Basic Column */}
                <td
                  className={`p-4 sm:p-5 text-center text-xs ${
                    currentSlug === 'basic' ? 'bg-brand-50/30 font-medium' : ''
                  }`}
                >
                  {typeof row.basic === 'boolean' ? (
                    row.basic ? (
                      <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-slate-300 mx-auto" />
                    )
                  ) : (
                    <span className="text-slate-800 font-medium">{row.basic}</span>
                  )}
                </td>

                {/* Medium Column */}
                <td
                  className={`p-4 sm:p-5 text-center text-xs ${
                    currentSlug === 'medium' ? 'bg-brand-50/30 font-medium' : ''
                  }`}
                >
                  {typeof row.medium === 'boolean' ? (
                    row.medium ? (
                      <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-slate-300 mx-auto" />
                    )
                  ) : (
                    <span className="text-slate-800 font-medium">{row.medium}</span>
                  )}
                </td>

                {/* Premium Plan Column */}
                <td
                  className={`p-4 sm:p-5 text-center text-xs ${
                    currentSlug === 'higher' || currentSlug === 'full-stack' ? 'bg-brand-50/30 font-medium' : ''
                  }`}
                >
                  {typeof row.fullStack === 'boolean' ? (
                    row.fullStack ? (
                      <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-slate-300 mx-auto" />
                    )
                  ) : (
                    <span className="text-slate-800 font-semibold text-brand-700">
                      {row.fullStack}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
