'use server';

import { createAdminSupabaseClient, createServerSupabaseClient } from '@/lib/supabase/server';
import { leadFormSchema, LeadFormData } from '@/lib/validations/lead';
import { LeadStatus } from '@/types';
import { Resend } from 'resend';
import { revalidatePath } from 'next/cache';

export async function submitCustomerLead(data: LeadFormData) {
  try {
    const validated = leadFormSchema.safeParse(data);
    if (!validated.success) {
      const errorMessage = validated.error.errors.map((e) => e.message).join(', ');
      return { success: false, error: errorMessage };
    }

    const leadData = validated.data;
    const adminSupabase = createAdminSupabaseClient();

    // Check for duplicate submission within last 3 minutes to avoid accidental double submits
    const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000).toISOString();
    const { data: recentLead } = await adminSupabase
      .from('customer_leads')
      .select('id')
      .eq('email', leadData.email)
      .gte('created_at', threeMinutesAgo)
      .limit(1)
      .maybeSingle();

    if (recentLead) {
      return {
        success: false,
        error: 'We have already received your enquiry a moment ago. Our team will contact you shortly.',
      };
    }

    // Insert lead into Supabase
    const { data: insertedLead, error: insertError } = await adminSupabase
      .from('customer_leads')
      .insert([
        {
          customer_name: leadData.customer_name.trim(),
          email: leadData.email.trim().toLowerCase(),
          whatsapp_number: leadData.whatsapp_number.trim(),
          calling_number: leadData.calling_number.trim(),
          selected_plan: leadData.selected_plan,
          budget: leadData.budget,
          message: leadData.message?.trim() || null,
          consent: leadData.consent,
          status: 'new',
          source: 'website',
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting lead to Supabase:', insertError);
      return {
        success: false,
        error: 'Unable to submit your enquiry right now. Please try again or message us on WhatsApp directly.',
      };
    }

    // Instantly revalidate admin leads caches
    revalidatePath('/admin');
    revalidatePath('/admin/leads');

    // Optional email notification via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    let notifyEmail = process.env.RESEND_NOTIFICATION_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@benzwell.in';
    try {
      const { data: settingRow } = await adminSupabase
        .from('website_settings')
        .select('value')
        .eq('key', 'business_info')
        .maybeSingle();
      if (settingRow?.value?.support_email) {
        notifyEmail = settingRow.value.support_email;
      }
    } catch {
      // fallback to notifyEmail
    }
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'BenzWell Leads <onboarding@resend.dev>';

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: fromEmail,
          to: [notifyEmail],
          subject: `New Lead: ${leadData.customer_name} (${leadData.selected_plan})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; line-height: 1.6; color: #1e293b;">
              <h2 style="color: #0c87eb; margin-bottom: 8px;">New Customer Enquiry Received</h2>
              <p>A new customer has submitted an enquiry on <strong>BenzWell</strong>.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px; font-weight: bold; width: 35%;">Name:</td><td style="padding: 8px;">${leadData.customer_name}</td></tr>
                <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${leadData.email}">${leadData.email}</a></td></tr>
                <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px; font-weight: bold;">WhatsApp:</td><td style="padding: 8px;"><a href="https://wa.me/${leadData.whatsapp_number.replace(/[^0-9]/g, '')}">${leadData.whatsapp_number}</a></td></tr>
                <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px; font-weight: bold;">Calling:</td><td style="padding: 8px;"><a href="tel:${leadData.calling_number}">${leadData.calling_number}</a></td></tr>
                <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px; font-weight: bold;">Selected Plan:</td><td style="padding: 8px;">${leadData.selected_plan}</td></tr>
                <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px; font-weight: bold;">Budget:</td><td style="padding: 8px;">${leadData.budget}</td></tr>
                <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px; font-weight: bold;">Message:</td><td style="padding: 8px;">${leadData.message || 'None provided'}</td></tr>
              </table>

              <p style="margin-top: 24px;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://digital.benzwell.in'}/admin/leads" style="background: #0c87eb; color: #ffffff; padding: 10px 18px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  View in Admin Dashboard
                </a>
              </p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('Failed to send Resend email notification (non-fatal):', emailErr);
      }
    }

    return {
      success: true,
      leadId: insertedLead?.id,
    };
  } catch (err: unknown) {
    console.error('Unexpected lead submission error:', err);
    return {
      success: false,
      error: 'An unexpected error occurred. Please contact us via WhatsApp.',
    };
  }
}

// -----------------------------------------------------------------------------
// Admin Server Actions (Protected by Server-side Supabase Auth Check)
// -----------------------------------------------------------------------------

async function verifyAdminAuth() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized: You must be signed in as an administrator to perform this action.');
  }

  return user;
}

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
  await verifyAdminAuth();
  const adminSupabase = createAdminSupabaseClient();

  const { error } = await adminSupabase
    .from('customer_leads')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', leadId);

  if (error) {
    throw new Error(`Failed to update lead status: ${error.message}`);
  }

  revalidatePath('/admin');
  revalidatePath('/admin/leads');
  return { success: true };
}

export async function updateLeadNotes(leadId: string, notes: string) {
  await verifyAdminAuth();
  const adminSupabase = createAdminSupabaseClient();

  const { error } = await adminSupabase
    .from('customer_leads')
    .update({ notes: notes.trim(), updated_at: new Date().toISOString() })
    .eq('id', leadId);

  if (error) {
    throw new Error(`Failed to update internal notes: ${error.message}`);
  }

  revalidatePath('/admin');
  revalidatePath('/admin/leads');
  return { success: true };
}

export async function deleteLead(leadId: string) {
  await verifyAdminAuth();
  const adminSupabase = createAdminSupabaseClient();

  const { error } = await adminSupabase
    .from('customer_leads')
    .delete()
    .eq('id', leadId);

  if (error) {
    throw new Error(`Failed to delete lead: ${error.message}`);
  }

  revalidatePath('/admin');
  revalidatePath('/admin/leads');
  return { success: true };
}

export async function updatePlan(
  slug: string,
  payload: {
    price: number;
    original_price?: number;
    description: string;
    features: string[];
    demo_url?: string | null;
    is_active: boolean;
  }
) {
  await verifyAdminAuth();
  const adminSupabase = createAdminSupabaseClient();

  const { error } = await adminSupabase
    .from('plans')
    .update({
      price: payload.price,
      original_price: payload.original_price,
      description: payload.description,
      features: payload.features,
      demo_url: payload.demo_url,
      is_active: payload.is_active,
      updated_at: new Date().toISOString(),
    })
    .eq('slug', slug);

  if (error) {
    throw new Error(`Failed to update plan: ${error.message}`);
  }

  revalidatePath('/');
  revalidatePath(`/plans/${slug}`);
  revalidatePath('/admin/plans');
  return { success: true };
}

export async function updateWebsiteSetting(key: string, value: Record<string, unknown>) {
  await verifyAdminAuth();
  const adminSupabase = createAdminSupabaseClient();

  const { error } = await adminSupabase
    .from('website_settings')
    .upsert({
      key,
      value,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    throw new Error(`Failed to update setting: ${error.message}`);
  }

  revalidatePath('/');
  revalidatePath('/admin/settings');
  return { success: true };
}
