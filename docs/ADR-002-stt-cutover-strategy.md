# ADR-002: Dual STT Provider Strategy & Metered Cutover

## Status
Accepted

## Context
Lexcript launches with a $200 Deepgram promotional credit. Once exhausted, transcription must continue seamlessly without downtime or manual engineering intervention. Soniox provides enterprise-grade legal speech recognition and diarization with competitive pricing ($0.0040/min).

Additionally, canonical downstream consumers (25-line legal PDF generator, billing capture, Gemini summarizers) must receive identical data structures regardless of which STT engine transcribed the audio.

## Decision
1. **Single `SttProvider` Abstraction**:
   All speech-to-text interactions occur strictly through `@lexcript/stt`. No application code may import provider SDKs directly.

2. **Automated Spend Tracking & Cutover Controller**:
   - Budget Configuration:
     - Deepgram Credit: $200.00
     - Cutover Threshold: $185.00
     - Hard Stop: $198.00
   - `resolveProvider` checks cumulative spend at submission time.
   - When spend >= $185.00, new transcriptions flip automatically to Soniox and an `adminAlerts` record is created.
   - When spend >= $198.00, hard stop prevents Deepgram usage even if requested by an override.

3. **Output Parity Guarantee**:
   Both Deepgram and Soniox adapters normalize raw token feeds into identical canonical schemas:
   - Speaker identifiers normalized to `S1`, `S2`, ... `Sn`.
   - Timestamps formatted in seconds.
   - Word confidence scores normalized to a 0.0 – 1.0 scale.

## Consequences
- Requires persistent meter tracking in Firestore `usage` documents.
- Continuous CI parity tests ensure changes to either provider's API do not break downstream formatting.
