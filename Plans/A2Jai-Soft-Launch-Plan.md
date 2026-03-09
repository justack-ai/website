# A2Jai / justack.ai — Soft Launch Plan

**Target: March 16, 2026 (10 days from today)**
**Created: 2026-03-06**
**Status: ACTIVE — licensing decision made (Strategy A: Apache 2.0 for public tools, proprietary for commercial, 2026-03-06)**

---

## 1. CORPUS INVENTORY

### 1.1 Blog Posts — Original (Hand-Written)

| # | Title | File | Date | Status | Notes |
|---|-------|------|------|--------|-------|
| 1 | Building the Justice Stack | `content/blog/building-the-justice-stack.mdx` | 2026-02-15 | NEEDS REVISION | References "Layer 4 housing law assistant in development" — update to reflect current product state (Navigator, not just housing). Stack metaphor is strong but Layer descriptions need updating to match current architecture. |
| 2 | They Deserve Better Than Nothing | `content/blog/they-deserve-better-than-nothing.mdx` | 2026-02-26 | PUBLISH-READY | Core manifesto blog. Claims are sourced (CBA, Statistics Canada). Tone is excellent. "Housing law assistant" reference in closing should be broadened to "legal navigation tools." Minor update only. |
| 3 | Why Open Source Legal Tech Matters | `content/blog/why-open-source-legal-tech.mdx` | 2026-02-20 | NEEDS REVISION — LICENSING | States "We use Apache 2.0 for our core tools." This must be updated once licensing decision is made. If licensing model changes, this post requires substantive rewrite. Hold for post-decision revision. |

### 1.2 Blog Posts — AI-Generated Drafts (Pipeline Output)

| # | Title | Source | Audience | Status | Notes |
|---|-------|--------|----------|--------|-------|
| 4 | How RenterShield Scans Leases Without Giving Legal Advice | `ai-ops/output/drafts-2026-03-02.json` [0] | Public | NEEDS EDITORIAL REVIEW | 798 words. Solid structure. Claims are accurate. Tone is consistent with truth store voice. References "five-layer architecture" which is from the blog metaphor, not the actual architecture spec — reconcile. Disclaimers present. Ready after light editing. |
| 5 | The Open-Core Model: Funding Justice Through Commercial Services | `ai-ops/output/drafts-2026-03-02.json` [1] | Investors | READY — LICENSING CONFIRMED | 648 words. Apache 2.0 confirmed 2026-03-06. Content already reflects Apache 2.0 accurately. Good investor-facing tone. Ready for editorial review. |
| 6 | Why Landlord-Tenant Laws Vary So Much Across Jurisdictions | `ai-ops/output/drafts-2026-03-02.json` [2] | Policy | PUBLISH-READY (after light edit) | 798 words. Policy analysis framing is appropriate. No licensing dependencies. Claims are general and accurate. Light copy-edit needed. |

### 1.3 Strategic Documents

| # | Document | File | Status | Notes |
|---|----------|------|--------|-------|
| 7 | A2Jai Legal Navigator Architecture v1.0 | `Plans/A2Jai-Legal-Navigator-Architecture-v1.0.md` | INTERNAL — NOT FOR PUBLICATION | 836 lines. Engineering spec. 9 components, 7 prompt templates, evaluation metrics. Current and accurate. Not for website. |
| 8 | A2Jai Overview for Stakeholders | `Plans/A2Jai-Overview-For-Stakeholders.md` | NEEDS REVIEW | 1,866 words. Investor/advisor-facing. Marked confidential. Product status claims need verification against current build state. Bio section current. Roadmap section current. |

### 1.4 Website Pages (Built, in Codebase)

| # | Page | Route | Status | Notes |
|---|------|-------|--------|-------|
| 9 | Landing Page | `/` | BUILT — needs visual QA | Option 5 design with 5-audience routing cards. In route group `(site)/`. |
| 10 | A2Jai Manifesto | `/a2jai` | BUILT — needs visual QA | Full 8-section manifesto with pull quotes, timeline, section nav. Client component. |
| 11 | Blog Index + Posts | `/blog`, `/blog/[slug]` | BUILT — Sanity CMS | 3 posts migrated to Sanity. GROQ queries working. Glassmorphism design. |
| 12 | About | `/about` | BUILT — needs visual QA | Story + regulatory philosophy. |
| 13 | Sanity Studio | `/studio` | BUILT — route group isolated | Fixed in March 2 session. White background, login UI renders. |
| 14 | Email Capture | `/api/subscribe` | BUILT — needs backend wiring | Route exists but email service integration (Resend/Buttondown) not confirmed. |

