'use client';

import { useState } from 'react';
import { Plan } from '@/types';
import { updatePlan } from '@/actions/leads';
import QrCodeCard from '@/components/common/QrCodeCard';
import {
  Layers,
  Edit2,
  CheckCircle2,
  ExternalLink,
  Plus,
  Trash2,
  Loader2,
  Eye,
  EyeOff,
  DollarSign,
  AlertCircle,
} from 'lucide-react';

interface PlanManagerClientProps {
  initialPlans: Plan[];
}

export default function PlanManagerClient({ initialPlans }: PlanManagerClientProps) {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  // Form edit fields
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editOriginalPrice, setEditOriginalPrice] = useState<number | undefined>(undefined);
  const [editDescription, setEditDescription] = useState('');
  const [editDemoUrl, setEditDemoUrl] = useState('');
  const [editFeatures, setEditFeatures] = useState<string[]>([]);
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [editIsActive, setEditIsActive] = useState(true);

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const startEditing = (plan: Plan) => {
    setEditingPlan(plan);
    setEditPrice(plan.price);
    setEditOriginalPrice(plan.original_price);
    setEditDescription(plan.description);
    setEditDemoUrl(plan.demo_url || '');
    setEditFeatures([...plan.features]);
    setEditIsActive(plan.is_active);
    setSaveSuccess(false);
    setSaveError(null);
  };

  const handleAddFeature = () => {
    if (!newFeatureInput.trim()) return;
    setEditFeatures((prev) => [...prev, newFeatureInput.trim()]);
    setNewFeatureInput('');
  };

  const handleRemoveFeature = (idx: number) => {
    setEditFeatures((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      await updatePlan(editingPlan.slug, {
        price: Number(editPrice),
        original_price: editOriginalPrice ? Number(editOriginalPrice) : undefined,
        description: editDescription.trim(),
        demo_url: editDemoUrl.trim() || null,
        features: editFeatures,
        is_active: editIsActive,
      });

      // Update local state
      setPlans((prev) =>
        prev.map((p) =>
          p.slug === editingPlan.slug
            ? {
                ...p,
                price: Number(editPrice),
                original_price: editOriginalPrice ? Number(editOriginalPrice) : undefined,
                description: editDescription.trim(),
                demo_url: editDemoUrl.trim() || null,
                features: editFeatures,
                is_active: editIsActive,
              }
            : p
        )
      );

      setSaveSuccess(true);
      setTimeout(() => {
        setEditingPlan(null);
        setSaveSuccess(false);
      }, 1200);
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : 'Failed to update plan.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 3 Plans Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.slug}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {plan.badge || 'Package'}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    plan.is_active
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {plan.is_active ? 'Active' : 'Hidden'}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {plan.description}
                </p>
              </div>

              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-3xl font-extrabold text-slate-900">
                  {plan.currency}
                  {plan.price.toLocaleString('en-IN')}
                </span>
                {plan.original_price && (
                  <span className="text-xs text-slate-400 line-through">
                    {plan.currency}
                    {plan.original_price.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {plan.slug === 'basic' && (
                <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="font-semibold">Demo URL:</span>{' '}
                  <span className="font-mono text-[10px] text-brand-700 truncate block">
                    {plan.demo_url || 'https://demo-basic.benzwell.in'}
                  </span>
                </div>
              )}

              {/* QR Code Component with Download */}
              <div className="pt-2">
                <QrCodeCard planSlug={plan.slug} planName={plan.name} />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => startEditing(plan)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Pricing & Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PLAN EDIT MODAL */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
                  Plan Customizer
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Edit {editingPlan.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingPlan(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            {saveError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{saveError}</span>
              </div>
            )}

            {saveSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Plan updated successfully and saved to database!</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              {/* Pricing */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Price (INR ₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={editPrice}
                    onChange={(e) => setEditPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Original Price (Optional)
                  </label>
                  <input
                    type="number"
                    value={editOriginalPrice || ''}
                    onChange={(e) =>
                      setEditOriginalPrice(e.target.value ? Number(e.target.value) : undefined)
                    }
                    placeholder="e.g. 11999"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  required
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-brand-600"
                />
              </div>

              {/* Demo URL (Applicable to Basic Package) */}
              {editingPlan.slug === 'basic' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Basic Demo Website URL
                  </label>
                  <input
                    type="url"
                    value={editDemoUrl}
                    onChange={(e) => setEditDemoUrl(e.target.value)}
                    placeholder="https://demo-basic.benzwell.in"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono focus:outline-none focus:border-brand-600"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    This URL powers the &quot;See Demo Website&quot; button on the Basic Website card.
                  </p>
                </div>
              )}

              {/* Features List */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Plan Features ({editFeatures.length})
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeatureInput}
                    onChange={(e) => setNewFeatureInput(e.target.value)}
                    placeholder="Add a new feature bullet..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-600"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-brand-600 transition-colors"
                  >
                    Add
                  </button>
                </div>

                <div className="max-h-44 overflow-y-auto space-y-1.5 pt-1">
                  {editFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800"
                    >
                      <span className="truncate pr-2">{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package Visibility */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editIsActive}
                    onChange={(e) => setEditIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Visible on live website
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-colors disabled:opacity-60 flex items-center gap-1.5"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <span>Save Plan Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
