'use client';

import React from 'react';
import { 
  PhoneCall, 
  Video, 
  Users, 
  Mic, 
  FileAudio, 
  ShieldCheck, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Lock, 
  Scale, 
  Flame,
  Check
} from 'lucide-react';

export function ArchitectureFlow() {
  const sources = [
    { name: 'Client Phone Calls', detail: 'VoIP & In-Browser Audio', icon: PhoneCall, status: 'Active' },
    { name: 'Zoom & Teams Depositions', detail: 'Court & Meeting Audio', icon: Video, status: 'Active' },
    { name: 'Witness Prep Interviews', detail: 'Confidential Case Ingestion', icon: Users, status: 'Active' },
    { name: 'Partner Case Strategy', detail: 'Voice Memos & Dictation', icon: Mic, status: 'Active' },
    { name: 'Recorded Audio/Video Files', detail: '.wav, .mp3, .m4a, .mp4', icon: FileAudio, status: 'Active' },
    { name: 'Two-Party Consent Streams', detail: 'State-Compliant Disclaimers', icon: Scale, status: 'Verified' },
  ];

  const outputs = [
    { name: '25-Line Legal Transcript', detail: 'Standard 1–25 line numbered PDF', icon: FileText, badge: 'Work Product' },
    { name: 'Draft Clio UTBMS Time Entry', detail: 'A106/L110 codes + 0.1h rounded', icon: Clock, badge: 'Billing Sync' },
    { name: 'Certificate of Audio Destruction', detail: 'Immutable SHA-256 wipe log', icon: ShieldCheck, badge: 'Privilege Safe' },
    { name: 'Deposition Executive Summary', detail: 'Privileged attorney briefing', icon: FileText, badge: 'Case Intelligence' },
    { name: 'Testimony Key Extracts', detail: 'Direct Q&A pinpoint citations', icon: CheckCircle2, badge: 'Trial Prep' },
    { name: 'Word-Frequency Master Index', detail: 'Trial prep cross-examination index', icon: Scale, badge: 'Indexed' },
  ];

  return (
    <div className="w-full">
      <style>{`
        @keyframes flow-right {
          0%   { transform: translateX(0px);  opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(56px); opacity: 0; }
        }
      `}</style>

      {/* Desktop 3-Column Decyra Architecture Grid */}
      <div className="hidden lg:grid items-start gap-0" style={{ gridTemplateColumns: '1fr auto 1.7fr auto 1fr' }}>
        
        {/* Column 1: Law Firm Audio Inputs */}
        <div className="flex flex-col">
          <div className="h-8 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-800 dark:text-amber-400 mb-2 flex items-center justify-center gap-1.5">
            <Mic className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Law Firm Audio Inputs</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {sources.map((src, i) => {
              const Icon = src.icon;
              return (
                <div
                  key={i}
                  className="h-[52px] flex items-center gap-3 border border-amber-200/70 dark:border-slate-800 rounded-lg px-3.5 bg-white/90 dark:bg-slate-900/80 shadow-xs hover:border-amber-400/80 transition-all select-none group"
                >
                  <div className="w-7 h-7 rounded-md bg-amber-100/70 dark:bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-[13px] font-semibold text-slate-900 dark:text-white leading-tight truncate">
                      {src.name}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 truncate">
                      {src.detail}
                    </span>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shrink-0">
                    {src.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Animated Connector Left -> Center */}
        <div className="flex flex-col self-stretch">
          <div className="h-8 mb-2"></div>
          <div className="relative w-14 self-stretch overflow-visible" aria-hidden="true">
            {sources.map((_, i) => (
              <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${26 + i * 62.5}px` }}>
                <div className="h-[1px] bg-gradient-to-r from-amber-300 to-indigo-300 dark:from-amber-700/60 dark:to-indigo-700/60 w-full" />
                <div
                  style={{
                    position: 'absolute',
                    top: '-2.5px',
                    left: 0,
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#f59e0b',
                    boxShadow: '0 0 8px #f59e0b',
                    animation: `flow-right 2.2s linear ${i * 0.3}s infinite`,
                    opacity: 0,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Lexcript Engine (Center Showcase Card) */}
        <div className="flex flex-col">
          <div className="h-8 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-800 dark:text-indigo-400 mb-2 flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Lexcript Ephemeral Vault Engine</span>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl">
            {/* Window Header */}
            <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-3.5 py-2.5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 bg-white dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 px-3 py-1 text-center font-mono flex items-center justify-center gap-1.5">
                <Lock className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                <span>lexcript.com/vault/ephemeral-transcribe</span>
              </div>
            </div>

            {/* Window Body */}
            <div className="p-4 space-y-3.5">
              {/* Active Matter Context */}
              <div className="p-3 rounded-lg bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                    Active Matter Intake
                  </div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5">
                    Matter #2026-084: In re Apex Technologies Litigation
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-200/60 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300 font-medium">
                  Two-Party Consent OK
                </span>
              </div>

              {/* Real-Time STT Processing Card */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                    Ephemeral Verbatim STT (No LLM Alteration)
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    Model: Deepgram Nova-3 / Soniox
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                  <div className="text-amber-700 dark:text-amber-400 font-bold mb-1">
                    [00:14:22] Q. (Attorney Miller):
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    "Can you verify whether the intellectual property assignment agreement was executed prior to the September 14 board meeting?"
                  </p>
                  <div className="text-indigo-700 dark:text-indigo-400 font-bold mt-2 mb-1">
                    [00:14:31] A. (Witness Evans):
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    "Yes. It was countersigned on the morning of September 12 by outside corporate counsel."
                  </p>
                </div>
              </div>

              {/* Zero-Retention Cryptographic Audio Wipe Indicator */}
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-semibold">
                  <Flame className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Raw Audio Purged From Staging RAM</span>
                </div>
                <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-300">
                  SHA-256: 9f8a...c34d
                </span>
              </div>

              {/* Clio Sync Ready Box */}
              <div className="p-3 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-900/40 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                    Clio Manage Draft Billing Entry
                  </div>
                  <div className="text-xs font-mono text-slate-700 dark:text-slate-300 mt-0.5">
                    Code: A106 (Client Comm) · Task: L330 · 0.4 hrs ($180.00)
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-indigo-600 text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs">
                  <Check className="w-3 h-3" />
                  <span>Approved for Clio</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Connector Center -> Right */}
        <div className="flex flex-col self-stretch">
          <div className="h-8 mb-2"></div>
          <div className="relative w-14 self-stretch overflow-visible" aria-hidden="true">
            {outputs.map((_, i) => (
              <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${26 + i * 62.5}px` }}>
                <div className="h-[1px] bg-gradient-to-r from-indigo-300 to-sky-300 dark:from-indigo-700/60 dark:to-sky-700/60 w-full" />
                <div
                  style={{
                    position: 'absolute',
                    top: '-2.5px',
                    left: 0,
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#6366f1',
                    boxShadow: '0 0 8px #6366f1',
                    animation: `flow-right 2.2s linear ${i * 0.3 + 0.15}s infinite`,
                    opacity: 0,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: What Attorneys Receive (Attorney Work Product) */}
        <div className="flex flex-col">
          <div className="h-8 text-[11px] font-bold uppercase tracking-[0.18em] text-sky-800 dark:text-sky-400 mb-2 flex items-center justify-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Attorney Work Product</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {outputs.map((out, i) => {
              const Icon = out.icon;
              return (
                <div
                  key={i}
                  className="h-[52px] flex items-center gap-3 border border-sky-200/70 dark:border-slate-800 rounded-lg px-3.5 bg-white/90 dark:bg-slate-900/80 shadow-xs hover:border-sky-400/80 transition-all select-none group"
                >
                  <div className="w-7 h-7 rounded-md bg-sky-100/70 dark:bg-sky-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-sky-700 dark:text-sky-400" />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-[13px] font-semibold text-slate-900 dark:text-white leading-tight truncate">
                      {out.name}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 truncate">
                      {out.detail}
                    </span>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 shrink-0">
                    {out.badge}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Mobile / Tablet Responsive Fallback */}
      <div className="lg:hidden flex flex-col gap-6">
        <div className="p-5 rounded-xl border border-amber-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <h4 className="text-sm font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2">
            <Mic className="w-4 h-4" /> 1. Law Firm Ingestion
          </h4>
          <div className="space-y-2">
            {sources.slice(0, 3).map((s, i) => (
              <div key={i} className="text-xs text-slate-700 dark:text-slate-300 font-medium flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-950">
                <span>{s.name}</span>
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">{s.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-xl border border-indigo-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 mb-3 flex items-center gap-2">
            <Lock className="w-4 h-4" /> 2. Ephemeral Engine
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
            Real-time verbatim transcription with Deepgram Nova-3 and immediate staging audio wipe.
          </p>
          <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/30 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 flex items-center justify-between">
            <span>Audio Status: PURGED</span>
            <span>SHA-256 Verified</span>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-sky-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <h4 className="text-sm font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400 mb-3 flex items-center gap-2">
            <Scale className="w-4 h-4" /> 3. Attorney Work Product
          </h4>
          <div className="space-y-2">
            {outputs.slice(0, 3).map((o, i) => (
              <div key={i} className="text-xs text-slate-700 dark:text-slate-300 font-medium flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-950">
                <span>{o.name}</span>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">{o.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
