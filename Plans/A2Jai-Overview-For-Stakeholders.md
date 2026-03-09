# A2Jai: Restoring Access to Justice in the Age of AI

**An overview for advisors, collaborators, journalists, and investors**

March 2026 | justack.ai

---

## The Problem

The legal system in Canada works for those who can pay. For everyone else, it does not.

Each year, 5.4 million Canadians — roughly 18% of the adult population — experience a serious legal problem. Of those, only 29% contact a lawyer. Of the lawyer contacts that do occur, 24% result in no help at all, and 41% address only part of the problem. When the numbers are totalled, **78% of people with serious legal problems receive no professional legal help whatsoever.**

This is not a fringe statistic. It describes the norm.

A million Canadians say they want more legal assistance but do not seek it. The reasons are consistent: cost, confusion about what help is available, and a pervasive belief — often correct — that the system is not designed for them.

The Supreme Court of Canada has called this a "culture of complacency." The legal profession holds a monopoly over access to the system and, simultaneously, over its inaccessibility.

Meanwhile, the legal services market in Canada generates $15.7 billion in annual revenue, with 41% flowing from commercial clients. The underserved consumer population represents a potential market expansion of $5 to $7 billion annually — people who need help, are willing to pay for it, and currently have nowhere to turn.

*Sources: Canadian Legal Problems Survey via CBA National Magazine; Statistics Canada; Supreme Court of Canada.*

---

## The Vision

A2Jai — **Access to Justice through AI** — is a project to restore practical legal help to the people who have been priced out of it.

The name is deliberate. The access-to-justice crisis is not new. It accumulated over two centuries of professionalization — through overhead, specialization, billable-hour economics, and the consolidation of legal practice into a credentialed monopoly. The gains in rigour and procedural fairness were real. But they came at a cost that was never explicitly debated: **the cost of access.**

It was not always so. The lay dicasts of Athens, the early Justices of the Peace, the Courts of Piepowder — these were mechanisms of practical justice: accessible, timely, and comprehensible to the people they served. They were imperfect. But they were available.

AI brings the opportunity to restore that availability — not by replacing lawyers, but by closing the information and guidance gap that leaves millions of people with no help at all.

> *"They deserve better than nothing."*

That is the project. That is A2Jai.

---

## The Product: "Do I Need a Lawyer?"

At the centre of A2Jai is a consumer product that answers the question most people cannot afford to ask: **Do I need a lawyer? And if so, for what?**

No one is going to retain a lawyer simply to find out whether they need one. But they will purchase a product that helps them figure it out.

### How It Works

The consumer experience is straightforward:

1. **Describe your situation.** A guided intake process helps the user articulate their legal issue — employment dispute, contract question, business formation, landlord-tenant conflict — through a combination of structured questions and free-text description.

2. **Receive a clear assessment.** The system classifies the situation, identifies what the user can handle independently, and distinguishes the tasks that typically require professional legal help. Every assessment is accompanied by a plain-language explanation of the reasoning and the system's level of confidence.

3. **Choose your path.** Based on the assessment, the user can:
   - **Do it themselves** — with checklists, templates, and step-by-step guidance
   - **Purchase enhanced guidance** — with personalized templates and document review
   - **Connect with a lawyer** — with a pre-prepared case summary and transparent, flat-fee pricing options

### What It Is Not

The product does not provide legal advice. It does not predict outcomes. It does not replace lawyers.

It provides **navigational guidance** — helping people understand their situation, their options, and the appropriate level of professional help they need. Every output includes a clear disclaimer and a path to a licensed attorney.

This distinction is not a technicality. It is a design principle enforced at every level of the system — in the AI models, in the compliance layer, and in the user experience.

---

## What Is Already Built

A2Jai is not a concept. It is under active development, with working products and infrastructure in place.

**justack.ai** — The platform is live, built on a modern web stack (Next.js, Vercel), with the A2Jai manifesto, blog, and core site architecture completed. The "Do I Need a Lawyer?" Navigator product is in active development.

**RenterShield** — A tenant rights application built on the same infrastructure, helping renters understand their rights and options in landlord-tenant disputes. Live and accessible via justack.ai.

**Box45Calculator** — An open-source tax calculation tool, live at box45calculator.ca, demonstrating the model of delivering practical legal-adjacent tools to consumers at no cost.

**Flat-Fee Legal Services** — A structured menu of defined-scope, flat-fee legal services across six practice areas — employment, business formation, contracts, disputes, commercial leasing, and privacy/AI governance — available in Ontario and British Columbia. This is the lawyer-side service layer that the Navigator product connects consumers to.

---

## The Business Model

A2Jai operates on a three-tier model that aligns consumer need with revenue sustainability.

**Tier 1 — Free Triage.** Basic assessment of the user's situation and a high-level answer to "Do I need a lawyer?" This tier serves the widest audience and creates awareness.

**Tier 2 — Navigator (Paid Product).** Full guidance report with personalized checklists, templates, rationale, and document review summaries. This is the core purchasable product — affordable enough for the consumer market, valuable enough to justify the price.

