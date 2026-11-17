import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Direct Admin Access: If someone visits /admin/login or auth recovery routes, redirect straight to /admin
  if (
    pathname === '/admin/login' ||
    pathname === '/admin/reset-password' ||
    pathname === '/admin/auth/callback'
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/admin';
    redirectUrl.search = '';
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
}
