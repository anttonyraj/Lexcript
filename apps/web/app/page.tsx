import React from 'react';
import { DRAFT_DISCLAIMER } from '@lexcript/shared';
import { ShieldCheck, Scale, FileText, Clock, KeyRound, ArrowRight, Lock, Mic, FileCheck } from 'lucide-react';
import { ThemeToggle } from '../components/theme-toggle';
import { LexcriptLogo } from '../components/lexcript-logo';
import { DepositionWaveform } from '../components/deposition-waveform';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Ambient Dual Color Tone Lighting (Left: Legal Pad Amber / Right: Cryptographic Vault Sapphire) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-28 w-[550px] h-[550px] rounded-full bg-amber-500/20 dark:bg-amber-500/15 blur-[140px] -z-10 transition-all duration-700"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 -right-28 w-[600px] h-[600px] rounded-full bg-indigo-500/20 dark:bg-indigo-600/20 blur-[150px] -z-10 transition-all duration-700"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[45%] -left-32 w-[500px] h-[500px] rounded-full bg-amber-400/10 dark:bg-amber-600/10 blur-[130px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[55%] -right-32 w-[500px] h-[500px] rounded-full bg-sky-500/15 dark:bg-sky-600/15 blur-[140px] -z-10"
      />

      {/* Top Banner Notice */}
      <aside
        aria-label="Legal Disclaimer"
        className="bg-amber-100/80 dark:bg-amber-950/40 border-b border-amber-300/80 dark:border-amber-800/40 px-4 py-2 text-center text-xs font-medium text-amber-900 dark:text-amber-300 transition-colors"
      >
        <span className="inline-flex items-center gap-1.5">
          <Scale className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
          {DRAFT_DISCLAIMER}
        </span>
      </aside>

      {/* Navigation */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Custom Lexcript Logo: The 'L' Scale of Justice */}
            <div className="w-9 h-9 rounded-lg bg-slate-900/10 dark:bg-slate-900/60 border border-slate-300/60 dark:border-slate-800 flex items-center justify-center shadow-xs">
              <LexcriptLogo size={28} />
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              Lexcript
            </span>
          </div>

          <nav className="flex items-center gap-5 text-sm font-medium">
            <a
              href="#privilege"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition"
            >
              Privilege Security
            </a>
            <a
              href="#pricing"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition"
            >
              Pricing
            </a>

            {/* Theme Toggle (Light / Dark) */}
            <ThemeToggle />

            <a
              href="/onboarding"
              className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold px-4 py-2 rounded-md shadow-sm hover:shadow transition flex items-center gap-1.5"
            >
              Firm Sign In <ArrowRight className="w-4 h-4" />
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-20 text-center relative">
          {/* Dual-Tone Architecture Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-slate-100 to-indigo-500/10 dark:from-amber-500/15 dark:via-slate-900/80 dark:to-indigo-500/15 border border-amber-300/40 dark:border-slate-800 text-xs font-semibold mb-8 shadow-xs">
            <span className="flex items-center gap-1 text-amber-800 dark:text-amber-400">
              <Mic className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Legal Pad Capture
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="flex items-center gap-1 text-indigo-800 dark:text-indigo-400">
              <Lock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              Zero-Retention Vault
            </span>
          </div>

          {/* Futuristic Dual-Tone Headline */}
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6 leading-[1.15]">
            <span className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 dark:from-amber-300 dark:via-amber-400 dark:to-amber-200 bg-clip-text text-transparent">
              Every conversation on the record.
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-sky-600 dark:from-indigo-300 dark:via-indigo-400 dark:to-sky-300 bg-clip-text text-transparent">
              Every minute on the invoice.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Audio is transcribed and immediately deleted. Nothing is ever used to train AI.
            Your firm holds the cryptographic key.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="/onboarding"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold px-8 py-3.5 rounded-lg shadow-lg shadow-amber-500/25 transition text-base"
            >
              Start Free Trial (Clio Ready)
            </a>
            <a
              href="#privilege"
              className="w-full sm:w-auto bg-white/80 dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-300/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold px-8 py-3.5 rounded-lg transition text-base backdrop-blur-sm shadow-xs"
            >
              How We Protect Privilege
            </a>
          </div>

          {/* Real-Time Deposition Acoustic Waveform Visualizer */}
          <div className="my-8">
            <DepositionWaveform />
          </div>

          {/* Futuristic Dual-Tone Transformation Showcase Card */}
          <div className="relative mx-auto max-w-4xl p-1 rounded-2xl bg-gradient-to-r from-amber-500/40 via-slate-300/40 to-indigo-500/40 dark:from-amber-500/30 dark:via-slate-800/60 dark:to-indigo-500/30 shadow-2xl mb-20">
            <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl rounded-[15px] p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left relative overflow-hidden">
              {/* Left Side: Audio Capture (The Legal Yellow Pad) */}
              <div className="space-y-4 pr-0 md:pr-4 border-b md:border-b-0 md:border-r border-slate-200/80 dark:border-slate-800/80 pb-6 md:pb-0">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-500/10 border border-amber-300/60 dark:border-amber-500/30 text-amber-900 dark:text-amber-400 text-xs font-mono font-semibold">
                    <Mic className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
                    LIVE INGESTION
                  </div>
                  <span className="text-xs font-mono text-slate-400">16 kHz Opus · Zero Retention</span>
                </div>
                <div className="p-4 rounded-lg bg-amber-50/70 dark:bg-amber-950/10 border border-amber-200/80 dark:border-amber-900/30 font-serif text-sm text-slate-800 dark:text-slate-300 leading-relaxed">
                  <p className="text-xs font-mono text-amber-700 dark:text-amber-400 mb-1 font-bold">
                    Q. (Examining Attorney):
                  </p>
                  "Did you review the quarterly inventory discrepancies prior to signing the vendor declaration?"
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>SHA-256 Verified · Consent Recorded</span>
                </div>
              </div>

              {/* Right Side: Ledger & Work Product (The Vault / LEDES) */}
              <div className="space-y-4 pl-0 md:pl-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-300/60 dark:border-indigo-500/30 text-indigo-900 dark:text-indigo-400 text-xs font-mono font-semibold">
                    <FileCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    CLIO DRAFT ENTRY
                  </div>
                  <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                    +0.4 hrs ($180.00)
                  </span>
                </div>
                <div className="p-4 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/10 border border-indigo-200/80 dark:border-indigo-900/30 text-sm text-slate-800 dark:text-slate-300 leading-relaxed font-sans">
                  <div className="flex items-center gap-2 text-xs font-mono text-indigo-700 dark:text-indigo-400 mb-1 font-bold">
                    <span>CODE: A106 (Client Comm)</span>
                    <span>·</span>
                    <span>TASK: L330</span>
                  </div>
                  "Deposition examination and witness prep regarding vendor inventory contract."
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">Ready for Attorney Approval</span>
                  <span className="font-mono">Sync: Clio Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-xs dark:shadow-none transition backdrop-blur-sm hover:border-amber-400/40">
              <div className="w-10 h-10 rounded-lg bg-amber-100/70 dark:bg-amber-500/10 border border-amber-300/50 dark:border-amber-500/20 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                25-Line Legal Format
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Deterministic pagination, caption pages, Q./A. formatting, and automated word indices.
                Ready for attorney work product.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-xs dark:shadow-none transition backdrop-blur-sm hover:border-indigo-400/40">
              <div className="w-10 h-10 rounded-lg bg-indigo-100/70 dark:bg-indigo-500/10 border border-indigo-300/50 dark:border-indigo-500/20 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-indigo-700 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Instant UTBMS Billing
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Conversations automatically convert into 0.1h rounded draft entries with LEDES A106/L110 codes,
                syncing directly to Clio Manage.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-xs dark:shadow-none transition backdrop-blur-sm hover:border-sky-400/40">
              <div className="w-10 h-10 rounded-lg bg-sky-100/70 dark:bg-sky-500/10 border border-sky-300/50 dark:border-sky-500/20 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5 text-sky-700 dark:text-sky-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Privileged by Default
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Staging audio is deleted immediately upon transcription. Per-firm AES-256-GCM envelope
                encryption and an immutable audit trail.
              </p>
            </div>
          </div>
        </section>

        {/* Privilege Section */}
        <section
          id="privilege"
          className="py-20 border-t border-slate-200 dark:border-slate-900 bg-slate-50/60 dark:bg-slate-950/50 transition-colors relative"
        >
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white text-center mb-4">
              Cryptographic Duty of Confidentiality
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-12 max-w-xl mx-auto">
              Under ABA Model Rule 1.6 and Formal Opinion 512, attorneys must make reasonable efforts
              to prevent inadvertent disclosure. Lexcript enforces this by architectural design.
            </p>

            <div className="space-y-4">
              <div className="p-5 rounded-lg bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-start gap-4 shadow-xs dark:shadow-none">
                <KeyRound className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    Envelope Encryption Per Firm
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Transcripts, matter metadata, and client names are encrypted with unique AES-256-GCM
                    keys. Even database administrators cannot inspect conversation details.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-lg bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-start gap-4 shadow-xs dark:shadow-none">
                <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    Zero Vendor Training & Ephemeral Audio
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Deepgram, Soniox, and Google Gemini run under strictly configured zero-retention agreements.
                    Audio bytes are wiped from staging buckets immediately upon transcript receipt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 border-t border-slate-200 dark:border-slate-900 transition-colors">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4">
              Transparent Law Firm Pricing
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-12">
              No hidden fees. Every minute on the record.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative shadow-sm dark:shadow-none">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Solo Practitioner
                </h3>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  $79{' '}
                  <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                    / user / mo
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  Perfect for independent litigators and solo attorneys.
                </p>
                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-8">
                  <li>✓ Unlimited client phone call ingestion</li>
                  <li>✓ Clio Manage two-way sync</li>
                  <li>✓ UTBMS draft time entries</li>
                  <li>✓ Deposition drafts: $0.75 / minute</li>
                </ul>
                <a
                  href="/onboarding"
                  className="block text-center w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-semibold rounded-lg text-slate-900 dark:text-white transition"
                >
                  Start 14-Day Trial
                </a>
              </div>

              <div className="p-8 rounded-xl bg-white dark:bg-slate-900 border-2 border-amber-500/90 relative shadow-md dark:shadow-xl dark:shadow-amber-500/10">
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Popular
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Small Firm
                </h3>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  $149{' '}
                  <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                    / user / mo
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  For boutique litigation and family practice teams (1-10 attorneys).
                </p>
                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-8">
                  <li>✓ Everything in Solo</li>
                  <li>✓ Paralegal & billing roles</li>
                  <li>✓ Bulk time entry approvals</li>
                  <li>✓ Matter-level retention policies</li>
                  <li>✓ Chain-of-custody audit trail export</li>
                </ul>
                <a
                  href="/onboarding"
                  className="block text-center w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 font-bold rounded-lg text-slate-950 transition shadow"
                >
                  Start Firm Trial
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-900 py-8 px-6 bg-[#f7f5ef] dark:bg-slate-950 text-center text-xs text-slate-500 dark:text-slate-500 transition-colors">
        <p className="mb-2">{DRAFT_DISCLAIMER}</p>
        <p>© 2026 Lexcript Inc. All rights reserved. Privilege Safe Conversation Intelligence.</p>
      </footer>
    </div>
  );
}
