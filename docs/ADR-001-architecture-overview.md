# ADR-001: Architecture Overview & Privilege by Default

## Status
Accepted

## Context
Lexcript is built for US law firms handling highly confidential, privileged attorney-client conversations (calls, witness interviews, depositions, negotiations).
Under ABA Model Rule 1.6 and Formal Opinion 512, attorneys are ethically obligated to prevent inadvertent access or disclosure to privileged materials.

Standard SaaS architectures that store unencrypted customer audio and rely on multi-tenant cloud storage without automatic deletion present unacceptable malpractice and subpoena risks.

## Decision
1. **Serverless & Edge Alignment**:
   Next.js 16 on Vercel with Route Handlers and Server Actions. File transcription is asynchronous (webhook callback). Live transcription connects directly from the browser to the STT provider using short-lived credentials minted by the server, eliminating long-lived server WebSocket bottlenecks.

2. **Ephemeral Audio Pipeline**:
   Vercel Blob is used strictly as an ephemeral staging area. Audio is transferred directly from the browser to Blob, handed off to the STT provider via signed URL, and deleted in the exact same request when the transcript webhook arrives.

3. **Envelope Encryption at Rest**:
   Transcripts, matter details, client metadata, and draft time entries are encrypted per firm using AES-256-GCM data encryption keys (DEK) wrapped by a master key (KEK).

4. **Zero Vendor Model Training**:
   All speech-to-text (Deepgram, Soniox) and AI inference (Google Gemini on paid enterprise tier) providers are configured with zero-data-retention and no-training flags.

5. **Verbatim Transcript Integrity**:
   Transcript text is strictly derived from STT tokens verbatim. LLMs never write transcript text.

## Consequences
- Requires careful handling of cryptographic keys per firm.
- Prevents audio playback if firm retention policy is set to `discardAudioImmediately`.
- Guarantees non-discoverability of discarded audio files and eliminates privilege leakage risks.