### 1.5 Manifesto Source

| # | Document | File | Status |
|---|----------|------|--------|
| 15 | A2Jai Manifesto (source text) | `content/a2jai-manifesto.txt` | COMPLETE — rendered on /a2jai page |

### 1.6 AI Ops Infrastructure

| # | Component | Location | Status |
|---|-----------|----------|--------|
| 16 | SlateAgent | `justack-platform/ai-ops/agents/slate-agent.ts` | BUILT |
| 17 | PRDraftAgent | `justack-platform/ai-ops/agents/draft-agent.ts` | BUILT |
| 18 | QualityGateAgent | `justack-platform/ai-ops/agents/quality-gate-agent.ts` | BUILT |
| 19 | ReleaseNarrativeAgent | Not built | REMAINING |
| 20 | Truth Store (voice, facts, prior-posts) | `justack-platform/ai-ops/truth-store/` | BUILT |
| 21 | Inference Router | `justack-platform/ai-ops/lib/inference.ts` | BUILT (DeepSeek/Anthropic/OpenAI) |
| 22 | Pipeline Runner | `justack-platform/ai-ops/runner.ts` | BUILT — not scheduled |

---

## 2. GAP ANALYSIS — What's Missing for Soft Launch

### Critical Path (Must Have for March 16)

| # | Gap | Severity | Effort | Notes |
|---|-----|----------|--------|-------|
| G1 | **Vercel deployment** | BLOCKER | 1 hour | Site is localhost only. No production URL. Must deploy to justack.ai. |
| G2 | **Git push** | BLOCKER | 10 min | Route group restructure committed locally, not pushed. Must push before deploy. |
| G3 | **GitHub PAT rotation** | BLOCKER (security) | 15 min | PAT was exposed in chat during prior session. Must regenerate before any push. |
| G4 | **Licensing decision** | RESOLVED 2026-03-06 | 2-3 hours | Apache 2.0 confirmed. Blog #3 and AI draft #5 verified accurate. No content changes needed. |
| G5 | **Blog content finalization** | HIGH | 2-3 hours | 4 of 6 posts need revision. At minimum, launch with 3-4 publish-ready posts. |
| G6 | **Sanity CORS for production** | HIGH | 5 min | Add justack.ai to Sanity CORS origins. Blog won't load in prod without this. |
| G7 | **Email capture backend** | MEDIUM | 1-2 hours | `/api/subscribe` route exists but needs service integration (Resend recommended). |
| G8 | **Visual QA pass** | MEDIUM | 1-2 hours | Landing page, manifesto, about page need mobile responsiveness check. |
| G9 | **Analytics setup** | LOW | 30 min | Plausible or Fathom — privacy-respecting. Not required for soft launch but strongly recommended. |

### Nice to Have (Before or Shortly After Launch)

| # | Gap | Effort | Notes |
|---|-----|--------|-------|
| G10 | Repo governance (CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, DISCLAIMER.md) | 1-2 hours | Important for open-source credibility but not launch-blocking. |
| G11 | ReleaseNarrativeAgent (4th AI ops agent) | 2-3 hours | Generates release narratives from merged PRs. Post-launch. |
| G12 | Pipeline scheduling (launchd) | 1 hour | Daily automated content generation. Post-launch. |
| G13 | Ollama setup on Mac Mini | 2-3 hours | Local SLM for zero-cost bulk inference. Post-launch. |
| G14 | Two-lane policy document finalization | 1 hour | ~/Desktop/two-lane-policy.md is DRAFT. Internal only. |
| G15 | Grok/xAI wired into inference router | 30 min | XAI_API_KEY exists but not in inference.ts. Post-launch. |

### Content Not Yet Created (Consider for Launch)

| # | Content | Priority | Notes |
|---|---------|----------|-------|
| C-NEW-1 | LICENSE file in repo root | CRITICAL | Must match licensing decision. Currently no LICENSE file. |
| C-NEW-2 | DISCLAIMER.md | HIGH | Legal disclaimer for the website/repo. Required for a legal tech project. |
| C-NEW-3 | /build page (developer-facing) | LOW | Phase 2 per Gates architecture. Not needed for soft launch. |
| C-NEW-4 | Privacy Policy page | MEDIUM | Should exist at launch for email capture compliance. |
| C-NEW-5 | Terms of Use page | MEDIUM | Standard for any site collecting data. |

