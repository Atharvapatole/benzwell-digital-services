import QRCode from 'qrcode';

export async function generateQrDataUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: 320,
      margin: 2,
      color: {
        dark: '#07264a', // BenzWell premium dark navy
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    return '';
  }
}

export function getPlanPermanentUrl(slug: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://digital.benzwell.in';
  return `${base}/plans/${slug}`;
}
