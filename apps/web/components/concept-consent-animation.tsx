'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Scale, Mic, Volume2, CheckCircle2, AlertTriangle } from 'lucide-react';

export function ConceptConsentAnimation() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-2xl border border-amber-200/80 dark:border-slate-800 bg-gradient-to-b from-white to-amber-50/30 dark:from-slate-900/90 dark:to-slate-950 p-6 shadow-lg overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-5 border-b border-amber-200/60 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center text-amber-700 dark:text-amber-400">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              State-Aware Wiretap Consent Engine
            </h4>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              ABA Model Rule 1.6 & State Wiretap Compliance
            </span>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300/60 dark:border-amber-700/60 text-[10px] font-bold text-amber-900 dark:text-amber-300">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          Live Geo-Verification
        </div>
      </div>

      {/* Interactive Step Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        <div
          className={`p-3 rounded-lg border transition-all ${
            activeStep === 0
              ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 shadow-xs'
              : 'border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 opacity-70'
          }`}
        >
          <div className="flex items-center justify-between mb-1 text-[11px] font-bold">
            <span className="text-amber-700 dark:text-amber-400">Step 1: Jurisdiction Scan</span>
            <span className="font-mono text-[9px] text-slate-400">01</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
            Identifies caller locations (11 All-Party Consent vs. 39 One-Party states).
          </p>
        </div>

        <div
          className={`p-3 rounded-lg border transition-all ${
            activeStep === 1
              ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 shadow-xs'
              : 'border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 opacity-70'
          }`}
        >
          <div className="flex items-center justify-between mb-1 text-[11px] font-bold">
            <span className="text-amber-700 dark:text-amber-400">Step 2: Consent Prompt</span>
            <span className="font-mono text-[9px] text-slate-400">02</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
            Automated legal disclaimer chime & verbal affirmation audio recording.
          </p>
        </div>

        <div
          className={`p-3 rounded-lg border transition-all ${
            activeStep === 2
              ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 shadow-xs'
              : 'border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 opacity-70'
          }`}
        >
          <div className="flex items-center justify-between mb-1 text-[11px] font-bold">
            <span className="text-amber-700 dark:text-amber-400">Step 3: Cryptographic Stamp</span>
            <span className="font-mono text-[9px] text-slate-400">03</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
            Affirmation timestamped with SHA-256 consent token before transcription.
          </p>
        </div>
      </div>

      {/* Simulated Live Interface Card */}
      <div className="rounded-xl border border-amber-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 shadow-sm font-mono text-xs">
        <div className="flex items-center justify-between mb-3 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-900 pb-2">
          <div className="flex items-center gap-1.5">
            <Mic className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
            <span className="font-bold text-slate-900 dark:text-white">CONFERENCE INTAKE: CALL-9042</span>
          </div>
          <span className="text-[10px]">California (Two-Party) ⟷ New York (One-Party)</span>
        </div>

        <div className="space-y-2.5">
          <div className="p-2.5 rounded-md bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-slate-800 dark:text-slate-200 flex items-start gap-2.5">
            <Volume2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-800 dark:text-amber-400 text-[11px] block">
                Automated Lexcript Compliance Chime:
              </span>
              <p className="text-slate-700 dark:text-slate-300 italic text-[11px] mt-0.5">
                "Notice: This conversation is recorded by Lexcript for privileged attorney work product under Cal. Pen. Code § 632. Do all parties consent?"
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300">Party 1 (Attorney):</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                <CheckCircle2 className="w-3 h-3" /> "I consent"
              </span>
            </div>
            <div className="p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300">Party 2 (Witness):</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                <CheckCircle2 className="w-3 h-3" /> "Yes, consented"
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-900 text-[10px] text-slate-500">
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Consent Cryptographically Anchored
            </span>
            <span className="font-mono">Token: CNST-2026-CA8891</span>
          </div>
        </div>
      </div>
    </div>
  );
}