---

## 3. TEN-DAY TIMETABLE — March 6-16, 2026

### Day 1 (March 6, Thu) — FOUNDATION
- [ ] Complete this launch plan review (this session)
- [ ] Make licensing decision (review options in Section 4, decide)
- [ ] Regenerate GitHub PAT (security blocker — do first)

### Day 2 (March 7, Fri) — GIT & LICENSING
- [x] Push route group restructure to GitHub (after PAT) — pushed ffa7626 2026-03-06
- [x] Update LICENSE file in repo root (based on decision) — Apache 2.0 committed 2026-03-06
- [x] Update blog post #3 ("Why Open Source Legal Tech") to reflect licensing decision — already reflects Apache 2.0, confirmed accurate
- [x] Update AI draft #5 ("Open-Core Model") to reflect licensing decision — already references Apache 2.0 throughout, confirmed accurate

### Day 3 (March 8, Sat) — CONTENT POLISH
- [ ] Revise blog post #1 ("Building the Justice Stack") — update layer descriptions
- [ ] Light-edit blog post #2 ("They Deserve Better") — broaden housing reference
- [ ] Light-edit AI draft #4 ("RenterShield Scans Leases") — reconcile architecture references
- [ ] Light-edit AI draft #6 ("Jurisdictional Variation") — copy-edit pass

### Day 4 (March 9, Sun) — CONTENT TO CMS
- [ ] Publish finalized posts to Sanity CMS (minimum 4, ideally all 6)
- [ ] Review Stakeholder Overview for accuracy
- [ ] Create DISCLAIMER.md for repo

### Day 5 (March 10, Mon) — DEPLOYMENT PREP
- [ ] Add justack.ai to Sanity CORS origins
- [ ] Set up Vercel project linked to justack-ai/website
- [ ] Configure environment variables in Vercel (Sanity project ID, dataset)
- [ ] Test deployment to preview URL

### Day 6 (March 11, Tue) — DEPLOY & QA
- [ ] Deploy to justack.ai (production)
- [ ] Visual QA: landing page (desktop + mobile)
- [ ] Visual QA: /a2jai manifesto (desktop + mobile)
- [ ] Visual QA: /blog (all posts render correctly)
- [ ] Visual QA: /about page
- [ ] Fix any responsive design issues found

### Day 7 (March 12, Wed) — EMAIL & LEGAL PAGES
- [ ] Wire email capture to Resend (or Buttondown)
- [ ] Test email signup flow end-to-end
- [ ] Create Privacy Policy page (can be simple/standard for now)
- [ ] Create Terms of Use page

### Day 8 (March 13, Thu) — GOVERNANCE & ANALYTICS
- [ ] Add repo governance files (CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md)
- [ ] Set up Plausible or Fathom analytics
- [ ] Verify analytics tracking on production
- [ ] Final review of all live pages

### Day 9 (March 14, Fri) — SOFT LAUNCH PREP
- [ ] Final content review — all blog posts live and accurate
- [ ] Test all navigation paths on production
- [ ] Prepare soft launch announcement (email, LinkedIn, select contacts)
- [ ] Review Stakeholder Overview — send to select advisors if ready
- [ ] Verify /studio access is not publicly exposed (should require auth)

### Day 10 (March 15-16, Sat-Sun) — SOFT LAUNCH
- [ ] Go live announcement
- [ ] Share with select audience (advisors, collaborators, close contacts)
- [ ] Monitor analytics and email signups
- [ ] Document any issues for immediate post-launch fixes
- [ ] Post-launch retrospective notes

---

## 4. LICENSING ANALYSIS

### 4.1 Current State

The project has a **locked but informal** decision from the Phase 1 session (Feb 25):
> "Dual License — Apache 2.0 for public repos + optional commercial license for enterprises + proprietary for flat-fee delivery tools"

No LICENSE file exists in the repo. Blog post #3 and the Stakeholder Overview reference Apache 2.0. The user now wants to reconsider, specifically examining Mozilla and Hugging Face approaches.

### 4.2 Mozilla Public License 2.0 (MPL) — The Hybrid Model

**How it works:**
- MPL is a "weak copyleft" license — a middle ground between permissive (Apache/MIT) and strong copyleft (GPL/AGPL)
- **File-level copyleft:** modifications to MPL-licensed files must be shared under MPL, but MPL code can be combined with proprietary code in a larger work
- Used by Firefox, Thunderbird, and Mozilla's entire product suite
- Mozilla Foundation (non-profit) + Mozilla Corporation (wholly-owned commercial subsidiary) structure

