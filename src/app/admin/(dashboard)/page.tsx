import Link from 'next/link';
import {
  Users,
  Inbox,
  PhoneCall,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { getAdminDashboardStats } from '@/lib/data';
import { LEAD_STATUS_CONFIG } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardOverview() {
  const stats = await getAdminDashboardStats();

  const metrics = [
    {
      title: 'Total Enquiries',
      count: stats.totalEnquiries,
      icon: Users,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      title: 'New Enquiries',
      count: stats.newEnquiries,
      icon: Inbox,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      title: 'Contacted Leads',
      count: stats.contactedLeads,
      icon: PhoneCall,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      title: 'Interested Leads',
      count: stats.interestedLeads,
      icon: HeartHandshake,
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    },
    {
      title: 'Converted Customers',
      count: stats.convertedCustomers,
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time customer enquiries and qualified sales pipeline metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-colors"
          >
            <Users className="w-4 h-4" />
            <span>Manage All Leads</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{m.title}</span>
                <div className={`p-2 rounded-xl border ${m.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900 tracking-tight">
                  {m.count}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Live database record</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Enquiries Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Customer Enquiries</h2>
            <p className="text-xs text-slate-500">
              Latest submissions received directly from the BenzWell website form.
            </p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1"
          >
            <span>View Full Leads Table</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {stats.recentLeads.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <Inbox className="w-10 h-10 mx-auto text-slate-300" />
            <div className="text-sm font-semibold text-slate-600">No customer enquiries yet</div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              When visitors submit the enquiry form on the homepage or plan pages, their details
              will appear here in real time.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Customer</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Plan & Budget</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats.recentLeads.map((lead) => {
                  const statusConf =
                    LEAD_STATUS_CONFIG[lead.status] || LEAD_STATUS_CONFIG['new'];
                  const cleanWhatsapp = lead.whatsapp_number.replace(/[^0-9]/g, '');

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 font-bold text-slate-900">{lead.customer_name}</td>
                      <td className="p-4 text-slate-600">
                        <div>
                          <a
                            href={`mailto:${lead.email}`}
                            className="hover:text-brand-600 underline"
                          >
                            {lead.email}
                          </a>
                        </div>
                        <div className="text-slate-400 text-[11px] mt-0.5">
                          <a
                            href={`https://wa.me/${cleanWhatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 hover:underline"
                          >
                            WA: {lead.whatsapp_number}
                          </a>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-800">{lead.selected_plan}</div>
                        <div className="text-slate-400 text-[11px]">{lead.budget}</div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusConf.color}`}
                        >
                          {statusConf.label}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 text-[11px]">
                        {new Date(lead.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/admin/leads?id=${lead.id}`}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-[11px] transition-colors"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
