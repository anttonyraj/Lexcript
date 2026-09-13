# Vendor Configuration & Zero-Retention Proof

To preserve attorney-client privilege, all AI and transcription vendors are configured for **zero data retention** and **no model training**.

---

## 1. Deepgram
- **Role**: Primary Speech-to-Text Provider (Nova-3 model).
- **Configuration**:
  - Request parameter: `no_retention=true` passed on every audio file and streaming request.
  - Account Project Setting: Data retention disabled at project scope.
  - Logging: Audio logs and transcripts are disabled.
- **Verification**: Verified in `@lexcript/stt` unit tests (`packages/stt/test/retention.test.ts`).

---

## 2. Soniox
- **Role**: Cutover Speech-to-Text Provider.
- **Configuration**:
  - Request parameter: `storage_policy: 'do_not_store'` specified on asynchronous file transcription and streaming WebSocket initialization frames.
  - Account Setting: Custom model training disabled; zero temporary storage policy.
- **Verification**: Verified in `@lexcript/stt` unit tests (`packages/stt/test/retention.test.ts`).

---

## 3. Google Cloud / Gemini AI
- **Role**: Structured summaries, participant role inference, UTBMS draft narrative generation.
- **Configuration**:
  - Paid API Tier via `@google/genai` (Google Cloud Vertex AI / Enterprise tier).
  - Explicit terms: Customer data is not logged, retained, or used to train Google models under Google Cloud Service Specific Terms.
  - Note: Free-tier Gemini keys are strictly prohibited by rule.

---

## Sub-Processor Disclosure Table

| Vendor | Service | Data Transferred | Retention Window | Training Permitted? |
| :--- | :--- | :--- | :--- | :--- |
| **Deepgram, Inc.** | STT Transcription | Ephemeral Audio Stream / URL | 0 seconds (In-flight processing only) | **No** |
| **Soniox, Inc.** | STT Transcription | Ephemeral Audio Stream / URL | 0 seconds (In-flight processing only) | **No** |
| **Google Cloud** | Generative AI | Transcript summaries, matter area | 0 seconds (In-flight inference only) | **No** |
| **Vercel, Inc.** | Hosting & Staging Blob | Encrypted Blob Staging | < 2 minutes (Deleted post-transcription) | **No** |
