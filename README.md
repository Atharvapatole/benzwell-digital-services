# BenzWell – Website Development Plans & Lead Management Platform

A complete, production-ready website development platform for **BenzWell**, built with Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Supabase (PostgreSQL, Auth, RLS), React Hook Form with Zod, and QR code integration.

- **Production URL:** [https://digital.benzwell.in](https://digital.benzwell.in)
- **Admin Portal:** [https://digital.benzwell.in/admin](https://digital.benzwell.in/admin)

---

## 🚀 Key Features

### 1. High-Converting Public Platform
- **Hero Section**: High-impact value proposition with realistic dual-device (desktop + mobile) mockups.
- **Why Choose BenzWell**: Transparent 6-pillar value breakdown (Professional development, mobile responsiveness, reliable hosting, business solutions, transparent pricing, 1-year support).
- **Interactive Pricing Cards**:
  - **Plan 1: Basic Website (₹7,999)**: Includes 5-page setup, 1-yr hosting, 3 minor edits, and exclusive **"See Demo Website"** button.
  - **Plan 2: Medium Website (₹14,999)**: Visually highlighted as the **Recommended Package** with tailored design and advanced sections.
  - **Plan 3: Higher Website – Full Stack (₹19,999)**: Custom backend database, self-service admin dashboard with zero editing charges.
- **Dedicated Plan Pages & QR Code Experience**:
  - Dynamic routes: `/plans/basic`, `/plans/medium`, `/plans/full-stack`
  - High-resolution QR codes pointing to permanent production URLs.
  - One-click QR code image download (`.png`) and link copy.
  - Side-by-side **Package Comparison Table** evaluating all 3 packages across 10 technical criteria.
- **Transparent Pricing & Service Terms**: Clear explanation of the ₹1,000 domain allowance, 1-year hosting terms, renewal conditions, and minor edit rules.
- **Customer Enquiry Form**:
  - React Hook Form with Zod validation.
  - Strict validation of Indian 10-digit and international phone numbers.
  - Real-time duplicate submission prevention.
  - Optional Resend email notifications for new leads.
  - Direct WhatsApp connection on submission.

### 2. Secure Admin Management Dashboard
- **Protected Route**: `/admin` is locked with Supabase Auth session verification; unauthenticated users are redirected to `/admin/login`.
- **Live Database Metrics**: Accurate counts of Total Enquiries, New, Contacted, Interested, and Converted leads.
- **Lead Pipeline Management**:
  - Filterable by Status and Package, searchable by Name, Email, or Phone.
  - Quick-connect actions: Clickable phone numbers, click-to-email, and direct WhatsApp chat links with prefilled messages.
  - Lead details modal with editable status and private internal notes.
  - Lead deletion with confirmation modal.
- **Plan Management**:
  - Update pricing, descriptions, features, visibility, and demo URLs in real time.
- **Settings & Policy Management**:
  - Update business information, contact numbers, and transparent hosting/domain policy text.

---

## 🛠 Technology Stack

- **Framework**: Next.js 15 (App Router, Server Actions)
- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Forms & Validation**: React Hook Form, Zod, `@hookform/resolvers`
- **Database & Auth**: Supabase PostgreSQL, Supabase Auth, Row Level Security (RLS)
- **QR Code Generation**: `qrcode`
- **Email Notifications**: Resend (Optional)

---

## 📁 Project Structure

```
├── src/
│   ├── actions/               # Server Actions (leads submission, admin operations)
│   ├── app/
│   │   ├── admin/             # Authenticated Admin Dashboard
│   │   │   ├── leads/         # Lead pipeline management
│   │   │   ├── login/         # Administrator sign-in
│   │   │   ├── plans/         # Website plan & QR management
│   │   │   ├── settings/      # Business info & policy terms
│   │   │   └── page.tsx       # Overview dashboard with real metrics
│   │   ├── plans/[slug]/      # Detailed package specifications & comparison
│   │   ├── privacy/           # Privacy policy
│   │   ├── terms/             # Terms and service conditions
│   │   ├── globals.css        # Tailwind and global styles
│   │   ├── layout.tsx         # Root layout with SEO & Schema markup
│   │   ├── not-found.tsx      # 404 handler
│   │   ├── page.tsx           # Homepage
│   │   ├── robots.ts          # Robots.txt (blocks /admin from search engines)
│   │   └── sitemap.ts         # Automated sitemap generator
│   ├── components/
│   │   ├── admin/             # Admin table, nav, plan customizer, settings
│   │   ├── common/            # QR Code modal & downloader
│   │   ├── home/              # Hero, Pricing, Terms, FAQ, HowItWorks, Enquiry
│   │   ├── layout/            # Navbar and Footer
│   │   └── plans/             # Side-by-side comparison table
│   ├── lib/
│   │   ├── constants.ts       # Package defaults, status colors, options
│   │   ├── data.ts            # Supabase data retrieval with safe fallback
│   │   ├── qrcode.ts          # Server & client QR code generation
│   │   ├── supabase/          # Supabase client, server, and middleware
│   │   └── validations/       # Zod schemas for forms
│   ├── middleware.ts          # Next.js session refresh and /admin route protection
│   └── types/                 # TypeScript interfaces
├── supabase/
│   └── migrations/            # SQL migration file with schema, RLS, and seed data
└── .env.example               # Environment variables template
```

---

## ⚙️ Environment Variables

Create a `.env.local` file by copying `.env.example`:

```bash
cp .env.example .env.local
```

Fill in the following variables:

```env
# Public Site URL
NEXT_PUBLIC_SITE_URL=https://digital.benzwell.in

# Supabase Credentials (from Supabase Dashboard -> Settings -> API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Basic Website Demo URL
NEXT_PUBLIC_BASIC_DEMO_URL=https://demo-basic.benzwell.in

# Business Contact Defaults
NEXT_PUBLIC_CONTACT_WHATSAPP=+919876543210
NEXT_PUBLIC_CONTACT_PHONE=+919876543210
NEXT_PUBLIC_CONTACT_EMAIL=contact@benzwell.in

# Optional: Resend API Key for lead notification emails
RESEND_API_KEY=
RESEND_NOTIFICATION_EMAIL=admin@benzwell.in
RESEND_FROM_EMAIL=BenzWell Leads <leads@benzwell.in>
```

---

## 🗄 Database & Supabase Setup

1. Create a project on [Supabase](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/migrations/20261116000000_init_benzwell.sql` and run the script. This creates:
   - `customer_leads` table with indexed fields and RLS policies.
   - `plans` table populated with the three BenzWell packages.
   - `website_settings` table containing business and transparent policy data.
   - Triggers for automatic `updated_at` timestamps.
4. **Create the Admin Account**:
   - In Supabase, go to **Authentication -> Users -> Add User**.
   - Create an admin user with email (e.g. `admin@benzwell.in`) and a secure password.
   - Use these credentials to sign in at `https://digital.benzwell.in/admin/login`.

---

## 💻 Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.
4. Admin panel is available at [http://localhost:3000/admin](http://localhost:3000/admin).

---

## 🚢 Production Deployment (Vercel)

1. Push this repository to GitHub or GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Environment Variables listed in `.env.example`.
4. Deploy!
5. Add the custom domain `digital.benzwell.in` in Vercel Project Settings -> Domains.
