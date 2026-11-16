'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function adminSignOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}
