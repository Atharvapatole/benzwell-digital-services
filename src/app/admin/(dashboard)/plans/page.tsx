import { getAllPlansForAdmin } from '@/lib/data';
import PlanManagerClient from '@/components/admin/PlanManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminPlansPage() {
  const plans = await getAllPlansForAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Website Plans & QR Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Update package pricing, descriptions, features, demo website links, and download QR codes.
        </p>
      </div>

      <PlanManagerClient initialPlans={plans} />
    </div>
  );
}
