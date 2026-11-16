'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  MessageSquare,
  Phone,
  Mail,
  Trash2,
  Eye,
  Loader2,
  CheckCircle2,
  X,
  AlertTriangle,
  FileEdit,
  Clock,
  Sparkles,
  Calendar,
  Users,
} from 'lucide-react';
import { Lead, LeadStatus } from '@/types';
import { LEAD_STATUS_CONFIG, PLAN_OPTIONS } from '@/lib/constants';
import { updateLeadStatus, updateLeadNotes, deleteLead } from '@/actions/leads';

interface LeadsTableClientProps {
  initialLeads: Lead[];
  initialSelectedId?: string;
}

export default function LeadsTableClient({
  initialLeads,
  initialSelectedId,
}: LeadsTableClientProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');

  // Active Lead Details Modal
  const [activeLead, setActiveLead] = useState<Lead | null>(
    initialLeads.find((l) => l.id === initialSelectedId) || null
  );

  // Edit Notes state inside Modal
  const [notesText, setNotesText] = useState(activeLead?.notes || '');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSuccess, setNotesSuccess] = useState(false);

  // Status updating state
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

  // Delete Confirmation Modal
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.whatsapp_number.includes(searchTerm) ||
        lead.calling_number.includes(searchTerm);

      const matchesStatus =
        statusFilter === 'all' ? true : lead.status === statusFilter;

      const matchesPlan =
        planFilter === 'all' ? true : lead.selected_plan.includes(planFilter);

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [leads, searchTerm, statusFilter, planFilter]);

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    setUpdatingStatusId(leadId);
    try {
      await updateLeadStatus(leadId, newStatus);
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );
      if (activeLead && activeLead.id === leadId) {
        setActiveLead((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      alert('Failed to update status. Please try again.');
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleSaveNotes = async () => {
    if (!activeLead) return;
    setIsSavingNotes(true);
    setNotesSuccess(false);

    try {
      await updateLeadNotes(activeLead.id, notesText);
      setLeads((prev) =>
        prev.map((l) => (l.id === activeLead.id ? { ...l, notes: notesText } : l))
      );
      setActiveLead((prev) => (prev ? { ...prev, notes: notesText } : null));
      setNotesSuccess(true);
      setTimeout(() => setNotesSuccess(false), 2000);
    } catch {
      alert('Failed to save internal notes.');
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!leadToDelete) return;
    setIsDeleting(true);

    try {
      await deleteLead(leadToDelete.id);
      setLeads((prev) => prev.filter((l) => l.id !== leadToDelete.id));
      if (activeLead && activeLead.id === leadToDelete.id) {
        setActiveLead(null);
      }
      setLeadToDelete(null);
    } catch {
      alert('Failed to delete lead.');
    } finally {
      setIsDeleting(false);
    }
  };

  const openLeadDetails = (lead: Lead) => {
    setActiveLead(lead);
    setNotesText(lead.notes || '');
    setNotesSuccess(false);
  };

  const getCleanPhone = (phone: string) => phone.replace(/[^0-9]/g, '');

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by customer name, email, or phone number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:border-brand-600"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="interested">Interested</option>
              <option value="demo_requested">Demo Requested</option>
              <option value="converted">Converted</option>
              <option value="not_interested">Not Interested</option>
            </select>
          </div>

          {/* Plan Filter */}
          <div className="sm:col-span-3">
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:border-brand-600"
            >
              <option value="all">All Plans</option>
              <option value="Basic">Basic Plan</option>
              <option value="Medium">Medium Website Plan</option>
              <option value="Higher">Higher Website Plan</option>
              <option value="Not Sure">Need Guidance</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <div>
            Showing <strong className="text-slate-900">{filteredLeads.length}</strong> of{' '}
            <strong>{leads.length}</strong> total customer enquiries
          </div>
        </div>
      </div>

      {/* Main Leads Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="p-16 text-center text-slate-400 space-y-3">
            <Users className="w-10 h-10 mx-auto text-slate-300" />
            <div className="text-sm font-semibold text-slate-600">No enquiries match your filter</div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search query, or clear status and package filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Plan & Budget</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Submission Date</th>
                  <th className="p-4 text-center">Quick Connect</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => {
                  const statusConf =
                    LEAD_STATUS_CONFIG[lead.status] || LEAD_STATUS_CONFIG['new'];
                  const cleanWA = getCleanPhone(lead.whatsapp_number);
                  const cleanCall = getCleanPhone(lead.calling_number);

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Name */}
                      <td className="p-4">
                        <div className="font-bold text-slate-900 text-sm">
                          {lead.customer_name}
                        </div>
                        {lead.message && (
                          <div className="text-[11px] text-slate-500 truncate max-w-xs mt-0.5">
                            &quot;{lead.message}&quot;
                          </div>
                        )}
                      </td>

                      {/* Contact Info (Clickable) */}
                      <td className="p-4 space-y-1">
                        <div>
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-slate-700 hover:text-brand-600 underline font-medium"
                          >
                            {lead.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-3 text-[11px]">
                          <a
                            href={`https://wa.me/${cleanWA}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WA: {lead.whatsapp_number}</span>
                          </a>
                          <a
                            href={`tel:${cleanCall}`}
                            className="text-slate-600 hover:text-slate-900 flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{lead.calling_number}</span>
                          </a>
                        </div>
                      </td>

                      {/* Plan & Budget */}
                      <td className="p-4">
                        <div className="font-bold text-slate-800">{lead.selected_plan}</div>
                        <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                          Budget: {lead.budget}
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="p-4">
                        <select
                          disabled={updatingStatusId === lead.id}
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(lead.id, e.target.value as LeadStatus)
                          }
                          className={`text-[11px] font-bold py-1 px-2.5 rounded-full border focus:outline-none cursor-pointer ${statusConf.color}`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="interested">Interested</option>
                          <option value="demo_requested">Demo Requested</option>
                          <option value="converted">Converted</option>
                          <option value="not_interested">Not Interested</option>
                        </select>
                      </td>

                      {/* Submission Date */}
                      <td className="p-4 text-slate-500 text-[11px]">
                        <div>
                          {new Date(lead.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {new Date(lead.created_at).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </td>

                      {/* Quick Connect Buttons */}
                      <td className="p-4 text-center">
                        <div className="inline-flex items-center gap-1.5">
                          <a
                            href={`https://wa.me/${cleanWA}?text=${encodeURIComponent(
                              `Hello ${lead.customer_name}, thank you for contacting BenzWell regarding the ${lead.selected_plan}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`tel:${cleanCall}`}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-200"
                            title="Call Customer"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`mailto:${lead.email}?subject=${encodeURIComponent(
                              `BenzWell Website Enquiry - ${lead.selected_plan}`
                            )}`}
                            className="p-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors border border-purple-200"
                            title="Send Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openLeadDetails(lead)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-semibold transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Details</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setLeadToDelete(lead)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* LEAD DETAILS DRAWER / MODAL */}
      {activeLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Lead ID: {activeLead.id}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                  {activeLead.customer_name}
                </h3>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    Received on{' '}
                    {new Date(activeLead.created_at).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveLead(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-slate-700">Current Lead Status:</div>
                <div className="text-[11px] text-slate-500">Update status as you engage with the customer.</div>
              </div>
              <select
                value={activeLead.status}
                onChange={(e) =>
                  handleStatusChange(activeLead.id, e.target.value as LeadStatus)
                }
                className="text-xs font-bold py-1.5 px-3 rounded-xl border border-slate-300 bg-white"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="interested">Interested</option>
                <option value="demo_requested">Demo Requested</option>
                <option value="converted">Converted</option>
                <option value="not_interested">Not Interested</option>
              </select>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-semibold text-slate-500">Email Address</span>
                <div className="font-bold text-slate-900 text-sm">
                  <a href={`mailto:${activeLead.email}`} className="hover:text-brand-600 underline">
                    {activeLead.email}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-semibold text-slate-500">WhatsApp Phone</span>
                <div className="font-bold text-slate-900 text-sm">
                  <a
                    href={`https://wa.me/${getCleanPhone(activeLead.whatsapp_number)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:underline"
                  >
                    {activeLead.whatsapp_number}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-semibold text-slate-500">Primary Calling Phone</span>
                <div className="font-bold text-slate-900 text-sm">
                  <a href={`tel:${getCleanPhone(activeLead.calling_number)}`} className="hover:text-brand-600">
                    {activeLead.calling_number}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-semibold text-slate-500">Selected Plan</span>
                <div className="font-bold text-slate-900 text-sm">{activeLead.selected_plan}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-semibold text-slate-500">Budget Range</span>
                <div className="font-bold text-slate-900 text-sm">{activeLead.budget}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-semibold text-slate-500">Customer Consent</span>
                <div className="font-bold text-emerald-700 text-sm flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Consent Granted</span>
                </div>
              </div>
            </div>

            {/* Complete Customer Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Customer Message / Requirements
              </label>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed min-h-[60px]">
                {activeLead.message || (
                  <span className="text-slate-400 italic">No additional message provided.</span>
                )}
              </div>
            </div>

            {/* Internal Notes Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <FileEdit className="w-3.5 h-3.5 text-brand-600" />
                  <span>Internal Admin Notes</span>
                </label>
                {notesSuccess && (
                  <span className="text-[11px] font-semibold text-emerald-600">
                    Notes saved successfully!
                  </span>
                )}
              </div>
              <textarea
                rows={3}
                placeholder="Write private notes about client call, scope discussed, custom features requested..."
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-brand-600"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={isSavingNotes}
                  onClick={handleSaveNotes}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors disabled:opacity-60"
                >
                  {isSavingNotes ? 'Saving Notes...' : 'Save Notes'}
                </button>
              </div>
            </div>

            {/* Modal Bottom Connect Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${getCleanPhone(activeLead.whatsapp_number)}?text=${encodeURIComponent(
                    `Hello ${activeLead.customer_name}, I am contacting you from BenzWell regarding your enquiry for the ${activeLead.selected_plan}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href={`tel:${getCleanPhone(activeLead.calling_number)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Customer</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  setLeadToDelete(activeLead);
                  setActiveLead(null);
                }}
                className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-800 font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {leadToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h4 className="text-lg font-bold text-slate-900">Confirm Deletion</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to permanently delete the lead from{' '}
                <strong className="text-slate-800">{leadToDelete.customer_name}</strong> (
                {leadToDelete.email})? This action cannot be undone.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setLeadToDelete(null)}
                className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteConfirm}
                className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors disabled:opacity-60 flex items-center justify-center gap-1.5"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Yes, Delete Lead</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
