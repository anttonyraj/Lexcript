'use client';

import React, { useState } from 'react';
import { Clock, CheckCircle2, ArrowRight, DollarSign, Send, FileCheck, Check, Sparkles, AlertCircle } from 'lucide-react';

export function ConceptBillingAnimation() {
  const [isApproved, setIsApproved] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    if (isApproved) return;
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setIsApproved(true);
    }, 1200);
  };

  return (
    <div className="rounded-2xl border border-indigo-200/80 dark:border-slate-800 bg-gradient-to-b from-white to-sky-50/20 dark:from-slate-900/90 dark:to-slate-950 p-6 shadow-lg overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-5 border-b border-indigo-200/60 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-500/10 flex items-center justify-center text-sky-700 dark:text-sky-400">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Instant UTBMS / LEDES Time Billing & Clio Sync
            </h4>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              0.1h Tenth-of-an-Hour Increments with Attorney Review Gate
            </span>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-[10px] font-bold text-indigo-700 dark:text-indigo-300">
          <Sparkles className="w-3 h-3" />
          Clio Manage Ready
        </div>
      </div>

      {/* 3-Stage Pipeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {/* Stage 1 */}
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60">
          <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            01. Audio Duration
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
            42 mins 18 secs
          </div>
          <div className="text-xs text-amber-700 dark:text-amber-400 font-semibold mt-1">
            Rounded to 0.7 hrs (Tenths)
          </div>
        </div>

        {/* Stage 2 */}
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60">
          <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            02. ABA UTBMS Classification
          </div>
          <div className="text-sm font-bold text-indigo-700 dark:text-indigo-400 font-mono">
            A106 · L110
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Client Comm / Fact Investigation
          </div>
        </div>

        {/* Stage 3 */}
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60">
          <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            03. Billable Value
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            $315.00
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            Rate: $450.00 / hr
          </div>
        </div>
      </div>

      {/* The Clio Draft Entry Card */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-900 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
              MATTER #2026-084 · IN RE APEX TECHNOLOGIES
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            Assigned Attorney: Sarah Miller, Esq.
          </span>
        </div>

        {/* Narrative */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
            Auto-Generated LEDES Billing Narrative
          </label>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
            "Telephonic conference with lead witness Dr. Arjun Mehta regarding technical timeline and email exhibits in preparation for deposition; reviewed thermal runoff test documentation (0.7 hrs)."
          </div>
        </div>

        {/* Action Gate / Clio Sync Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Rule: Attorney must approve entry before Clio posting.</span>
          </div>

          <button
            onClick={handleSync}
            disabled={isApproved || syncing}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs ${
              isApproved
                ? 'bg-emerald-600 text-white cursor-default'
                : syncing
                ? 'bg-indigo-400 text-white cursor-wait'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 hover:shadow'
            }`}
          >
            {isApproved ? (
              <>
                <Check className="w-4 h-4" />
                <span>✓ Synced to Clio Manage (Entry #CL-98102)</span>
              </>
            ) : syncing ? (
              <span>Pushing to Clio API...</span>
            ) : (
              <>
                <FileCheck className="w-4 h-4" />
                <span>Approve & Sync to Clio Manage ($315.00)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
