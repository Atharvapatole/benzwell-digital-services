import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4 border border-brand-100">
        <Sparkles className="w-6 h-6" />
      </div>
      <h1 className="text-4xl font-black text-slate-900 tracking-tight">404</h1>
      <h2 className="text-lg font-bold text-slate-700 mt-2">Page Not Found</h2>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-1 mb-6">
        The page or plan you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-brand-600 text-white text-xs font-bold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to BenzWell Home</span>
      </Link>
    </div>
  );
}
