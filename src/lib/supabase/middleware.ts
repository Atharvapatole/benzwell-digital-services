import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options as any)
        );
      },
    },
  });

  const pathname = request.nextUrl.pathname;
  const isAuthRoute = pathname === '/admin/login';
  const isAdminRoute = pathname.startsWith('/admin');

  // Only run auth checks on admin routes to prevent unnecessary overhead on public pages
  if (!isAdminRoute) {
    return response;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Helper to preserve cookies across Next.js redirects
  const createRedirectResponse = (targetUrl: URL) => {
    const redirectResponse = NextResponse.redirect(targetUrl);
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectResponse;
  };

  // 1. If unauthenticated user tries to access /admin or any /admin/* subroute (except /admin/login)
  if (!isAuthRoute && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/admin/login';
    if (pathname !== '/admin') {
      redirectUrl.searchParams.set('redirect', pathname);
    }
    return createRedirectResponse(redirectUrl);
  }

  // 2. If authenticated user tries to access /admin/login, redirect to /admin or requested redirect
  if (isAuthRoute && user) {
    const redirectUrl = request.nextUrl.clone();
    const queryRedirect = request.nextUrl.searchParams.get('redirect');
    redirectUrl.pathname = queryRedirect && queryRedirect.startsWith('/admin') ? queryRedirect : '/admin';
    redirectUrl.searchParams.delete('redirect');
    return createRedirectResponse(redirectUrl);
  }

  return response;
}
