import React from 'react';
import { DRAFT_DISCLAIMER } from '@lexcript/shared';
import { ShieldCheck, Scale, FileText, Clock, KeyRound, ArrowRight, Lock } from 'lucide-react';
import { ThemeToggle } from '../components/theme-toggle';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
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
      <header className="border-b border-slate-200 dark:border-slate-800/80 bg-white/85 dark:bg-slate-950/75 backdrop-blur sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-serif font-black text-slate-950 text-xl shadow-md shadow-amber-500/20">
              L
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
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-2 rounded-md shadow-sm hover:shadow transition flex items-center gap-1.5"
            >
              Firm Sign In <ArrowRight className="w-4 h-4" />
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-800 text-amber-800 dark:text-amber-400 text-xs font-semibold mb-6 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Zero Data Retention · ABA Formal Opinion 512 Compliant
          </div>

          <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            Every conversation on the record. <br />
            <span className="text-amber-600 dark:text-amber-400">Every minute on the invoice.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Audio is transcribed and immediately deleted. Nothing is ever used to train AI.
            Your firm holds the cryptographic key.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="/onboarding"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-3.5 rounded-lg shadow-md shadow-amber-500/20 transition text-base"
            >
              Start Free Trial (Clio Ready)
            </a>
            <a
              href="#privilege"
              className="w-full sm:w-auto bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold px-8 py-3.5 rounded-lg transition text-base shadow-xs"
            >
              How We Protect Privilege
            </a>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-xs dark:shadow-none transition">
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

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-xs dark:shadow-none transition">
              <div className="w-10 h-10 rounded-lg bg-amber-100/70 dark:bg-amber-500/10 border border-amber-300/50 dark:border-amber-500/20 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Instant UTBMS Billing
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Conversations automatically convert into 0.1h rounded draft entries with LEDES A106/L110 codes,
                syncing directly to Clio Manage.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-xs dark:shadow-none transition">
              <div className="w-10 h-10 rounded-lg bg-amber-100/70 dark:bg-amber-500/10 border border-amber-300/50 dark:border-amber-500/20 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5 text-amber-700 dark:text-amber-400" />
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
          className="py-20 border-t border-slate-200 dark:border-slate-900 bg-slate-50/60 dark:bg-slate-950/50 transition-colors"
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
                <ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-1 shrink-0" />
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

              <div className="p-8 rounded-xl bg-white dark:bg-slate-900 border-2 border-amber-500 relative shadow-md dark:shadow-xl dark:shadow-amber-500/10">
                <div className="absolute -top-3 right-6 bg-amber-500 text-slate-950 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
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
                  className="block text-center w-full py-2.5 bg-amber-500 hover:bg-amber-400 font-bold rounded-lg text-slate-950 transition shadow"
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
