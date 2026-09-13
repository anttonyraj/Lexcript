'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does using Lexcript risk waiving attorney-client privilege or work-product protection?',
      a: 'No. Lexcript is engineered specifically to comply with ABA Model Rule 1.6(c) (Duty of Confidentiality) and ABA Formal Opinion 512 (Generative AI in Legal Practice). Raw audio is processed in ephemeral memory and shredded immediately upon transcript generation. Deepgram, Soniox, and our AI layers operate under strict zero-retention enterprise terms—no audio or text is ever stored by vendors or used for model training. All client matter data is encrypted with per-firm AES-256-GCM keys that only your firm controls.',
    },
    {
      q: 'How does Lexcript guarantee zero LLM hallucinations in the transcript body?',
      a: 'Architectural Rule 1: We enforce a strict separation between acoustic transcription and generative AI. All transcript words are generated solely by dedicated speech-to-text models (Deepgram Nova-3 & Soniox) with exact word-for-word acoustic confidence. Large Language Models (LLMs) are NEVER permitted to generate, alter, or "smooth over" transcript testimony. LLMs are only used for metadata tasks: drafting UTBMS billing narratives, extracting key dates, and creating internal case summaries.',
    },
    {
      q: 'How does the Clio Manage billing integration work?',
      a: 'Lexcript integrates with Clio Manage via secure OAuth 2.0. Calls and depositions are linked to your Clio matters. Upon completion, Lexcript calculates the exact billable duration rounded to standard 0.1-hour (tenth) increments and assigns ABA UTBMS activity (e.g. A106) and task (e.g. L110) codes with an attorney-ready narrative. In compliance with legal ethics rules, entries sit in an Attorney Review Gate and are only pushed to Clio after an attorney clicks approve.',
    },
    {
      q: 'Is Lexcript replacing certified court reporters?',
      a: 'No. Under Architectural Rule 2, Lexcript is not a certified court reporter and does not certify transcripts for trial records where court reporter statutes apply. Every transcript export is permanently stamped: "DRAFT — not a certified transcript. Prepared by Lexcript for attorney work product." Lexcript is designed for internal case prep, client intake, witness interviews, settlement strategy, and preliminary deposition review—saving thousands of dollars in expedited transcription fees.',
    },
    {
      q: 'How are two-party wiretap consent laws handled across different states?',
      a: 'Eleven US states (California, Florida, Illinois, Pennsylvania, Massachusetts, Connecticut, Maryland, Montana, New Hampshire, Washington, and Hawaii) enforce all-party consent for recording. Lexcript detects caller jurisdictions and provides automated audio prompts and verbal affirmation capture before recording begins, generating a cryptographic timestamped consent token to protect the firm from statutory wiretap liabilities.',
    },
    {
      q: 'What happens to the raw audio recording after transcription is complete?',
      a: 'Raw audio is deleted from staging memory immediately upon transcript delivery. Audio bytes are never saved to persistent storage. Lexcript generates an immutable SHA-256 certificate of audio destruction and logs it to your firm’s audit vault, providing cryptographic chain-of-custody evidence that raw audio was purged and cannot be inadvertently subpoenaed.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 transition overflow-hidden shadow-2xs"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white hover:text-amber-700 dark:hover:text-amber-400 transition"
              aria-expanded={isOpen}
            >
              <span className="text-base leading-snug">{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 transition-transform duration-200 text-slate-400 ${
                  isOpen ? 'rotate-180 text-amber-600 dark:text-amber-400' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
