import { z } from 'zod';

// Allows Indian 10-digit formats (with or without +91 / 0) and international numbers (+countrycode ...)
const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$|^\+?[1-9]\d{6,14}$/;

export const leadFormSchema = z.object({
  customer_name: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters long.' })
    .max(100, { message: 'Full name must not exceed 100 characters.' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid business or personal email address.' }),
  whatsapp_number: z
    .string()
    .min(10, { message: 'WhatsApp number must be valid.' })
    .regex(phoneRegex, {
      message: 'Please enter a valid 10-digit Indian phone number or international number with country code.',
    }),
  calling_number: z
    .string()
    .min(10, { message: 'Calling phone number must be valid.' })
    .regex(phoneRegex, {
      message: 'Please enter a valid 10-digit Indian phone number or international number with country code.',
    }),
  selected_plan: z.enum(
    [
      'Basic Plan – ₹7,999',
      'Standard Plan – ₹14,999',
      'Premium Plan – ₹19,999',
      'Medium Website Plan – ₹14,999',
      'Higher Website Plan – ₹19,999',
      'Basic Website – ₹7,999',
      'Medium Website – ₹14,999',
      'Higher Website – ₹19,999',
      'Not Sure – Need Guidance',
    ],
    {
      errorMap: () => ({ message: 'Please select a website plan from the list.' }),
    }
  ),
  budget: z.enum(
    [
      'Below ₹5,000',
      '₹5,000 – ₹8,000',
      '₹8,000 – ₹15,000',
      '₹15,000 – ₹20,000',
      'Above ₹20,000',
      'Not Decided Yet',
    ],
    {
      errorMap: () => ({ message: 'Please select an estimated budget range.' }),
    }
  ),
  message: z
    .string()
    .max(2000, { message: 'Message cannot exceed 2000 characters.' })
    .optional()
    .or(z.literal('')),
  consent: z.literal(true, {
    errorMap: () => ({
      message: 'You must agree to be contacted regarding your website enquiry.',
    }),
  }),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
