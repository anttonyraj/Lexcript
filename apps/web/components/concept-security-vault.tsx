'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, Flame, KeyRound, CheckCircle2, FileCheck, RefreshCw } from 'lucide-react';

export function ConceptSecurityVault() {
  const [purged, setPurged] = useState(true);

  return (
    <div className="rounded-2xl border border-sky-200/80 dark:border-slate-800 bg-gradient-to-b from-white to-sky-50/20 dark:from-slate-900/90 dark:to-slate-950 p-6 shadow-lg overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-5 border-b border-sky-200/60 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-500/10 flex items-center justify-center text-sky-700 dark:text-sky-400">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Zero-Retention Ephemeral Vault & Purge Engine
            </h4>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              ABA Formal Opinion 512 & Model Rule 1.6(c) Compliance
            </span>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
          <ShieldCheck className="w-3 h-3" />
          Zero AI Training
        </div>
      </div>

      {/* Ephemeral Flow Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        {/* Box 1 */}
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60">
          <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            01. Ingestion Buffer
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">
            Volatile RAM Only
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Audio never written to persistent disk storage.
          </div>
        </div>

        {/* Box 2 */}
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60">
          <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            02. STT Header Lock
          </div>
          <div className="text-sm font-bold text-indigo-700 dark:text-indigo-400">
            Zero-Retention Flags
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Deepgram & Soniox APIs forbid data persistence.
          </div>
        </div>

        {/* Box 3 */}
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60">
          <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            03. Immediate Purge
          </div>
          <div className="text-sm font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            Audio Shredded
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Wiped at 0.00s post transcript delivery.
          </div>
        </div>

        {/* Box 4 */}
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60">
          <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            04. Per-Firm KMS
          </div>
          <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <KeyRound className="w-3.5 h-3.5" />
            Envelope Locked
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            AES-256-GCM keys held strictly by your firm.
          </div>
        </div>
      </div>

      {/* The Destruction Audit Certificate Mockup */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 shadow-sm space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-900 pb-2.5">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-bold text-slate-900 dark:text-white">
              CERTIFICATE OF AUDIO DESTRUCTION & CHAIN OF CUSTODY
            </span>
          </div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
            AUDIT PASSED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-600 dark:text-slate-400">
          <div>
            <span className="text-slate-400 block text-[10px]">MATTER ID:</span>
            <span className="text-slate-900 dark:text-white font-semibold">2026-084-APEX-LIT</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">INGESTION TIMESTAMP:</span>
            <span className="text-slate-900 dark:text-white font-semibold">2026-10-14T10:15:02.812Z</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">RAW AUDIO STATUS:</span>
            <span className="text-rose-600 dark:text-rose-400 font-bold">PERMANENTLY PURGED (0 BYTES)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">SHA-256 PURGE DIGEST:</span>
            <span className="text-slate-900 dark:text-white truncate block">
              e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
          <span>Privileged Attorney Work Product · Shielded from Subpoena Inadvertence</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Immutable Record</span>
        </div>
      </div>
    </div>
  );
}
