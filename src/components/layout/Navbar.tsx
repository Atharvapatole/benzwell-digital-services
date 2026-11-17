'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-900 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-brand-200" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
                BenzWell
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">
                Digital Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              Pricing & Plans
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#terms"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              Transparent Terms
            </Link>
            <Link
              href="/#faqs"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              FAQs
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-brand-600 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-brand-500/20 active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600"
            >
              Home
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600"
            >
              Pricing & Plans
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600"
            >
              How It Works
            </Link>
            <Link
              href="/#terms"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600"
            >
              Transparent Terms
            </Link>
            <Link
              href="/#faqs"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600"
            >
              FAQs
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600"
            >
              Contact
            </Link>
            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold text-center hover:bg-brand-600 transition-colors"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
