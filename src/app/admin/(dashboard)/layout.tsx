import AdminNav from '@/components/admin/AdminNav';

export const dynamic = 'force-dynamic';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      <AdminNav userEmail="Administrator" />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
