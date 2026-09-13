# Ethics Review & ABA Formal Opinion 512 Analysis

*Prepared for Law Firm IT & Ethics Committees*

## 1. Duty of Confidentiality (ABA Model Rule 1.6)
Rule 1.6(c) requires lawyers to "make reasonable efforts to prevent the inadvertent or unauthorized disclosure of, or unauthorized access to, information relating to the representation of a client."

**Lexcript Compliance Design:**
- **Zero Retention**: Audio files are treated as ephemeral streams. In standard mode, staging audio is deleted immediately when transcription finishes.
- **Envelope Encryption**: Transcripts and matter data are encrypted at rest per firm using unique AES-256-GCM data encryption keys (DEK). No Lexcript engineer has plaintext access.
- **Sub-Processor Zero Retention**: Contracts and technical flags forbid third-party AI/STT vendors from using audio or transcripts for model training.

## 2. ABA Formal Opinion 512 (Generative AI in Legal Practice)
Issued July 2024, Formal Opinion 512 addresses the ethical obligations of lawyers using generative AI tools. Key mandates:
1. **Competence (Rule 1.1)**: Lawyers must understand how the tool operates and avoid uncritical reliance on AI outputs.
   - *Lexcript response*: Transcripts are verbatim from STT engines—never generated or hallucinated by an LLM. Draft time entries require mandatory human review and approval.
2. **Confidentiality (Rule 1.6)**: Lawyers must ensure third-party generative AI platforms do not share, retain, or train on client confidential data.
   - *Lexcript response*: Only paid enterprise tiers of Google Gemini are utilized under contracts guaranteeing zero input training.
3. **Supervision (Rules 5.1 & 5.3)**: Managerial lawyers must ensure subordinate lawyers and third-party vendors comply with professional obligations.
   - *Lexcript response*: Granular role permissions (`owner`, `attorney`, `paralegal`, `billing`), role-gated approvals, and an immutable, exportable audit trail.

## 3. Positioning & Certification Disclaimer
Under state bar rules and court reporting statutory codes, non-certified automated transcripts cannot be held out as official court records.
- Every transcript export is permanently watermarked:
  `"DRAFT — not a certified transcript. Prepared by Lexcript for attorney work product."`
- Product copy strictly forbids claiming court certification.