**The Mozilla model in practice:**
- Firefox core: MPL 2.0 (anyone can fork, but changes to MPL files must be shared)
- Mozilla VPN, Pocket, etc.: proprietary commercial products built on and alongside open-source infrastructure
- Revenue: primarily from search engine deals (Google pays ~$500M/yr for default search), plus subscriptions
- The non-profit/commercial split lets them take investor money on the commercial side while protecting the mission on the non-profit side

**Pros for A2Jai:**
- File-level copyleft means competitors can't take your triage classifier improvements without contributing back, but CAN build proprietary products that use your tools
- More protective than Apache 2.0 — prevents "strip-mine and close" behavior
- Well-understood by enterprise legal teams
- Compatible with Apache 2.0 and LGPL code (can incorporate both)
- Signals "serious open source" without scaring away commercial users
- The Mozilla Foundation/Corporation structure is a proven model for mission + commerce

**Cons for A2Jai:**
- More complex than Apache 2.0 — contributors need to understand file-level scope
- Some enterprises have blanket bans on copyleft (even weak copyleft), which could limit adoption
- Legal aid organizations may not have counsel to evaluate copyleft implications
- Community contributors may prefer simpler Apache 2.0
- The Foundation/Corporation split requires actual legal entity restructuring

### 4.3 Hugging Face Model — Apache 2.0 + Commercial Services

**How it works:**
- Core libraries (Transformers, Datasets, Tokenizers, Diffusers) are Apache 2.0 — fully permissive
- Revenue comes from Hugging Face Hub (hosted model infrastructure), Enterprise Hub, and cloud services
- Models hosted on the Hub can use ANY license — model creators choose (Apache 2.0, MIT, proprietary, or custom "responsible AI" licenses)
- Hugging Face introduced custom licenses for AI: "BigScience RAIL" (Responsible AI License) — permissive but with use restrictions (no surveillance, no military targeting, etc.)

**The HF model in practice:**
- Transformers library: Apache 2.0, anyone can use for anything
- Hub hosting: freemium — free for public models, paid for private repos, enterprise features, inference endpoints
- Revenue: $70M+ ARR (2024), growing fast, primarily from enterprise subscriptions
- Moat is community + infrastructure, not code control — the code being open is what drives adoption, adoption drives Hub usage, Hub usage drives revenue

**Pros for A2Jai:**
- Maximum adoption — no license barriers for legal aid orgs, academics, or developers
- Simple to understand — Apache 2.0 is the gold standard for permissive
- Moat comes from brand, community, and hosted services — not from restricting code
- Aligns with manifesto language ("access to justice infrastructure should be a public good")
- Already referenced in existing content — minimal revision needed
- RAIL-style licensing could add responsible use clauses (no use for frivolous litigation, debt collection harassment, etc.) while keeping code open

**Cons for A2Jai:**
- No protection against competitors taking your code, wrapping it in a proprietary product, and competing directly
- At A2Jai's current stage (pre-revenue, small team), the "adoption drives revenue" flywheel may not spin fast enough
- HF has $235M+ in VC funding to subsidize open-source development — A2Jai does not
- RAIL licenses are novel and untested in courts

### 4.4 Other Models for Context

**AGPL 3.0 (Affero GPL) — The Network Copyleft:**
- Used by: MongoDB (before SSPL), Grafana, Nextcloud, Mastodon
- Requires anyone who runs modified code as a network service to share their changes
- Strongest open-source protection — prevents cloud providers from offering your software as a service without contributing back
- Con: Many enterprises have hard bans on AGPL. Adoption is lower. Legal aid orgs may be wary.

**Business Source License (BSL / BUSL) — The Delayed Open Source:**
- Used by: MariaDB, CockroachDB, Sentry, HashiCorp (Terraform)
- Source is visible but not "open source" by OSI definition for a period (typically 3-4 years), then converts to a permissive license
- Prevents competitors from offering your product as a hosted service during the protection period
- Con: Not OSI-approved open source. Saying "open source" while using BSL invites criticism. Incompatible with manifesto language.

**Server Side Public License (SSPL) — The MongoDB Model:**
- Similar to AGPL but with broader copyleft scope
- Con: Not OSI-approved. Controversial. Overkill for A2Jai's use case.

### 4.5 Comparison Matrix

