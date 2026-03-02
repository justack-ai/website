# A2Jai Legal Navigator — Product Architecture Specification

**Product:** "Do I Need a Lawyer?" — Consumer Legal Navigation Tool
**Version:** 1.0
**Date:** March 1, 2026
**Status:** Draft — For Team Review
**Author:** Michael Bryant / Justack.ai

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Architecture](#2-system-architecture)
3. [Prioritized Features & User Flows](#3-prioritized-features--user-flows)
4. [Prompt Templates](#4-prompt-templates)
5. [Data, Privacy & Compliance](#5-data-privacy--compliance)
6. [Evaluation Metrics & Acceptance Criteria](#6-evaluation-metrics--acceptance-criteria)
7. [Deployment & Iteration Roadmap](#7-deployment--iteration-roadmap)
8. [Implementation Constraints](#8-implementation-constraints)
9. [Acceptance Tests](#9-acceptance-tests)

---

## 1. Executive Summary

**Problem:** Consumers facing legal issues have no affordable way to determine whether they actually need a lawyer, what they can handle themselves, and what specifically requires professional help. Nobody is going to retain a lawyer just to find out if they need one — but they might purchase a product that helps them figure that out.

**Solution:** An AI-powered consumer navigation tool that guides users through structured intake, classifies their situation, and produces clear guidance on what they can do themselves versus what requires legal counsel. The product connects users to flat-fee legal services when professional help is needed.

**Business Model:**

| Tier | Price | What the User Gets |
|------|-------|--------------------|
| **Free** | $0 | Basic triage + high-level "do I need a lawyer?" answer + generic checklist |
| **Navigator** | $49–$149 | Full guidance report + personalized checklists + templates + rationale + document review summary |
| **Consult Connect** | Flat-fee per service | Direct booking into flat-fee legal services (employment review, contract redline, etc.) |

**Key Constraints:**
- Never fabricates or simulates legal advice — provides navigational guidance only
- Protects user confidentiality and personal data
- Provides transparent rationale and explains confidence/uncertainty
- Supports handoff to human attorneys when required
- Records provenance of all AI outputs

---

## 2. System Architecture

### 2.1 Component Map (9 Components)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        A2Jai "Do I Need a Lawyer?"                      │
│                         Consumer Legal Navigator                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────┐    ┌──────────────────┐    ┌─────────────────────┐   │
│  │  1. INTAKE &  │───▶│  2. TRIAGE /     │───▶│  3. ELIGIBILITY &  │   │
│  │  AUTH         │    │  CLASSIFIER      │    │  SCOPE ASSESSOR    │   │
│  └──────────────┘    └──────────────────┘    └─────────────────────┘   │
│        │                     │                         │               │
│        │                     ▼                         ▼               │
│        │              ┌──────────────┐         ┌──────────────────┐   │
│        │              │ 6. RISK &    │◀────────│ 4. ADVICE        │   │
│        │              │ COMPLIANCE   │         │ GENERATOR        │   │
│        │              │ GUARDRAILS   │         └──────────────────┘   │
│        │              └──────────────┘                 │               │
│        │                     │                         ▼               │
│        │                     │                 ┌──────────────────┐   │
│        │                     │                 │ 5. RATIONALE &   │   │
│        │                     │                 │ EXPLAINABILITY   │   │
│        │                     │                 └──────────────────┘   │
│        │                     │                         │               │
│        │                     ▼                         ▼               │
│        │              ┌──────────────────────────────────────┐        │
│        │              │   7. HANDOFF & MARKETPLACE           │        │
│        │              │      CONNECTOR                       │        │
│        │              └──────────────────────────────────────┘        │
│        │                                                               │
│        ▼                                                               │
│  ┌──────────────────────────────────────────────────────────────┐     │
│  │  8. LOGGING & AUDIT TRAIL  (cross-cutting — all components) │     │
│  ├──────────────────────────────────────────────────────────────┤     │
│  │  9. ANALYTICS & FEEDBACK LOOP  (cross-cutting — all)        │     │
│  └──────────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Component Responsibilities

| # | Component | Responsibility | Tech Recommendation |
|---|-----------|---------------|---------------------|
| **1** | **User Intake & Authentication** | Structured questionnaire (guided fields for issue type, jurisdiction, key facts, desired outcome) + free-text capture. Identity/consent collection. Optional document upload (PDFs, images of letters). Stores encrypted session. | Next.js App Router form + Supabase Auth + Supabase Storage (encrypted bucket) |
| **2** | **Triage / Classifier** | Lightweight classifier: maps user input to case category (employment, contracts, disputes, governance, leasing, privacy/AI), urgency (low/med/high), jurisdiction (ON/BC/other), and UPL risk flag. Returns confidence score [0-1]. Maps to flat-fee service IDs from the pricing menu. | LLM (Claude) with structured output + rule-based post-filter matching service IDs |
| **3** | **Eligibility & Scope Assessor** | Splits consumer situation into: (a) tasks they can handle without a lawyer (DIY), (b) tasks that typically require counsel, (c) tasks that map to a flat-fee service. References jurisdiction-specific rules and the exclusion list. | LLM with RAG over flat-fee service catalog + jurisdiction rules |
| **4** | **Advice Generator (Consumer-Facing)** | Produces ≤300-word plain-language guidance: answer to "Do I need a lawyer?", recommended next steps, checklists/templates with time/cost estimates, confidence level with plain-language explanation, mandatory disclaimer. Never gives legal advice — gives *navigational guidance*. | LLM with constrained output format + template library |
| **5** | **Rationale & Explainability Module** | Generates numbered reasoning linking recommendations to facts, assumptions, and legal thresholds. Cites sources where available. Highlights uncertainties and escalation triggers. Internal chain-of-thought used but only summary exposed to user. | LLM post-processor (consumes CoT, outputs summary) |
| **6** | **Risk & Compliance Guardrails** | Policy layer: blocks disallowed outputs (specific legal advice, predictions of outcome, UPL-crossing statements). Routes to human review when confidence < 0.7, UPL risk flagged, high-stakes matter detected, or user requests attorney. Enforces excluded-matters list. | Rule engine + LLM-as-judge classifier + hardcoded blocklist |
| **7** | **Handoff & Marketplace Connector** | Schedules consults with attorneys. Generates sanitized case brief for attorney. Shows flat-fee pricing/options. Supports: (a) direct to flat-fee services, (b) future marketplace expansion. Shares case with attorney only after explicit user consent. | Calendar integration (Calendly/Cal.com) + service catalog API + Stripe for payment |
| **8** | **Logging & Audit Trail** | Immutable record: all user inputs, model versions, prompts used, outputs generated, timestamps, consent records. Supports compliance review, liability management, and reproducibility. User can export/delete their data. | Supabase audit table (append-only) + model version tagging |
| **9** | **Analytics & Feedback Loop** | Collects: outcome labels (did user hire lawyer? DIY success?), user satisfaction (NPS/CSAT), A/B test results, triage accuracy tracking. Feeds into model improvement. | PostHog or Plausible + custom event tracking + feedback UI component |

### 2.3 Data Flow

```
User lands on /navigator
  │
  ▼
[1. INTAKE] ──consent + structured data──▶ [8. LOGGING]
  │
  ▼
[2. TRIAGE] ──category, urgency, confidence, UPL_risk──▶ [6. GUARDRAILS]
  │                                                            │
  │  confidence >= 0.7 && UPL_risk == false                    │ confidence < 0.7
  │                                                            │ || UPL_risk == true
  ▼                                                            ▼
[3. ELIGIBILITY] ──DIY_tasks, lawyer_tasks, service_IDs──▶  [HUMAN REVIEW QUEUE]
  │
  ▼
[4. ADVICE GENERATOR] ──guidance + disclaimer──▶ [6. GUARDRAILS] ──pass/block──▶ User
  │
  ▼
[5. RATIONALE] ──numbered explanation──▶ User (expandable detail)
  │
  ▼
User Decision:
  ├── DIY → templates/checklists + [9. ANALYTICS] captures outcome
  ├── Purchase Premium → payment flow → enhanced templates
  └── Schedule Lawyer → [7. HANDOFF] → sanitized brief → attorney + [8. LOGGING]
```

### 2.4 Integration with Existing Infrastructure

| Existing Component | Integration Point |
|---|---|
| **justack.ai** (Next.js, Vercel) | Navigator lives at `/navigator` (or `/help` per site architecture plan) |
| **Supabase** | Auth, database, file storage (encrypted uploads) |
| **Flat-fee service catalog** (YAML) | Triage classifier maps to service IDs; handoff shows matching flat-fee options |
| **RenterShield** | Vertical instance — tenant-specific issues route to RenterShield or its equivalent guidance |
| **Box45Calculator** | Referenced as a DIY tool example in advice generator output |
| **Stripe** | Payment for premium product tiers and flat-fee service purchases |

---

## 3. Prioritized Features & User Flows

### 3.1 MVP Features (Priority Order)

| Priority | Feature | Rationale | Effort |
|----------|---------|-----------|--------|
| **P0** | Privacy consent + terms flow | Legal prerequisite — nothing works without consent | S |
| **P1** | Intake questionnaire + free-text | Core data collection — everything depends on this | M |
| **P2** | Triage classifier with confidence | Core intelligence — determines all downstream paths | L |
| **P3** | Consumer guidance with tasks list + disclaimer | Primary user value — the answer to "do I need a lawyer?" | L |
| **P4** | Lawyer-handoff button + sanitized brief | Monetization path + safety valve for complex cases | M |
| **P5** | Basic audit logging | Compliance requirement — must exist from day 1 | S |
| **P6** | Pricing/payment (Stripe) | Monetization — product purchase + flat-fee service purchase | M |

### 3.2 User Flow

```
┌──────────────────┐
│   LANDING PAGE   │  justack.ai/navigator
│  "Do I need a    │
│   lawyer?"       │
└────────┬─────────┘
         ▼
┌──────────────────┐
│  AUTH / CONSENT  │  Email + password (Supabase Auth)
│  Privacy terms   │  Explicit consent for data use
│  Data sharing    │  Option: share with attorney later
└────────┬─────────┘
         ▼
┌──────────────────┐
│  GUIDED INTAKE   │  Step 1: What area? (Employment, Business, Contract,
│  (5-step wizard) │          Dispute, Leasing, Privacy/AI, Other)
│                  │  Step 2: Province? (ON, BC, Other)
│                  │  Step 3: Key facts (structured fields per category)
│                  │  Step 4: What outcome do you want?
│                  │  Step 5: Upload documents (optional)
│                  │  + Free-text box: "Tell us anything else"
└────────┬─────────┘
         ▼
┌──────────────────┐
│  TRIAGE RESULT   │  Category confirmed, urgency level shown
│  (internal)      │  Confidence score calculated (NOT shown as number)
│                  │  → Plain-language confidence: "We're fairly confident
│                  │     about this assessment" / "This is a complex
│                  │     situation — we recommend speaking with a lawyer"
└────────┬─────────┘
         │
    confidence >= 0.7          confidence < 0.7
    && no UPL risk             || UPL risk flagged
         │                          │
         ▼                          ▼
┌──────────────────┐    ┌──────────────────────────┐
│  YOUR GUIDANCE   │    │  RECOMMENDATION:          │
│                  │    │  CONSULT A LAWYER          │
│  ✓ "Here's what │    │                            │
│    you can do    │    │  "Based on what you've     │
│    yourself"     │    │   told us, this situation   │
│  ✓ "Here's what │    │   would benefit from        │
│    needs a       │    │   professional legal help"  │
│    lawyer"       │    │                            │
│  ✓ Checklists   │    │  [Schedule a Consult]      │
│  ✓ Templates    │    │  [View Flat-Fee Options]   │
│  ✓ Rationale    │    └──────────────────────────┘
│  ✓ Disclaimer   │
└────────┬─────────┘
         │
    ┌────┼────────────────┐
    ▼    ▼                ▼
┌──────┐ ┌──────────┐ ┌───────────────┐
│ DIY  │ │ PURCHASE │ │ SCHEDULE      │
│      │ │ PREMIUM  │ │ LAWYER        │
│Free  │ │          │ │ CONSULT       │
│check-│ │Enhanced  │ │               │
│lists │ │templates,│ │Sanitized brief│
│& tips│ │guides,   │ │sent to atty   │
│      │ │priority  │ │               │
│      │ │support   │ │Flat-fee opts  │
│      │ │          │ │shown          │
└──┬───┘ └────┬─────┘ └──────┬────────┘
   │          │              │
   ▼          ▼              ▼
┌──────────────────────────────────┐
│  OUTCOME CAPTURE & FEEDBACK     │
│  "How did it go?" (30/60/90 day)│
│  NPS/CSAT rating                │
│  Outcome label for model training│
└──────────────────────────────────┘
```

---

## 4. Prompt Templates

### 4.1 Intake Normalization

```yaml
name: intake_normalizer
component: 1_intake
version: "1.0"

system: |
  You are an intake processing system for a legal navigation product.
  Your job is to extract structured fields from user free-text input.

  Extract the following fields:
  - issue_type: one of [employment, business_formation, contracts, disputes,
    commercial_leasing, privacy_ai, tenant_rights, other]
  - jurisdiction: province/state (default to user-selected if provided)
  - key_facts: array of factual statements (max 10)
  - desired_outcome: what the user wants to happen
  - documents: array of document descriptions if mentioned
  - timeline_urgency: any deadlines or time-sensitive elements mentioned

  If any critical field is missing, return a "clarifying_questions" array
  with up to 3 questions, prioritized by expected information gain.

  Return valid JSON only. Do not provide any legal analysis or advice.

user: |
  User selected category: {{selected_category}}
  User jurisdiction: {{jurisdiction}}
  Structured answers: {{structured_fields}}
  Free-text input: {{free_text}}
  Documents uploaded: {{document_list}}
```

### 4.2 Triage / Classifier

```yaml
name: triage_classifier
component: 2_triage
version: "1.0"

system: |
  You are a legal matter classifier for a consumer navigation tool.
  You do NOT provide legal advice. You classify the nature of the matter.

  Given structured case fields, determine:
  1. urgency: "low" | "medium" | "high"
     - high: imminent deadlines (<7 days), risk of irreversible harm,
       court dates, eviction notices
     - medium: deadlines within 30 days, significant financial exposure
     - low: no immediate deadline, planning/preventive matter
  2. legal_domain: primary legal area from [employment, business_formation,
     contracts, disputes, commercial_leasing, privacy_ai, tenant_rights]
  3. jurisdiction_confirmed: boolean (is the jurisdiction clearly ON or BC?)
  4. upl_risk: boolean — TRUE if:
     - Matter involves active litigation, tribunal proceedings, or court filings
     - Allegations of fraud, criminal conduct, or regulatory investigation
     - Tax planning or accounting questions
     - Unionized employment or mass employment actions
     - M&A, financings, or capital markets
     - Complex IP licensing or valuation
     - Environmental, franchise, or heavily regulated matters
  5. confidence: float [0.0–1.0] — your confidence in this classification
  6. matching_service_ids: array of flat-fee service IDs that may apply
     (from: employment.termination_offer_review, employment.employer_termination_kit,
      governance.incorporation_launch_pack, governance.shareholder_agreement_lite,
      contracts.single_review_redline, contracts.redline_subscription,
      disputes.demand_settlement_kit, disputes.collections_starter,
      leasing.lease_review_redline, privacy_ai.baseline_pack)
  7. similar_scenarios: top 3 brief descriptions of similar consumer situations

  Return valid JSON only. Do not provide legal advice or recommendations.

user: |
  Structured case: {{structured_case_json}}
```

### 4.3 Eligibility & Scope Assessor

```yaml
name: eligibility_scope_assessor
component: 3_eligibility
version: "1.0"

system: |
  You are a scope assessment system for a legal navigation product.
  You help consumers understand which tasks they can handle themselves
  and which typically require a lawyer. You do NOT provide legal advice.

  Given the structured case and jurisdiction, produce three lists:

  1. diy_tasks: tasks the consumer can reasonably complete without a lawyer
     - Include: form filling, information gathering, document organization,
       writing factual summaries, understanding timelines, filing fees
     - For each task: brief description, estimated time, estimated cost (if any),
       difficulty (easy/moderate/complex), and a one-sentence rationale

  2. lawyer_tasks: tasks that typically require a lawyer
     - Include: legal analysis, strategy, negotiation, drafting legal documents,
       court appearances, regulatory filings
     - For each task: brief description, why a lawyer adds value,
       and risk of proceeding without one (low/medium/high)

  3. flat_fee_matches: matching flat-fee services from the available menu
     - For each match: service_id, service_name, price_range, relevance_score [0-1],
       and one-sentence explanation of fit

  Mark items that are jurisdiction-dependent with a [JURISDICTION-DEPENDENT] tag
  and note the assumed jurisdiction rules.

  If the matter falls into an excluded category (litigation, tribunal,
  regulatory investigation, fraud, tax, union, M&A, complex IP, environmental,
  franchise), state this explicitly and recommend direct attorney consultation.

  Return valid JSON. Do not provide legal advice.

user: |
  Structured case: {{structured_case_json}}
  Jurisdiction: {{jurisdiction}}
  Triage result: {{triage_json}}
```

### 4.4 Advice Generator (Consumer-Facing)

```yaml
name: advice_generator
component: 4_advice
version: "1.0"

system: |
  You are a consumer guidance writer for a legal navigation product.
  You write clear, non-technical, empathetic guidance for everyday people.
  You NEVER provide legal advice. You provide NAVIGATIONAL GUIDANCE —
  helping people understand their situation and options.

  Produce a consumer-facing summary with exactly these sections:

  1. THE SHORT ANSWER: Plain-language answer to "Do I need a lawyer?"
     One of: "You can likely handle this yourself" / "A lawyer would help
     with specific parts" / "We recommend speaking with a lawyer"

  2. WHAT YOU CAN DO YOURSELF: Numbered list of DIY steps with time estimates

  3. WHERE A LAWYER HELPS: What a lawyer would do and why it matters

  4. YOUR OPTIONS:
     - DIY path (with checklist)
     - Flat-fee service (with price range if available)
     - Full consultation (with booking option)

  5. HOW CONFIDENT ARE WE: Plain-language explanation of assessment confidence.
     Do NOT show a numeric score. Use phrases like:
     - "We're quite confident" (>0.85)
     - "We're fairly confident" (0.7-0.85)
     - "This is complex — we recommend verifying with a professional" (<0.7)
     Include 1-2 sentences explaining what drives the uncertainty.

  6. ⚠️ IMPORTANT: "This is general guidance, not legal advice. It is not a
     substitute for advice from a licensed lawyer who knows your specific
     situation. For legal advice, please consult a qualified attorney
     licensed in your jurisdiction."

  HARD CONSTRAINTS:
  - Maximum 300 words total
  - No legal jargon without immediate plain-language explanation
  - No predictions of legal outcomes
  - No recommendations on whether to accept or reject any offer
  - Always present the "consult a lawyer" option regardless of confidence

user: |
  Eligibility assessment: {{eligibility_json}}
  User preferences: {{user_preferences}}
  Jurisdiction: {{jurisdiction}}
  Triage confidence: {{confidence_score}}
```

### 4.5 Rationale & Explainability

```yaml
name: rationale_explainability
component: 5_rationale
version: "1.0"

system: |
  You are an explainability system for a legal navigation product.
  Generate a concise, numbered explanation linking each recommendation
  to the user's facts, your assumptions, and relevant legal thresholds.

  Format:
  1. [Recommendation] — because [fact from user input] + [assumption] +
     [legal threshold or rule if applicable]
  2. ...

  Rules:
  - Cite authoritative sources where available (legislation name, regulation,
    government website)
  - Clearly label assumptions as "ASSUMPTION:" prefix
  - Highlight uncertainties with "UNCERTAINTY:" prefix
  - List escalation triggers: conditions under which this assessment
    would change (e.g., "if the amount exceeds $X", "if a deadline
    has been missed")
  - Do NOT reproduce chain-of-thought reasoning — summarize conclusions only
  - Include: "This explanation accompanies general guidance, not legal advice."

user: |
  Case facts: {{structured_case_json}}
  Triage output: {{triage_json}}
  Eligibility output: {{eligibility_json}}
  Advice output: {{advice_text}}
```

### 4.6 Handoff / Attorney Brief

```yaml
name: handoff_attorney_brief
component: 7_handoff
version: "1.0"

system: |
  You are a case preparation system. Generate a sanitized case brief
  for a reviewing attorney. The user has explicitly consented to sharing
  this information.

  Structure:
  1. MATTER SUMMARY: 2-3 sentence overview
  2. CLIENT CONTACT: {{contact_preferences}} (preferred method, availability)
  3. KEY FACTS: chronological bullet list of material facts
  4. DOCUMENTS: list of uploaded documents with brief description of each
  5. TRIAGE ASSESSMENT: category, urgency, confidence score, UPL flags
  6. AI GUIDANCE PROVIDED: summary of what the consumer was told
     (for attorney awareness and consistency)
  7. MATCHING SERVICES: flat-fee service IDs and tiers that may apply
  8. FLAGS FOR IMMEDIATE ATTENTION:
     - Imminent deadlines
     - Potential excluded matters requiring scope discussion
     - High-urgency or high-risk indicators
  9. SYSTEM METADATA: model version, timestamp, session ID

  PRIVACY: Include only information the user consented to share.
  Do not include raw AI reasoning or chain-of-thought.

user: |
  Structured case: {{structured_case_json}}
  Contact preferences: {{contact_preferences}}
  Triage: {{triage_json}}
  Eligibility: {{eligibility_json}}
  Advice provided: {{advice_text}}
  Consent scope: {{consent_scope}}
```

### 4.7 Escalation Router (Rule-Based)

```yaml
name: escalation_router
component: 6_guardrails
version: "1.0"
type: rule_engine  # Not pure LLM — logic layer

rules:
  - trigger: confidence < 0.7
    action: route_to_human_review
    message: "Our assessment confidence is below threshold. Routing to
              human review for quality assurance."
    user_message: "Your situation has some complexities that our system
                   wants a human expert to review. We're connecting you
                   with additional support."

  - trigger: upl_risk == true
    action: block_advice_generation + route_to_attorney
    message: "UPL risk detected. Blocking automated guidance. Routing
              directly to attorney consultation."
    user_message: "Based on what you've described, this matter involves
                   areas where professional legal advice is important.
                   We recommend speaking with a lawyer directly."

  - trigger: urgency == "high" AND matter in excluded_list
    action: priority_route_to_attorney
    message: "High-urgency excluded matter. Priority routing."
    user_message: "This appears to be an urgent matter that needs
                   prompt professional attention."

  - trigger: user_requests_attorney == true
    action: route_to_handoff
    message: "User explicitly requested attorney consultation."

  - trigger: output_contains_legal_advice_pattern
    action: block_output + regenerate
    patterns:
      - "you should accept"
      - "you will win"
      - "you will lose"
      - "your legal rights are"
      - "I advise you to"
      - "the law requires you to"
      - "you are entitled to"
      - "your claim is worth"

  thresholds:
    confidence_minimum: 0.7
    upl_risk_tolerance: false  # zero tolerance
    max_regeneration_attempts: 2
    fallback: route_to_human_review
```

---

## 5. Data, Privacy & Compliance

### 5.1 Privacy Requirements

| # | Requirement | Implementation |
|---|-------------|---------------|
| D1 | **Minimal PII collection** | Collect only: email, name (optional), province. No SIN/SSN, no DOB unless case-relevant. |
| D2 | **Explicit consent** | Consent modal before intake. Granular: (a) data processing, (b) AI analysis, (c) sharing with attorney. Each independently toggleable. |
| D3 | **Encryption at rest** | Supabase with AES-256 encryption. Document uploads in encrypted storage bucket. |
| D4 | **Encryption in transit** | TLS 1.3 everywhere. Cloudflare SSL. Vercel automatic HTTPS. |
| D5 | **Role-based access control** | Roles: consumer (own data only), attorney (consented shared data), admin (audit access), system (logging). Supabase RLS policies. |
| D6 | **Retention policy** | Active cases: retained while user account active. Inactive: auto-archive after 12 months. Deleted on user request within 30 days. Audit logs: 7-year retention (regulatory). |
| D7 | **User data deletion** | "Delete my data" button in account settings. Cascading delete: case data, documents, AI outputs. Audit trail entries anonymized but retained for compliance. |
| D8 | **User data export** | GDPR-style data portability. Export as JSON or PDF. Includes all inputs, AI outputs, and metadata. |
| D9 | **Model version tagging** | Every AI output logged with: model name, model version, prompt template version, timestamp, input hash. Enables reproducibility for liability. |
| D10 | **Content filters** | Pre-output filter: regex + LLM-as-judge to detect UPL-crossing language. Block and regenerate if triggered. Log blocked outputs for review. |

### 5.2 UPL Detection Rules

```typescript
// UPL risk signals — any match triggers escalation
const UPL_TRIGGERS = {
  // Case characteristics that indicate UPL risk
  case_flags: [
    'active_litigation',        // Already in court
    'tribunal_proceeding',      // LTB, HRTO, etc.
    'criminal_allegation',      // Criminal conduct alleged
    'regulatory_investigation', // Government investigation
    'tax_planning',            // Tax advice needed
    'unionized_workplace',     // Union employment
    'mass_termination',        // >50 employees
    'merger_acquisition',      // M&A
    'capital_markets',         // Securities
    'complex_ip',              // IP valuation/licensing
    'environmental',           // Environmental regulation
    'franchise',               // Franchise law
  ],

  // Output patterns that cross UPL line
  output_blocklist: [
    /you (should|must|need to) (accept|reject|sign|refuse)/i,
    /your? (legal )?(rights|entitlements) (are|include)/i,
    /you (will|would) (win|lose|succeed|fail)/i,
    /I (advise|recommend) (that )?you/i,
    /your claim is worth/i,
    /the law (requires|says|mandates) (that )?you/i,
    /you are (entitled|obligated) to/i,
    /this constitutes? (a )?breach/i,
    /you have (a )?cause of action/i,
  ],

  // Permitted navigational language
  permitted_patterns: [
    'people in similar situations often...',
    'you may want to consider...',
    'common options include...',
    'a lawyer could help with...',
    'this is general guidance, not legal advice',
  ]
};
```

### 5.3 Compliance Framework

| Regulation | Applicability | Implementation |
|-----------|--------------|----------------|
| **PIPEDA** (Canada) | All Canadian users | Consent framework, data minimization, breach notification plan |
| **Ontario LSRA** | Ontario-based legal services | Clear "not a lawyer" disclosures, no holding out as legal provider |
| **BC LSBC Rules** | BC-based legal services | Same as Ontario — jurisdiction-aware disclaimers |
| **Law Society UPL Rules** | All jurisdictions | Content filters, escalation rules, human review queue |
| **CASL** (anti-spam) | Email communications | Express consent for marketing emails, transactional exemption for case updates |

---

## 6. Evaluation Metrics & Acceptance Criteria

### 6.1 Metrics Dashboard

| # | Metric | Target (MVP) | Measurement Method |
|---|--------|-------------|-------------------|
| E1 | **Triage classification accuracy** | >85% on validated labeled set | Human-labeled test set of 200+ scenarios. Compare model output to expert labels. |
| E2 | **Confidence calibration** | Brier score <0.15 | Plot predicted confidence vs. actual accuracy. Perfect calibration = diagonal. |
| E3 | **User satisfaction** | NPS >40 / CSAT >70% | Post-session survey (5-point scale). NPS at 30/60 day follow-up. |
| E4 | **Unnecessary consult reduction** | >30% of users successfully DIY | Track outcome: users who chose DIY and reported successful resolution. |
| E5 | **False-negative rate** ("didn't flag need for lawyer") | <3% | Cases where user chose DIY but later needed a lawyer. Track via follow-up surveys and attorney feedback. |
| E6 | **Time-to-onboard** | <8 minutes intake completion | Median time from first page to triage result. |
| E7 | **DIY template completion rate** | >60% of started templates completed | Track template start vs. completion events. |

---

## 7. Deployment & Iteration Roadmap

### Phase 0 — Foundation (Weeks 0–4)

| Week | Deliverable | Owner |
|------|------------|-------|
| 1-2 | Refine product spec (this document → PRD) | Product |
| 1-2 | Assemble legal/compliance reviewers (law society rules, UPL boundaries) | Legal |
| 2-3 | Build intake schema + form components (Next.js) | Engineering |
| 2-3 | Create seed dataset: 50 consumer scenarios across 6 categories, manually labeled | Product + Legal |
| 3-4 | Define triage labels + exclusion rules (from flat-fee service catalog) | Legal + Engineering |
| 3-4 | Design database schema (Supabase): users, cases, triage_results, advice_outputs, audit_log | Engineering |
| 4 | Prompt template v1 tested against seed dataset | Engineering + Legal |

### Phase 1 — MVP (Weeks 4–12)

| Week | Deliverable | Owner |
|------|------------|-------|
| 4-6 | Intake UI + auth + consent flow deployed | Engineering |
| 5-7 | Triage classifier integrated (Claude API + rule post-filter) | Engineering |
| 6-8 | Eligibility assessor + advice generator (with guardrails) | Engineering |
| 7-9 | Handoff flow: case brief generation + Calendly integration | Engineering |
| 8-10 | Payment integration (Stripe) for Navigator tier ($49-$149) | Engineering |
| 9-10 | Audit logging + model version tagging | Engineering |
| 10-11 | Legal review of all prompts, disclaimers, and output samples | Legal |
| 11-12 | Pilot launch: limited cohort (50 users), manual monitoring | Product + Legal |

**MVP Exit Criteria:**
- Triage accuracy >85% on seed dataset
- Zero UPL violations in pilot
- User satisfaction CSAT >70% in pilot
- All audit logs recording correctly
- Legal review sign-off on all consumer-facing language

### Phase 2 — Scale (Months 3–9)

| Month | Deliverable | Owner |
|-------|------------|-------|
| 3-4 | Expand to all ON + BC service categories from flat-fee catalog | Product + Legal |
| 4-5 | Template library: 20+ DIY checklists and form templates | Content + Legal |
| 4-6 | Payment + scheduling integration for flat-fee services | Engineering |
| 5-7 | Continuous model improvement from outcome data + user feedback | ML / Engineering |
| 6-8 | Analytics dashboard: triage accuracy, user outcomes, NPS tracking | Engineering |
| 7-9 | Attorney marketplace expansion (beyond initial practice) | Business Dev |
| 8-9 | A/B testing framework for guidance quality optimization | Engineering |

### Immediate Next Steps (This Week)

1. **Review this spec** — review architecture, prompts, compliance requirements
2. **Identify legal reviewer** — someone to validate UPL boundaries and disclaimer language
3. **Set up project** — create `/navigator` route in existing justack.ai project
4. **Build intake schema** — TypeScript types matching prompt template fields
5. **Seed dataset** — write 10 consumer scenarios (2 per top category) as test fixtures

---

## 8. Implementation Constraints

| Constraint | Rule | Enforcement |
|-----------|------|-------------|
| **Chain-of-thought hiding** | Use chain-of-thought internally; expose only final rationale summary to users | Rationale module post-processes CoT → summary. Raw CoT logged in audit trail, never rendered in UI. |
| **Confidence threshold** | Below 0.7 → require human review before showing guidance | Escalation router enforces. No bypass. |
| **Mandatory disclaimer** | All consumer-facing outputs include non-legal-advice disclaimer | Hardcoded in UI template. Also enforced in prompt. Double layer — prompt generates it, UI appends it regardless. |
| **Clear next actions** | Every guidance output ends with specific actionable steps | Prompt template structure enforces (Section 2: "What you can do yourself") |
| **No outcome predictions** | Never predict legal outcomes ("you will win/lose") | Content filter blocklist + prompt instruction |

---

## 9. Acceptance Tests

### Test 1 — Tenant Eviction (High-Urgency)

```
GIVEN: User in Ontario reports receiving N4 eviction notice for
       non-payment, hearing date in 10 days, rent arrears of $3,200
WHEN:  System processes intake and triage
THEN:
  - Triage: urgency=high, domain=tenant_rights, confidence >= 0.8
  - Classification: "likely needs counsel"
  - DIY tasks: gather rent receipts, file dispute at LTB (link provided)
  - Lawyer tasks: hearing representation, negotiation strategy
  - Guidance includes: "This is an urgent matter with a hearing deadline.
    We strongly recommend speaking with a lawyer or legal aid clinic."
  - Handoff option: schedule consult, show flat-fee options if applicable
  - Disclaimer present
  - Confidence explanation: "We're quite confident about this assessment
    because eviction proceedings with short deadlines typically benefit
    from professional legal help."
```

### Test 2 — Simple Contract Review (Low-Urgency)

```
GIVEN: User in BC has freelance contract to review before signing,
       no deadline for 3 weeks, contract value $15,000
WHEN:  System processes intake and triage
THEN:
  - Triage: urgency=low, domain=contracts, confidence >= 0.85
  - Classification: "lawyer helps with specific parts"
  - DIY tasks: read contract fully, list questions, check payment terms
  - Lawyer tasks: review liability clauses, IP assignment, termination terms
  - Matching service: contracts.single_review_redline.simple ($450-$1,250)
  - All three options presented: DIY / flat-fee review / full consult
```

### Test 3 — Excluded Matter (M&A)

```
GIVEN: User describes merger negotiation with $2M company
WHEN:  System processes triage
THEN:
  - UPL_risk: true (M&A is excluded matter)
  - Confidence: N/A (escalation bypasses confidence assessment)
  - System blocks advice generation
  - User sees: "This involves a complex transaction that requires
    specialized legal counsel. We recommend consulting a lawyer
    experienced in mergers and acquisitions."
  - Direct route to attorney handoff
```

### Automated Test (TypeScript)

```typescript
// acceptance-test-tenant-eviction.test.ts
describe('Tenant Eviction — Ontario — High Urgency', () => {
  const input = {
    issue_type: 'tenant_rights',
    jurisdiction: 'Ontario',
    key_facts: [
      'Received N4 notice for non-payment',
      'Hearing date in 10 days',
      'Rent arrears: $3,200',
      'Has rent receipts for past 6 months'
    ],
    desired_outcome: 'Stay in apartment, negotiate payment plan',
    documents: ['n4_notice.pdf'],
    timeline_urgency: 'Hearing in 10 days'
  };

  it('classifies as likely-needs-counsel with confidence >= 0.8', async () => {
    const triage = await triageClassifier(input);
    expect(triage.urgency).toBe('high');
    expect(triage.legal_domain).toBe('tenant_rights');
    expect(triage.confidence).toBeGreaterThanOrEqual(0.8);
    expect(triage.upl_risk).toBe(false);
  });

  it('produces required legal steps brief', async () => {
    const eligibility = await eligibilityAssessor(input);
    expect(eligibility.diy_tasks.length).toBeGreaterThan(0);
    expect(eligibility.lawyer_tasks.length).toBeGreaterThan(0);
    expect(eligibility.diy_tasks.some(t =>
      t.description.toLowerCase().includes('receipt')
    )).toBe(true);
  });

  it('offers to schedule a consult', async () => {
    const advice = await adviceGenerator(input);
    expect(advice).toContain('consult');
    expect(advice).toContain('not legal advice');
    expect(advice.length).toBeLessThanOrEqual(1800); // ~300 words
  });

  it('never shows raw confidence number to user', async () => {
    const rendered = await renderGuidance(input);
    expect(rendered).not.toMatch(/confidence[:\s]*0\.\d+/i);
    expect(rendered).toMatch(
      /(quite confident|fairly confident|complex.*recommend)/i
    );
  });
});
```

---

## Appendix: Service Category Mapping

The triage classifier maps consumer issues to the following flat-fee service categories:

| Category | Service IDs | Price Range |
|----------|------------|-------------|
| **Employment** | `employment.termination_offer_review` (3 tiers), `employment.employer_termination_kit` (2 tiers) | $650–$9,500 |
| **Business Formation & Governance** | `governance.incorporation_launch_pack` (2 tiers), `governance.shareholder_agreement_lite` | $1,250–$8,500 |
| **Contracts** | `contracts.single_review_redline` (2 tiers), `contracts.redline_subscription` (2 tiers) | $450–$7,500/mo |
| **Disputes** | `disputes.demand_settlement_kit` (2 tiers), `disputes.collections_starter` | $750–$4,500 |
| **Commercial Leasing** | `leasing.lease_review_redline` | $750 |
| **Privacy & AI Governance** | `privacy_ai.baseline_pack` | $2,500–$7,500 |

**Excluded matters** (route directly to attorney consultation):
- Litigation, arbitration, or tribunal proceedings
- Court filings, appearances, or enforcement steps
- Regulatory investigations, audits, or professional discipline
- Allegations of fraud, dishonesty, or criminal conduct
- Tax planning or accounting advice
- Unionized employment matters
- Mass employment actions or workplace investigations
- Mergers, acquisitions, financings, or capital markets transactions
- Complex intellectual property licensing or valuation
- Environmental, franchise, or heavily regulated commercial matters

---

*This is a living document. Update as decisions are made, products launch, and architecture evolves.*