**Tier 3 — Consult Connect (Flat-Fee Legal Services).** Direct booking into defined-scope, flat-fee legal services. The consumer sees transparent pricing before committing. The lawyer receives a pre-prepared case summary. Both sides benefit from reduced friction and clear expectations.

The model is designed to be self-sustaining: Tier 1 creates the funnel. Tier 2 generates product revenue. Tier 3 connects to legal services revenue. The open-source layer (described below) ensures the mission extends beyond any single revenue stream.

---

## Open Source and the Dual Model

A2Jai maintains a structural commitment to open source.

> *"The commercial side funds the mission. The open-source side fulfils it."*

This is not a marketing position. It is a design principle:

- **Public tools** are released under the Apache 2.0 licence — free to use, modify, and build upon
- **Commercial products** (the Navigator, flat-fee service delivery tools) sustain the enterprise
- **The infrastructure** — intake schemas, triage classifiers, compliance frameworks — is designed to be reusable by legal aid organizations, academic researchers, and other developers

The open-source commitment exists because the access-to-justice crisis will not be solved by any single company. The tools to address it should not be locked behind a paywall.

**Community model:** GitHub organization (github.com/justack-ai) for code and roadmap, with both asynchronous (GitHub Discussions) and real-time (Discord) community channels planned.

---

## Safety and Compliance

A2Jai takes an unusually cautious approach to AI in the legal domain. This is deliberate.

**No legal advice.** The system provides navigational guidance — not legal advice. This distinction is enforced at multiple layers: in the AI model instructions, in a dedicated compliance engine that screens every output, and in the user interface itself. Consumer-facing outputs always include a clear disclaimer and a direct path to a licensed attorney.

**Unauthorized Practice of Law (UPL) prevention.** A rule-based compliance layer identifies matters that fall outside the scope of navigational guidance — active litigation, tribunal proceedings, criminal allegations, tax planning, and other complex or regulated matters — and routes users directly to attorney consultation. There is no override.

**Confidence transparency.** When the system is uncertain about its assessment, it says so — in plain language, not hidden behind a number. Below a defined confidence threshold, the system requires human professional review before showing any guidance.

**Privacy by design.** Minimal personal data is collected. All data is encrypted. Users control what is shared with attorneys and can delete their data at any time. An immutable audit trail records every AI output for compliance and accountability.

**Lawyer review.** All final legal deliverables from the flat-fee services are reviewed and approved by a licensed lawyer. Technology supports efficiency; it does not replace professional judgment.

---

## The Founder

**Michael Bryant** is the founder and designer of A2Jai.

He served as **Attorney General of Ontario** from 2003 to 2007, overseeing one of the largest justice systems in North America. He subsequently served as **CEO of the Canadian Civil Liberties Association** and **CEO of Legal Aid BC** — one of the largest legal aid organizations in Canada.

His professional career spans government, non-profit leadership, Indigenous partnerships, and legal technology. He is currently based in Vancouver, British Columbia.

Bryant has experienced the justice system from its most privileged corridors to its most unforgiving depths — and that range of experience informs every product A2Jai builds.

---

## Roadmap

**Now — Foundation**
- Platform live at justack.ai with manifesto, blog, and core architecture
- RenterShield and Box45Calculator operational
- Flat-fee legal services menu structured and available in Ontario and British Columbia
- "Do I Need a Lawyer?" Navigator product in active development
- Architecture specification and AI prompt framework complete

**Next — Product Launch**
- Navigator MVP: guided intake, AI triage, consumer guidance, lawyer handoff
- Pilot with limited cohort for quality validation
- Payment integration for product purchase and flat-fee service booking
- Legal compliance review and law society alignment

**Later — Scale**
- Expanded jurisdiction coverage beyond Ontario and British Columbia
- Template library: DIY checklists and guided forms across all service categories
- Attorney marketplace — extending beyond in-house flat-fee services to a broader network
- Continuous model improvement from outcome data and user feedback
- Open-source community growth and third-party integrations

---

## How to Get Involved

A2Jai is a personal project designed to become a collective one.

**Advisors** — A2Jai seeks strategic advisors with experience in legal services regulation, legal technology, AI governance, or scaling consumer products in regulated industries. The advisory need is genuine: navigating law society rules, UPL boundaries, and technology regulation across Canadian jurisdictions requires experienced counsel.

**Collaborators** — Developers, legal technologists, and designers who want to build tools that address a real access-to-justice gap. The open-source infrastructure is designed to be extended. Community contribution guidelines and technical documentation are forthcoming.

**Journalists** — The access-to-justice crisis in Canada is well-documented but under-covered in the context of AI. A2Jai offers a concrete, credibility-backed case study of how AI is being applied to close the gap — by someone who has seen the system from the inside.

**Investors** — The underserved legal consumer market in Canada represents a multi-billion dollar opportunity. A2Jai is building the product infrastructure to serve it. The team is open to conversations with investors who understand regulated markets and mission-aligned technology businesses.

---

## Contact

**Michael Bryant**
Founder, A2Jai | Justack.ai

Email: michael@justack.ai
Web: justack.ai
LinkedIn: linkedin.com/in/michaelbryant

---

*This document is confidential and intended for the recipient only. Please do not distribute without permission.*