| Factor | Apache 2.0 (HF-style) | MPL 2.0 (Mozilla-style) | AGPL 3.0 | BSL |
|--------|----------------------|------------------------|----------|-----|
| **Adoption friction** | Lowest | Low-Medium | Medium-High | High |
| **Competitor protection** | None | File-level | Strong (network) | Strongest |
| **Legal aid org friendliness** | Highest | High | Medium | Low |
| **Enterprise acceptance** | Highest | High | Low | Medium |
| **Manifesto alignment** | Strongest | Strong | Strong | Weak |
| **Contributor simplicity** | Simplest | Moderate | Moderate | Complex |
| **Revenue model fit** | Services moat | Code + services | Code protection | Time-gated |
| **Existing content compatibility** | No changes needed | Minor revisions | Significant revisions | Major revisions |
| **OSI approved** | Yes | Yes | Yes | No |

### 4.6 Recommendation (for decision — not a locked choice)

**Option A — Confirm Apache 2.0 (HF-style) with Responsible Use Addendum**
- Keep Apache 2.0 for all public tools (Box45Calculator, RenterShield open core, intake schemas, triage classifiers)
- Add a "Responsible Use" addendum (inspired by RAIL) that prohibits use for: unauthorized practice of law, debt collection harassment, tenant intimidation, and similar misuse
- Proprietary license for commercial products (Navigator, flat-fee delivery tools)
- Moat: community, brand, hosted services, and lawyer network — not code control
- **Minimal disruption** to existing content. Blog #3 needs only the addendum mention.

**Option B — Move to MPL 2.0 (Mozilla-style)**
- MPL 2.0 for public tools (file-level copyleft protects contributions)
- Proprietary license for commercial products
- Stronger protection against strip-mining but slightly higher adoption friction
- **Moderate disruption** to existing content. Blog #3, Stakeholder Overview, and manifesto references to Apache 2.0 need updating.

**Option C — Hybrid: Apache 2.0 for libraries, MPL 2.0 for applications**
- Apache 2.0 for reusable libraries (intake schemas, classifier utilities, data models)
- MPL 2.0 for applications (RenterShield, Box45Calculator)
- Proprietary for commercial products
- Balances maximum adoption for building blocks with protection for complete applications
- **Moderate disruption** — content needs nuanced updating.

**Preliminary assessment:** Option A is most aligned with the manifesto, existing content, and the Hugging Face precedent. Option C is the most architecturally precise but adds licensing complexity that may confuse the community at this stage. Option B is a reasonable middle ground if competitor protection matters more than adoption simplicity.

**This is your decision, User.** Each option is viable. The critical factor is: at this stage, does A2Jai benefit more from maximum adoption (A) or from contribution protection (B/C)?

---

## 5. DEPLOYMENT BLOCKERS — Resolution Steps

### B1: GitHub PAT Rotation (SECURITY — DO FIRST)
1. Go to github.com > Settings > Developer Settings > Fine-grained personal access tokens
2. Revoke the exposed PAT
3. Create new PAT scoped to `justack-ai` organization with "All repositories"
4. Permissions: Administration, Contents, Issues, Pull requests (Read+Write)
5. Update `~/.env` with new `GITHUB_PAT=` value
6. Verify: `curl -H "Authorization: Bearer $(cat ~/.env | grep GITHUB_PAT | cut -d= -f2 | tr -d '[:space:]')" https://api.github.com/orgs/justack-ai/repos`

### B2: Git Push (after PAT)
1. `cd ~/projects/justack-ai`
2. `git add -A && git commit -m "Add route group restructure, Plans, Stakeholder Overview"`
3. `git push origin main`
4. Verify: check github.com/justack-ai/website shows latest commits

### B3: Sanity CORS
1. `npx sanity cors add https://justack.ai --project b0kmw4n5`
2. Verify: CORS list includes justack.ai

### B4: Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. `cd ~/projects/justack-ai && vercel link` (link to justack-ai org or personal)
3. Set env vars in Vercel dashboard: `NEXT_PUBLIC_SANITY_PROJECT_ID=b0kmw4n5`, `NEXT_PUBLIC_SANITY_DATASET=production`
4. `vercel --prod`
5. Configure custom domain: justack.ai (update DNS at Porkbun — A record to Vercel)
6. Verify: `curl -I https://justack.ai`

### B5: LICENSE File
1. After licensing decision, create `LICENSE` file in repo root
2. For Apache 2.0: copy standard Apache 2.0 text
3. For MPL 2.0: copy standard MPL 2.0 text
4. For hybrid: include both with clear scope explanation in a `LICENSING.md`

