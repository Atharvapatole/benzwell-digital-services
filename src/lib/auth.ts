import { User } from '@supabase/supabase-js';

export function isAuthorizedAdmin(user: User | null): boolean {
  if (!user || !user.email) {
    return false;
  }

  // 1. Check user metadata / app_metadata role
  const appRole = (user.app_metadata as Record<string, unknown> | undefined)?.role;
  const userRole = (user.user_metadata as Record<string, unknown> | undefined)?.role;
  if (appRole === 'admin' || appRole === 'administrator' || userRole === 'admin' || userRole === 'administrator') {
    return true;
  }

  // 2. Check allowlist in ADMIN_EMAILS environment variable (comma-separated)
  const adminEmailsEnv = process.env.ADMIN_EMAILS;
  if (adminEmailsEnv) {
    const allowed = adminEmailsEnv
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    if (allowed.length > 0) {
      return allowed.includes(user.email.toLowerCase());
    }
  }

  // 3. Fallback: If no ADMIN_EMAILS allowlist is configured, any authenticated user
  // created directly in the Supabase instance for BenzWell is authorized.
  return true;
}
