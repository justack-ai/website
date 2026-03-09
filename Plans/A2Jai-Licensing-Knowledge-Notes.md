# A2Jai Licensing — Knowledge Notes

**Created:** 2026-03-06
**Purpose:** Captured insights from licensing deliberation sessions for future reference (legal skill, legal info agent, product design)

---

## Decision Record

**License:** Apache 2.0 + Responsible Use Addendum (draft at Plans/A2Jai-Responsible-Use-Addendum-DRAFT.md)
**Scope:** Apache 2.0 for all public developer-facing and consumer-facing tools. Proprietary for Navigator paid tiers, flat-fee delivery tools, and law practice infrastructure.
**Foundation/Corporation:** Deferred until VC investment becomes relevant.
**Date decided:** 2026-03-06

---

## Key Insight: Modification Traceability for Compliance Tools

Source: GC.AI analysis (2026-03-06)

AI compliance tools have a licensing requirement that generic software does not: **modification traceability matters for regulatory defense.** When a regulated entity uses a compliance tool to satisfy an audit or regulatory obligation, they need to prove whether they are running the original tool or a modified fork with altered thresholds, logic, or scoring.

- Apache 2.0 requires contributors to mark modified files — creating a basic audit trail.
- MIT has no such requirement — forks with silently altered compliance logic are indistinguishable from the original.
- This matters for: EU AI Act (Article 43 conformity assessment), NIST AI RMF (provenance and traceability), law society technology competence requirements (lawyers must understand and supervise tools they use).

**Product design implication:** A2Jai's compliance tools should include version fingerprinting, integrity checking, or hash verification independent of the license — so that deployers can verify they are running unmodified code. The license creates a legal obligation to mark changes; the product should create a technical mechanism to detect them.

---

## MIT vs Apache 2.0: Settled Analysis

### Why Apache 2.0 over MIT for justack.ai

1. **Patent grant** — Apache 2.0 provides explicit, worldwide, royalty-free patent license from each contributor. MIT is silent on patents. A2Jai's tools (triage classifiers, jurisdiction-detection, confidence-scoring, bias detection, regulatory mapping) involve methods that could intersect with software patents.

2. **Patent retaliation** — Apache 2.0 automatically terminates patent rights if a licensee sues. Defensive shield against patent trolls and aggressive competitors.

3. **Trademark carve-out** — Apache 2.0 explicitly excludes trademark grants. Protects justack.ai and A2Jai brand names from confusing use by forks.

4. **Modification marking** — Apache 2.0 requires marking of modified files. Critical for compliance tools where audit trail matters.

5. **NOTICE file** — Enables controlled attribution and a natural hook for directing users to supplemental terms (Responsible Use Addendum, data processing terms).

6. **Canadian government guidance** — Treasury Board of Canada recommends Apache 2.0 for larger software projects. justack.ai qualifies.

7. **AI/ML ecosystem norm** — TensorFlow, Hugging Face Transformers, JAX all use Apache 2.0. A2Jai's AI contributors will find it familiar.

### Why MIT was considered but rejected

1. Legal tech open source ecosystem (Docassemble, Suffolk LIT Lab, HMCTS) defaults to MIT.
2. UK Government Digital Service mandates MIT for government code.
3. Simpler compliance review for legal aid organizations.
4. However: no published study shows MIT attracts more contributors than Apache 2.0 within the permissive license category. The difference is negligible.

### Contributor attraction: no measurable difference

- Lerner & Tirole (2005): permissive licenses attract more contributors than copyleft, but MIT and Apache 2.0 are not distinguished within the permissive category.
- Vendome et al. (2017): MIT represents ~57% of GitHub repos, Apache 2.0 ~15%, but contributor rates per license type were not measured.
- No study has ever compared MIT vs Apache 2.0 contributor rates head-to-head.

---

## GC.AI Analysis: Strengths and Weaknesses

### What GC.AI got right
- Patent grant is the decisive MIT vs Apache 2.0 differentiator
- Trademark carve-out matters for legal tech brand
- NOTICE file for attribution control
- Enterprise/government procurement preference for Apache 2.0
- AI compliance tools need modification traceability (excellent analysis)
- EU AI Act and NIST AI RMF framing is relevant and well-applied
- Four concrete examples (bias auditing fork, govt procurement, multi-contributor patent, brand confusion) are realistic

### What GC.AI got wrong
- **Entity conflation:** Repeatedly addressed "Bryant Law Group" — justack.ai is a separate corporation, not a law firm. Law society obligations attach to the lawyer personally, not to the corporation's license choice.
- **Overstated MIT contributor advantage:** Called it "marginal" but data shows no measurable difference.
- **Professional responsibility framing:** Embedded law society analysis in licensing sections, creating the impression that license choice has regulatory implications. It doesn't — product design and operational discipline do.

---

## Regulatory Considerations (for product design, not licensing)

These are noted by GC.AI and confirmed as relevant, but they are product design concerns, not license selection concerns:

1. **EU AI Act** — If A2Jai's compliance tools are classified as high-risk AI (Article 43), deployers bear transparency, documentation, and human oversight obligations. Product must support these.
2. **NIST AI RMF** — Emphasizes provenance and traceability. Product should include version verification.
3. **PIPEDA / BC PIPA** — If tools process personal information (bias analysis of datasets), data processing terms needed. NOTICE file can reference these.
4. **Law society competence** — Lawyer-users must understand and supervise tools. Product documentation must be clear enough for non-technical lawyers to satisfy competence obligations.
5. **UPL risk** — Neither license creates UPL risk, but product must include clear disclaimers that tools provide legal information, not legal advice. This is a terms-of-use concern, not a license concern.

---

## Sources

- Lerner & Tirole (2005), "The Scope of Open Source Licensing"
- Vendome et al. (2017), "License Usage and Changes on GitHub" (Empirical Software Engineering)
- Xu et al. (2024), "Large-Scale Empirical Study of Open Source License Usage" (MSR 2024)
- Canada Treasury Board, Guide for Publishing Open Source Code
- Canada Policy on Service and Digital (C.2.3.8, C.2.3.9.5)
- UK Government Digital Service, Licensing Guidance
- HMCTS GitHub (1,739 repos, MIT)
- Hugging Face model licensing empirical analysis (2025, arxiv 2502.04484)
- GC.AI analysis provided by founder (2026-03-06)
- PAI licensing strategy analysis (Plans/A2Jai-Licensing-Strategy-Analysis.md)