---

## 6. BLOG POST REVIEW NOTES

### Post #1: "Building the Justice Stack" — NEEDS REVISION
- **Issue:** Layer descriptions don't match current architecture. "Layer 4: Consumer Legal Products" should reference the Navigator product, not just "housing law assistant."
- **Issue:** "The first Layer 4 tool — a housing law assistant" should be "The first consumer product — a legal navigator that helps people determine whether they need a lawyer."
- **Issue:** "Layer 1 is being assembled" is outdated — truth store, inference router, and agents are built.
- **Action:** Update layer descriptions. Preserve the stack metaphor. ~30 min edit.

### Post #2: "They Deserve Better Than Nothing" — NEAR PUBLISH-READY
- **Issue:** "The first will be a housing law assistant" in closing paragraph is too narrow. Should reference "legal navigation tools" or the Navigator concept.
- **Action:** One-line edit in closing paragraph. ~5 min.

### Post #3: "Why Open Source Legal Tech Matters" — HOLD FOR LICENSING
- **Issue:** "We use Apache 2.0 for our core tools" — may change.
- **Issue:** "How We Think About Licensing" section needs rewriting if licensing model changes.
- **Action:** Rewrite after licensing decision. ~1 hour if model changes, ~15 min if Apache 2.0 confirmed.

### AI Draft #4: "How RenterShield Scans Leases" — LIGHT EDIT NEEDED
- **Issue:** References "five-layer architecture" — this is the blog metaphor from post #1, not the actual 9-component architecture from the Architecture spec. Reconcile.
- **Issue:** "Two-lane architecture: Lane A for legal services, Lane B for legal tech" — accurate, can stay.
- **Quality:** Disclaimers present and appropriate. Tone matches truth store voice. Claims sourced.
- **Action:** Replace "five-layer architecture" with "multi-component system" or similar. ~15 min.

### AI Draft #5: "The Open-Core Model" — LICENSING CONFIRMED, READY FOR EDITORIAL
- **Issue:** RESOLVED. Apache 2.0 confirmed 2026-03-06. Content verified accurate — no hedging language, all references state Apache 2.0 as fact.
- **Quality:** Well-structured for investor audience. Claims accurate.
- **Action:** Editorial review only. No substantive rewrite needed. ~15 min.

### AI Draft #6: "Jurisdictional Variation" — LIGHT EDIT NEEDED
- **Issue:** No licensing dependencies. General policy analysis.
- **Quality:** Appropriate framing. No legal advice claims. Disclaimers present.
- **Action:** Copy-edit pass for flow and readability. ~15 min.

---

## 7. STAKEHOLDER OVERVIEW REVIEW

**Document:** `Plans/A2Jai-Overview-For-Stakeholders.md`

| Section | Status | Notes |
|---------|--------|-------|
| The Problem | ACCURATE | Market data sourced (CBA, StatsCan, SCC). Numbers current. |
| The Vision | ACCURATE | Manifesto framing consistent. |
| The Product | ACCURATE | Navigator concept well-described. Three-path model clear. |
| What Is Already Built | NEEDS UPDATE | Says "The platform is live" — it is NOT live yet (localhost only). Should say "under active development" or update after deployment. |
| The Business Model | ACCURATE | Three-tier model consistent with architecture spec. |
| Open Source and Dual Model | MAY NEED UPDATE | References Apache 2.0. Update if licensing decision changes. |
| Safety and Compliance | ACCURATE | UPL prevention, confidence transparency, privacy — all consistent. |
| The Founder | ACCURATE | Bio is current. |
| Roadmap | ACCURATE | "Now/Next/Later" framing is current. |
| Contact | VERIFY | michael@justack.ai — confirm email is configured. |

**Critical fix needed:** "What Is Already Built" section claims platform is live. Fix to reflect actual state, or deploy first and then the claim becomes true.

---

## 8. ANTI-CRITERIA COMPLIANCE CHECK

- **A1 (No invented services):** All content references only services from the YAML bundle (employment, governance, contracts, disputes, leasing, privacy/AI). No new services invented. COMPLIANT.
- **A2 (No licensing lock without approval):** Section 4 presents three options with comparison matrix. No decision imposed. COMPLIANT.
- **A3 (No legal advice claims):** All blog posts and drafts include disclaimers. Navigator described as "navigational guidance, not legal advice." Stakeholder overview explicitly states "does not provide legal advice." COMPLIANT.
