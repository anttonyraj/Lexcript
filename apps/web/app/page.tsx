'use client';

import React from 'react';
import { DRAFT_DISCLAIMER } from '@lexcript/shared/constants';
import { 
  ShieldCheck, 
  Scale, 
  FileText, 
  Clock, 
  KeyRound, 
  ArrowRight, 
  Lock, 
  Mic, 
  FileCheck, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  Flame,
  Layers,
  Sparkles,
  Award
} from 'lucide-react';
import { ThemeToggle } from '../components/theme-toggle';
import { LexcriptLogo } from '../components/lexcript-logo';
import { ArchitectureFlow } from '../components/architecture-flow';
import { ConceptConsentAnimation } from '../components/concept-consent-animation';
import { ConceptTranscriptAnimation } from '../components/concept-transcript-animation';
import { ConceptBillingAnimation } from '../components/concept-billing-animation';
import { ConceptSecurityVault } from '../components/concept-security-vault';
import { FaqAccordion } from '../components/faq-accordion';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-white dark:bg-[#080d1a] bg-gradient-to-r from-amber-500/[0.05] via-transparent to-indigo-500/[0.05] dark:from-amber-500/[0.08] dark:via-transparent dark:to-indigo-500/[0.08] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Sonictra-Style Dual-Tone Ambient Background Lighting (Left: Legal Pad Amber / Right: Cryptographic Vault Sapphire) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-28 w-[700px] h-[700px] rounded-full bg-amber-500/25 dark:bg-amber-500/20 blur-[140px] -z-10 transition-all duration-700"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 -right-28 w-[750px] h-[750px] rounded-full bg-indigo-500/25 dark:bg-indigo-600/25 blur-[150px] -z-10 transition-all duration-700"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[28%] -left-36 w-[650px] h-[650px] rounded-full bg-amber-400/20 dark:bg-amber-600/15 blur-[140px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[40%] -right-36 w-[700px] h-[700px] rounded-full bg-sky-500/20 dark:bg-indigo-600/20 blur-[150px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[62%] -left-36 w-[650px] h-[650px] rounded-full bg-amber-500/20 dark:bg-amber-500/15 blur-[140px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[75%] -right-36 w-[700px] h-[700px] rounded-full bg-indigo-500/20 dark:bg-sky-600/20 blur-[150px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-28 w-[600px] h-[600px] rounded-full bg-amber-500/15 dark:bg-amber-600/10 blur-[140px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-28 w-[600px] h-[600px] rounded-full bg-indigo-500/20 dark:bg-indigo-600/15 blur-[150px] -z-10"
      />

      {/* Top Banner Notice (Mandatory Rule 2 Safe Harbor) */}
      <aside
        aria-label="Legal Disclaimer"
        className="bg-amber-100/90 dark:bg-amber-950/40 border-b border-amber-300/80 dark:border-amber-800/40 px-4 py-2 text-center text-xs font-medium text-amber-900 dark:text-amber-300 transition-colors"
      >
        <span className="inline-flex items-center gap-1.5 max-w-5xl mx-auto justify-center">
          <Scale className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
          <span>{DRAFT_DISCLAIMER}</span>
        </span>
      </aside>

      {/* Sticky Main Navigation (Decyra Style) */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#080d1a]/85 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
          {/* Logo & Tagline */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 dark:bg-slate-900 border border-amber-300/60 dark:border-slate-800 flex items-center justify-center shadow-xs group-hover:border-amber-400 transition">
              <LexcriptLogo size={26} />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl tracking-tight text-slate-900 dark:text-white leading-none">
                Lexcript
              </span>
              <span className="text-[9px] font-mono tracking-wider uppercase text-amber-700 dark:text-amber-400 font-semibold mt-0.5">
                Privilege-Safe Conversation Intelligence
              </span>
            </div>
          </a>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <a href="#product" className="text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition">
              Product
            </a>
            <a href="#how-it-works" className="text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition">
              How it works
            </a>
            <a href="#concepts" className="text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition">
              Concepts
            </a>
            <a href="#security" className="text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition">
              Privilege & Security
            </a>
            <a href="#why-lexcript" className="text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition">
              Why Lexcript
            </a>
            <a href="#pricing" className="text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition">
              Pricing
            </a>
            <a href="#faq" className="text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition">
              FAQ
            </a>
          </div>

          {/* Action CTAs & Theme Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            <a
              href="/onboarding"
              className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition hidden sm:inline-block"
            >
              Firm Sign In
            </a>
            <a
              href="/onboarding"
              className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs sm:text-sm font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg shadow-sm hover:shadow transition flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        
        {/* ========================================================================= */}
        {/* HERO SECTION (#product)                                                  */}
        {/* ========================================================================= */}
        <section id="product" className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-16 text-center relative">
          
          {/* Dual-Tone Architecture Tag (Sonictra Inspired) */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-slate-100 to-indigo-500/10 dark:from-amber-500/15 dark:via-slate-900/80 dark:to-indigo-500/15 border border-amber-300/40 dark:border-slate-800 text-xs font-semibold shadow-xs">
              <span className="flex items-center gap-1.5 text-amber-800 dark:text-amber-400">
                <Mic className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Legal Pad Capture
              </span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="flex items-center gap-1.5 text-indigo-800 dark:text-indigo-400">
                <Lock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                Zero-Retention Vault
              </span>
            </div>
            
            <a
              href="#security"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/90 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-300 text-xs font-medium hover:border-indigo-400 transition"
            >
              <span className="bg-indigo-600 text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                ABA FORMAL OPINION 512
              </span>
              <span>Zero-Retention Ephemeral Architecture & Per-Firm KMS</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">→</span>
            </a>
          </div>

          {/* Futuristic Dual-Tone Headline (Sonictra Style) */}
          <div className="max-w-5xl mx-auto mb-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              <span className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 dark:from-amber-300 dark:via-amber-400 dark:to-amber-200 bg-clip-text text-transparent">
                Every conversation on the record.
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-sky-600 dark:from-indigo-300 dark:via-indigo-400 dark:to-sky-300 bg-clip-text text-transparent">
                Every minute on the invoice.
              </span>
            </h1>
            <p className="mt-4 text-xl sm:text-2xl font-serif italic text-amber-800 dark:text-amber-400 font-medium">
              Without forfeiting attorney-client privilege.
            </p>
          </div>

          {/* Plain-English Clear Value Proposition */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Lexcript captures depositions, client calls, and witness interviews with state-aware wiretap compliance. 
            Receive 100% verbatim 25-line legal transcripts and draft UTBMS/LEDES billing entries synced directly to Clio Manage. 
            Raw audio is shredded immediately upon transcript generation—backed by cryptographic zero-retention proof.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href="/onboarding"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold px-8 py-3.5 rounded-lg shadow-lg shadow-amber-500/25 transition text-base flex items-center justify-center gap-2"
            >
              <span>Start Free Trial (Clio Ready)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto bg-white/80 dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold px-8 py-3.5 rounded-lg transition text-base backdrop-blur-sm shadow-xs flex items-center justify-center gap-2"
            >
              <span>See how it works</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Reassurance Subtext */}
          <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-10">
            Pure verbatim acoustic speech-to-text · Zero LLM hallucination in transcript testimony · Audio purged immediately.
          </p>

          {/* Futuristic Dual-Tone Transformation Showcase Card (Left: Legal Pad / Right: Vault & Clio) */}
          <div className="relative mx-auto max-w-4xl p-1 rounded-2xl bg-gradient-to-r from-amber-500/50 via-slate-300/40 to-indigo-500/50 dark:from-amber-500/40 dark:via-slate-800/60 dark:to-indigo-500/40 shadow-2xl mb-16">
            <div className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl rounded-[15px] p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left relative overflow-hidden">
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

          {/* Decyra-Style 3-Column Data Flow Architecture Showcase */}
          <div className="mt-8">
            <ArchitectureFlow />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HOW IT WORKS (#how-it-works)                                              */}
        {/* ========================================================================= */}
        <section id="how-it-works" className="py-20 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 transition-colors">
          <div className="max-w-6xl mx-auto px-6">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                The Lexcript Workflow
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                Three steps. Zero privilege compromise.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                How US law firms turn hours of audio into court-ready transcripts and billed revenue in under 60 seconds.
              </p>
            </div>

            {/* 3 Step Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              
              <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-500/10 border border-amber-300/60 dark:border-amber-500/30 flex items-center justify-center text-amber-800 dark:text-amber-400 font-bold font-mono mb-4 text-sm">
                  01
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Capture & Verify Consent
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Record client calls, Zoom depositions, or upload audio. In 11 all-party consent states, Lexcript automatically verifies two-party wiretap compliance.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-300/60 dark:border-indigo-500/30 flex items-center justify-center text-indigo-800 dark:text-indigo-400 font-bold font-mono mb-4 text-sm">
                  02
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Verbatim STT & Purge
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Deepgram Nova-3 & Soniox transcribe exact acoustic speech into 25-line legal format. Staging audio is shredded immediately with SHA-256 proof.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative">
                <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-500/10 border border-sky-300/60 dark:border-sky-500/30 flex items-center justify-center text-sky-800 dark:text-sky-400 font-bold font-mono mb-4 text-sm">
                  03
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  1-Click Clio Billing Sync
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Conversations automatically generate 0.1h rounded draft entries with ABA UTBMS A106/L110 codes. Review and approve directly into Clio Manage.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* DEEP CONCEPT VISUALIZERS (#concepts)                                      */}
        {/* ========================================================================= */}
        <section id="concepts" className="py-20 border-t border-slate-200 dark:border-slate-800/80 relative">
          <div className="max-w-6xl mx-auto px-6">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-800 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Layers className="w-3.5 h-3.5" />
                Under The Hood
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                Engineered for legal practice. Not generic chat.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Explore the four core architectural systems that protect attorney-client privilege while eliminating hours of manual legal work.
              </p>
            </div>

            {/* Concept 1: State-Aware Wiretap Consent */}
            <div className="mb-16">
              <div className="mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                  Concept 01 · Legal Ingestion
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                  State-Aware Wiretap Compliance & Dual Consent
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl mt-1">
                  US wiretap laws vary dramatically: 11 states require all-party consent under felony penalties. Lexcript analyzes call participants and automatically injects verbal consent disclaimers, generating cryptographic audit tokens before audio enters the vault.
                </p>
              </div>
              <ConceptConsentAnimation />
            </div>

            {/* Concept 2: Pure Verbatim 25-Line Legal Transcript */}
            <div className="mb-16">
              <div className="mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-700 dark:text-indigo-400">
                  Concept 02 · Evidentiary Integrity
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                  25-Line Legal Pleading Format & Verbatim Acoustic STT
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl mt-1">
                  Consumer LLMs rewrite testimony, delete witness hesitations, and hallucinate words. Lexcript strictly enforces Rule 1: LLMs never touch transcript testimony. Acoustic models deliver word-for-word accuracy formatted into standard 25-line pleading pages with Q./A. indentation.
                </p>
              </div>
              <ConceptTranscriptAnimation />
            </div>

            {/* Concept 3: Automated UTBMS Billing & Clio Sync */}
            <div className="mb-16">
              <div className="mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-700 dark:text-sky-400">
                  Concept 03 · Revenue Acceleration
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                  Automated UTBMS / LEDES Time Billing with Attorney Gate
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl mt-1">
                  Attorneys lose 2-4 billable hours weekly to uncaptured phone conferences. Lexcript measures call duration to the exact tenth of an hour (0.1h), classifies ABA UTBMS codes (A106/L110), and presents a draft entry for 1-click Clio Manage approval.
                </p>
              </div>
              <ConceptBillingAnimation />
            </div>

            {/* Concept 4: Ephemeral Security & Instant Audio Shredding */}
            <div>
              <div className="mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                  Concept 04 · Cryptographic Privilege Vault
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                  Zero-Retention Ephemeral RAM & Certificate of Destruction
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl mt-1">
                  Under ABA Formal Opinion 512, lawyers cannot upload confidential client audio to consumer tools that store data. Lexcript operates in volatile RAM with enterprise zero-retention headers, shredding audio immediately and generating an immutable SHA-256 certificate of destruction.
                </p>
              </div>
              <ConceptSecurityVault />
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* PRIVILEGE & SECURITY (#security)                                         */}
        {/* ========================================================================= */}
        <section id="security" className="py-20 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/50 transition-colors">
          <div className="max-w-5xl mx-auto px-6">
            
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Lock className="w-3.5 h-3.5" />
                Legal Duty of Confidentiality
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                Privilege-Safe by Design. Never used for AI training.
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Compliance with ABA Model Rule 1.6(c) and ABA Formal Opinion 512 is not an afterthought—it is our core software architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                    Envelope Encryption Per Firm
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Transcripts and matter metadata are encrypted with unique AES-256-GCM data encryption keys (DEKs). Even database administrators cannot inspect case details.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-700 dark:text-indigo-400 shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                    Zero Vendor Training & Immediate Purge
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Deepgram, Soniox, and Google AI run under zero-retention enterprise agreements. Raw audio is wiped from staging buckets immediately upon transcript receipt.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-500/10 flex items-center justify-center text-sky-700 dark:text-sky-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                    Subpoena Shield & Destruction Log
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Because staging audio is destroyed immediately, inadvertent discovery requests cannot compel production of unprivileged raw audio recordings.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                    Non-Court-Reporter Safe Harbor
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Every transcript produced carries our mandatory disclaimer preserving certified court reporter licensing boundaries and protecting your work-product privilege.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* WHY LEXCRIPT: CATEGORY COMPARISON (#why-lexcript)                         */}
        {/* ========================================================================= */}
        <section id="why-lexcript" className="py-20 border-t border-slate-200 dark:border-slate-800/80 relative">
          <div className="max-w-5xl mx-auto px-6">
            
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Award className="w-3.5 h-3.5" />
                Category Comparison
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                A different category entirely.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Why generic AI meeting tools and consumer transcription apps violate legal ethics rules.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                      <th className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Feature & Ethics Standard</th>
                      <th className="p-4 sm:p-5 font-bold text-amber-700 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20">
                        Lexcript
                      </th>
                      <th className="p-4 sm:p-5 font-semibold text-slate-500">Consumer AI (Otter / Zoom)</th>
                      <th className="p-4 sm:p-5 font-semibold text-slate-500">Court Reporter</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
                    <tr>
                      <td className="p-4 sm:p-5 font-medium text-slate-900 dark:text-white">
                        ABA Formal Opinion 512 Privilege Safe
                      </td>
                      <td className="p-4 sm:p-5 bg-amber-50/40 dark:bg-amber-950/10 font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Built for Legal Practice
                      </td>
                      <td className="p-4 sm:p-5 text-rose-600 dark:text-rose-400">
                        <XCircle className="w-4 h-4 inline mr-1" /> Forfeits Privilege
                      </td>
                      <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-4 h-4 inline mr-1 text-emerald-600" /> Yes
                      </td>
                    </tr>

                    <tr>
                      <td className="p-4 sm:p-5 font-medium text-slate-900 dark:text-white">
                        Verbatim STT (Zero LLM Hallucinations)
                      </td>
                      <td className="p-4 sm:p-5 bg-amber-50/40 dark:bg-amber-950/10 font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 inline mr-1" /> 100% Word-for-Word
                      </td>
                      <td className="p-4 sm:p-5 text-rose-600 dark:text-rose-400">
                        <XCircle className="w-4 h-4 inline mr-1" /> Alters Testimony
                      </td>
                      <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-4 h-4 inline mr-1 text-emerald-600" /> Yes
                      </td>
                    </tr>

                    <tr>
                      <td className="p-4 sm:p-5 font-medium text-slate-900 dark:text-white">
                        25-Line Legal Pleading Page Layout
                      </td>
                      <td className="p-4 sm:p-5 bg-amber-50/40 dark:bg-amber-950/10 font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 inline mr-1" /> Standard 1–25
                      </td>
                      <td className="p-4 sm:p-5 text-rose-600 dark:text-rose-400">
                        <XCircle className="w-4 h-4 inline mr-1" /> Generic Paragraphs
                      </td>
                      <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-4 h-4 inline mr-1 text-emerald-600" /> Yes
                      </td>
                    </tr>

                    <tr>
                      <td className="p-4 sm:p-5 font-medium text-slate-900 dark:text-white">
                        ABA UTBMS / LEDES Time Billing (A106/L110)
                      </td>
                      <td className="p-4 sm:p-5 bg-amber-50/40 dark:bg-amber-950/10 font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 inline mr-1" /> Automated 0.1h Drafts
                      </td>
                      <td className="p-4 sm:p-5 text-slate-500">
                        <XCircle className="w-4 h-4 inline mr-1" /> None
                      </td>
                      <td className="p-4 sm:p-5 text-slate-500">
                        <XCircle className="w-4 h-4 inline mr-1" /> None
                      </td>
                    </tr>

                    <tr>
                      <td className="p-4 sm:p-5 font-medium text-slate-900 dark:text-white">
                        Direct 2-Way Clio Manage Sync
                      </td>
                      <td className="p-4 sm:p-5 bg-amber-50/40 dark:bg-amber-950/10 font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 inline mr-1" /> 1-Click Sync
                      </td>
                      <td className="p-4 sm:p-5 text-slate-500">
                        <XCircle className="w-4 h-4 inline mr-1" /> No
                      </td>
                      <td className="p-4 sm:p-5 text-slate-500">
                        <XCircle className="w-4 h-4 inline mr-1" /> Manual
                      </td>
                    </tr>

                    <tr>
                      <td className="p-4 sm:p-5 font-medium text-slate-900 dark:text-white">
                        Immediate Raw Audio Destruction
                      </td>
                      <td className="p-4 sm:p-5 bg-amber-50/40 dark:bg-amber-950/10 font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 inline mr-1" /> 0.00s Post Transcript
                      </td>
                      <td className="p-4 sm:p-5 text-rose-600 dark:text-rose-400">
                        <XCircle className="w-4 h-4 inline mr-1" /> Stored for Training
                      </td>
                      <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-400">
                        Kept Indefinitely
                      </td>
                    </tr>

                    <tr>
                      <td className="p-4 sm:p-5 font-medium text-slate-900 dark:text-white">
                        Turnaround Time
                      </td>
                      <td className="p-4 sm:p-5 bg-amber-50/40 dark:bg-amber-950/10 font-bold text-amber-700 dark:text-amber-400">
                        Instant (60 Seconds)
                      </td>
                      <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-400">
                        10-30 Minutes
                      </td>
                      <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-400">
                        10 to 14 Business Days
                      </td>
                    </tr>

                    <tr>
                      <td className="p-4 sm:p-5 font-medium text-slate-900 dark:text-white">
                        Typical Cost per Deposition Hour
                      </td>
                      <td className="p-4 sm:p-5 bg-amber-50/40 dark:bg-amber-950/10 font-bold text-emerald-600 dark:text-emerald-400">
                        ~$45 / hour
                      </td>
                      <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-400">
                        ~$20 / mo (Unsafe)
                      </td>
                      <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-400">
                        $450 - $1,200 / hour
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* TRANSPARENT PRICING (#pricing)                                           */}
        {/* ========================================================================= */}
        <section id="pricing" className="py-20 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 transition-colors">
          <div className="max-w-5xl mx-auto px-6 text-center">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              Simple Law Firm Pricing
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Flat firm pricing. No unbilled minutes.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-14 max-w-2xl mx-auto">
              Pay for what your practice actually uses. Turn every captured conversation into billed Clio revenue.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
              
              {/* Solo Practitioner Tier */}
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Solo Practitioner
                </h3>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2 font-mono">
                  $79{' '}
                  <span className="text-sm font-normal text-slate-500 font-sans">
                    / attorney / month
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  For independent litigators, criminal defense, and solo corporate practitioners.
                </p>
                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Unlimited client phone call ingestion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Clio Manage two-way matter sync</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>UTBMS A106/L110 draft time entries</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>25-line legal PDF export</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Deposition drafts: $0.75 / audio minute</span>
                  </li>
                </ul>
                <a
                  href="/onboarding"
                  className="block text-center w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-bold rounded-lg text-slate-900 dark:text-white transition"
                >
                  Start 14-Day Free Trial
                </a>
              </div>

              {/* Boutique Firm Tier */}
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border-2 border-amber-500 relative shadow-xl shadow-amber-500/10">
                <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Recommended for Firms
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Litigation Boutique
                </h3>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2 font-mono">
                  $149{' '}
                  <span className="text-sm font-normal text-slate-500 font-sans">
                    / user / month
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  For trial teams and litigation boutiques (2-20 attorneys + paralegals).
                </p>
                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span className="font-semibold text-slate-900 dark:text-white">Everything in Solo, plus:</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Paralegal & billing coordinator roles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Bulk batch billing approvals into Clio</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Matter-level retention & purge policies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Immutable SHA-256 destruction certificate export</span>
                  </li>
                </ul>
                <a
                  href="/onboarding"
                  className="block text-center w-full py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 font-bold rounded-lg text-slate-950 transition shadow-md"
                >
                  Start Firm Trial (Clio Ready)
                </a>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* FAQ ACCORDION (#faq)                                                     */}
        {/* ========================================================================= */}
        <section id="faq" className="py-20 border-t border-slate-200 dark:border-slate-800/80 relative">
          <div className="max-w-4xl mx-auto px-6">
            
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-3">
                Questions & Answers
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
                Everything law firm managing partners and litigators need to know about privilege, accuracy, and billing.
              </p>
            </div>

            <FaqAccordion />

          </div>
        </section>

        {/* ========================================================================= */}
        {/* BOTTOM CALL TO ACTION                                                    */}
        {/* ========================================================================= */}
        <section className="py-20 border-t border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-white to-amber-50/50 dark:from-slate-950 dark:to-slate-900 text-center relative">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">
              Ready to safeguard your firm's conversations?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base mb-8">
              Connect to your Clio Manage account and start capturing billable hours in under two minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/onboarding"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold px-8 py-3.5 rounded-lg shadow-lg shadow-amber-500/25 transition text-base flex items-center justify-center gap-2"
              >
                <span>Start Free Trial Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition text-base"
              >
                Review Architectural Specs
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-900 py-12 px-6 bg-slate-50 dark:bg-slate-950 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-amber-500/10 border border-amber-300/40 flex items-center justify-center">
              <LexcriptLogo size={18} />
            </div>
            <span className="font-serif font-bold text-slate-900 dark:text-white text-sm">
              Lexcript Inc.
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              · Privilege-Safe Conversation Intelligence
            </span>
          </div>

          <div className="text-center max-w-xl text-[11px] leading-relaxed">
            <p className="font-serif italic text-amber-800 dark:text-amber-400 mb-1">
              {DRAFT_DISCLAIMER}
            </p>
            <p>© 2026 Lexcript Inc. Built for US legal practitioners. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 font-medium text-xs">
            <a href="#product" className="hover:text-slate-900 dark:hover:text-white transition">Product</a>
            <a href="#security" className="hover:text-slate-900 dark:hover:text-white transition">Privilege</a>
            <a href="#pricing" className="hover:text-slate-900 dark:hover:text-white transition">Pricing</a>
            <a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition">FAQ</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
