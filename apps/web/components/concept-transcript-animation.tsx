'use client';

import React, { useState } from 'react';
import { FileText, AlertOctagon, CheckCircle2, Scale, Zap, Info } from 'lucide-react';
import { DRAFT_DISCLAIMER } from '@lexcript/shared/constants';

export function ConceptTranscriptAnimation() {
  const [viewMode, setViewMode] = useState<'verbatim' | 'llm'>('verbatim');

  const lines = [
    { num: 1, text: 'SUPERIOR COURT OF CALIFORNIA, COUNTY OF SANTA CLARA' },
    { num: 2, text: 'IN RE: APEX TECHNOLOGIES LITIGATION    CASE NO. 24CV08912' },
    { num: 3, text: '----------------------------------------------------------' },
    { num: 4, text: 'DEPOSITION OF DR. ARJUN MEHTA, WITNESS' },
    { num: 5, text: 'OCTOBER 14, 2026 - 10:15 A.M.' },
    { num: 6, text: '' },
    { num: 7, text: 'EXAMINATION BY MS. CALLAHAN (COUNSEL FOR PLAINTIFF):' },
    { num: 8, text: '' },
    { num: 9, isQ: true, speaker: 'Q.', text: 'Dr. Mehta, looking at Exhibit 14, did you write' },
    { num: 10, isQ: true, speaker: '', text: 'the email dated August 3rd regarding thermal runoff?' },
    { num: 11, isA: true, speaker: 'A.', text: 'Um, well -- to the best of my recollection at' },
    { num: 12, isA: true, speaker: '', text: 'that time, yes, I drafted the initial notes.' },
    { num: 13, isQ: true, speaker: 'Q.', text: 'Did you advise the VP of Engineering to halt' },
    { num: 14, isQ: true, speaker: '', text: 'production before the commercial rollout?' },
    { num: 15, isA: true, speaker: 'A.', text: 'No, I did not specifically use the word "halt."' },
    { num: 16, isA: true, speaker: '', text: 'I recommended further stress testing in Arizona.' },
    { num: 17, isQ: true, speaker: 'Q.', text: 'And that testing was never conducted, correct?' },
    { num: 18, isA: true, speaker: 'A.', text: 'Objection by Mr. Vance: Calls for speculation.' },
    { num: 19, isA: true, speaker: '', text: 'THE WITNESS: Not by my division, no.' },
    { num: 20, text: '' },
    { num: 21, isQ: true, speaker: 'Q.', text: 'Thank you. Mark Exhibit 15, please.' },
    { num: 22, text: '(Whereupon, Exhibit 15 was marked for identification.)' },
    { num: 23, text: '' },
    { num: 24, text: '----------------------------------------------------------' },
    { num: 25, text: 'CERTIFICATE: DRAFT PRODUCED FOR ATTORNEY WORK PRODUCT' },
  ];

  return (
    <div className="rounded-2xl border border-indigo-200/80 dark:border-slate-800 bg-gradient-to-b from-white to-indigo-50/20 dark:from-slate-900/90 dark:to-slate-950 p-6 shadow-lg overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 border-b border-indigo-200/60 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-700 dark:text-indigo-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              25-Line Legal Format & Pure Verbatim Engine
            </h4>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              Rule 1 Enforced: LLMs Never Write Transcript Words
            </span>
          </div>
        </div>

        {/* Verbatim vs LLM Toggle */}
        <div className="inline-flex p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start sm:self-auto text-xs font-semibold">
          <button
            onClick={() => setViewMode('verbatim')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition ${
              viewMode === 'verbatim'
                ? 'bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Lexcript Verbatim (Acoustic STT)</span>
          </button>
          <button
            onClick={() => setViewMode('llm')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition ${
              viewMode === 'llm'
                ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 shadow-xs border border-rose-300 dark:border-rose-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Generic Consumer LLM (Risky)</span>
          </button>
        </div>
      </div>

      {/* Comparison Callout Alert */}
      {viewMode === 'verbatim' ? (
        <div className="mb-4 p-3 rounded-lg bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-300 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Architectural Guarantee: </span>
            Speech tokens are extracted directly from calibrated acoustic models (Deepgram Nova-3 & Soniox).
            Zero LLM rewriting, no hallucinations, and no smoothing over witness hesitations or qualifications.
          </div>
        </div>
      ) : (
        <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-900/50 text-xs text-rose-900 dark:text-rose-300 flex items-start gap-2">
          <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Why Consumer AI Fails in Court: </span>
            LLMs like GPT-4 or Otter "clean up" speech, delete pauses like "to the best of my recollection", and hallucinate words never spoken by the witness—destroying evidentiary impeachment value.
          </div>
        </div>
      )}

      {/* The 25-Line Legal Pleading Sheet Simulation */}
      <div className="rounded-xl border border-slate-300 dark:border-slate-800 bg-[#faf8f4] dark:bg-slate-950 p-4 md:p-6 shadow-inner font-mono text-[11px] md:text-xs overflow-x-auto relative">
        {/* Pleading Border Lines */}
        <div className="absolute top-0 bottom-0 left-10 md:left-14 w-[1px] bg-red-300/60 dark:bg-red-900/40 pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-11 md:left-15 w-[1px] bg-red-300/40 dark:bg-red-900/20 pointer-events-none" />

        {/* 25-Line Container */}
        <div className="space-y-1">
          {lines.map((line) => (
            <div key={line.num} className="flex items-start gap-4">
              {/* Line Number (1-25) */}
              <span className="w-6 md:w-8 text-right text-slate-400 dark:text-slate-600 select-none shrink-0 font-mono text-[10px] md:text-[11px]">
                {line.num}
              </span>

              {/* Line Text */}
              <div className="pl-4 md:pl-6 text-slate-800 dark:text-slate-200 min-h-[1.25rem] flex-1">
                {viewMode === 'llm' && (line.num === 11 || line.num === 12) ? (
                  <span className="bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-300 px-1 py-0.5 rounded border border-rose-300/80 line-through">
                    A. Yes, I drafted the notes. (LLM deleted witness hesitation "Um, well -- to the best of my recollection")
                  </span>
                ) : viewMode === 'llm' && (line.num === 15 || line.num === 16) ? (
                  <span className="bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-300 px-1 py-0.5 rounded border border-rose-300/80">
                    A. I didn't stop production, just wanted Arizona testing. (LLM paraphrased witness exact words)
                  </span>
                ) : (
                  <span className={line.isQ ? 'font-bold text-indigo-950 dark:text-indigo-300' : line.isA ? 'text-slate-900 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'}>
                    {line.speaker && <span className="font-bold mr-2">{line.speaker}</span>}
                    {line.text}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Legal Safe-Harbor Stamp */}
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[10px] text-center text-slate-500 dark:text-slate-400 font-sans italic flex items-center justify-center gap-1.5">
          <Scale className="w-3.5 h-3.5 text-amber-600" />
          <span>{DRAFT_DISCLAIMER}</span>
        </div>
      </div>
    </div>
  );
}
