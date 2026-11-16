'use client';

import { useState, useEffect } from 'react';
import { QrCode, Download, ExternalLink, X, Check } from 'lucide-react';
import QRCode from 'qrcode';

interface QrCodeCardProps {
  planSlug: string;
  planName: string;
}

export default function QrCodeCard({ planSlug, planName }: QrCodeCardProps) {
  const [qrUrl, setQrUrl] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Permanent production URL as required
  const targetUrl = `https://digital.benzwell.in/plans/${planSlug}`;

  useEffect(() => {
    QRCode.toDataURL(targetUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#07264a',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((dataUri) => setQrUrl(dataUri))
      .catch((err) => console.error('Failed to generate QR code', err));
  }, [targetUrl]);

  const handleDownload = () => {
    if (!qrUrl) return;
    const a = document.createElement('a');
    a.href = qrUrl;
    a.download = `benzwell-${planSlug}-plan-qr.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* Trigger Button inside card */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors duration-150"
        title={`Scan or download QR code for ${planName}`}
      >
        <QrCode className="w-3.5 h-3.5 text-slate-500" />
        <span>Scan / Download Plan QR</span>
      </button>

      {/* QR Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative space-y-4">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
                BenzWell Plan Scanner
              </span>
              <h3 className="text-lg font-bold text-slate-900">{planName}</h3>
              <p className="text-xs text-slate-500">
                Scan with any phone camera to view full specifications & terms on mobile.
              </p>
            </div>

            {/* QR Image Display */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center">
              {qrUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrUrl}
                  alt={`QR Code for ${planName}`}
                  className="w-48 h-48 rounded-lg shadow-sm"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-xs text-slate-400">
                  Generating QR Code...
                </div>
              )}
              <div className="mt-2 text-[10px] text-slate-400 font-mono truncate max-w-full">
                {targetUrl}
              </div>
            </div>

            {/* Actions: Download QR & Copy Link */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save QR Code</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
