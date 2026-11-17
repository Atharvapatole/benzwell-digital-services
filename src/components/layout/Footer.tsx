import Link from 'next/link';
import { Sparkles, Mail, Phone, MessageSquare, ShieldCheck, Lock } from 'lucide-react';
import { BusinessInfo } from '@/types';

interface FooterProps {
  businessInfo: BusinessInfo;
}

export default function Footer({ businessInfo }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                <Sparkles className="w-4 h-4 text-brand-200" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">BenzWell</span>
            </div>
            <p className="text-slate-300 font-medium text-base">
              Professional Websites. Powerful Digital Experiences.
            </p>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              We empower Indian business owners with high-converting, mobile-responsive websites,
              transparent one-year hosting, and robust self-service admin solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-200 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-white transition-colors">
                  Website Pricing & Plans
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#terms" className="hover:text-white transition-colors">
                  Domain & Hosting Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Contact & Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-200 mb-4">
              Contact & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              {businessInfo.support_email && (
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                  <a
                    href={`mailto:${businessInfo.support_email}`}
                    className="hover:text-white transition-colors truncate"
                  >
                    {businessInfo.support_email}
                  </a>
                </li>
              )}
              {businessInfo.whatsapp_number && (
                <li className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <a
                    href={`https://wa.me/${businessInfo.whatsapp_number.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp Support
                  </a>
                </li>
              )}
              {businessInfo.calling_number && (
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                  <a
                    href={`tel:${businessInfo.calling_number}`}
                    className="hover:text-white transition-colors"
                  >
                    {businessInfo.calling_number}
                  </a>
                </li>
              )}
              <li className="pt-2">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} BenzWell. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Transparent Policies
            </span>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" /> Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
