# justack.ai — Launch Readiness Plan

**Created:** 2026-03-11
**Replaces:** A2Jai-Soft-Launch-Plan.md (2026-03-06, preserved — not deleted)
**Status:** AUDIT COMPLETE — awaiting user decisions on timeline and scope

---

## 0. EXECUTIVE SUMMARY

The original soft launch plan (March 6, target March 16) is **partially complete and partially stale.** The site is live, deployed, and technically functional. However, a four-agent adversarial analysis revealed a fundamental problem: **there is nothing to launch.** The site currently has no functional products, no way for visitors to do anything except read 3 blog posts, and the email capture form silently discards submissions.

Before picking a date, the question is: **what does "launch" mean for justack.ai?**

This plan distinguishes three launch phases, audits every original item, integrates the user's new requirements (Advisory Board, blog corpus, lawyer products, consumer products, aesthetic polish), and presents timeline options — not locked dates.

---

## 1. WHAT "LAUNCH" MEANS — Three Phases

### Phase 0: Quiet Live (CURRENT STATE)
**What it is:** Site is deployed, publicly accessible, indexed by search engines. Nobody is being told about it.
**What a visitor can do:** Read 3 blog posts. Read the manifesto. Read About page. That's it.
**Who knows:** Only people who worked on it.

### Phase 1: Soft Launch (Invite-Only)
**What it is:** Deliberate sharing with 20-50 select contacts: prospective advisors, legal tech colleagues, trusted collaborators. Purpose is feedback, not growth.
**Minimum requirements:**
- 6-8 published blog posts (shows active thought leadership)
- Email capture functional (Resend — so signups aren't lost)
- Blog tone reviewed and approved by founder
- Stakeholder Overview accurate and shareable
- Advisory Board section on site OR "Advisory Board forming" language
- No broken pages, no placeholder tools, no claims about products that don't exist
- All code committed to git, PAT rotated
- Analytics active (know who's visiting)

### Phase 2: Public Launch
**What it is:** LinkedIn announcement, press, proactive outreach. The site is the public face of the practice.
**Minimum requirements (beyond Phase 1):**
- At least one functional consumer product (Navigator MVP or RenterShield accessible via site)
- At least one functional lawyer-facing offering (even if it's "join the network" intake form)
- Advisory Board named (3-5 people with consent)
- 10-15 blog posts showing consistent publishing cadence
- Aesthetic polish complete — site looks like it was built by a serious operation
- SEO foundations (meta tags, OG images, sitemap)

---

## 2. ORIGINAL PLAN AUDIT — Item-by-Item Status

### Gap Analysis Items (from March 6 plan)

| # | Original Gap | Original Status | Current Status (March 11) | Notes |
|---|-------------|----------------|--------------------------|-------|
| G1 | Vercel deployment | BLOCKER | **DONE** | Live at justack.ai, SSL active, Vercel CLI deploys working |
| G2 | Git push | BLOCKER | **PARTIALLY DONE** | Commits through 52cae01 pushed. Recent MDX archive + PROJECT.md uncommitted |
| G3 | GitHub PAT rotation | BLOCKER (security) | **NOT DONE** | Still exposed. Must rotate before any further git work |
| G4 | Licensing decision | RESOLVED | **DONE** | Apache 2.0 confirmed, LICENSE file committed |
| G5 | Blog content finalization | HIGH | **NOT DONE** | 3 published, 3 drafts in Sanity, 8 MDX drafts local. Tone flagged by user |
| G6 | Sanity CORS for production | HIGH | **DONE** | justack.ai and www.justack.ai both in CORS origins |
| G7 | Email capture backend | MEDIUM | **NOT DONE — CRITICAL** | Form saves to local JSON which evaporates on Vercel deploy. Every signup is lost. Fix or remove form before any launch |
| G8 | Visual QA pass | MEDIUM | **DONE** | 28 screenshots (14 desktop + 14 mobile), responsive fixes deployed March 10 |
| G9 | Analytics setup | LOW | **NOT DONE** | No analytics. No visibility into who visits |
| G10 | Repo governance | NICE-TO-HAVE | **MOSTLY DONE** | CONTRIBUTING.md, RESPONSIBLE-USE.md, LICENSE, NOTICE all exist. Missing: CODE_OF_CONDUCT.md, SECURITY.md |
| G11 | ReleaseNarrativeAgent | NICE-TO-HAVE | NOT DONE | Post-launch. Not blocking |
| G12 | Pipeline scheduling | NICE-TO-HAVE | NOT DONE | Post-launch |
| G13 | Ollama on Mac Mini | NICE-TO-HAVE | NOT DONE | Post-launch |
| G14 | Two-lane policy doc | NICE-TO-HAVE | NOT DONE | Internal only |
| G15 | Grok/xAI in inference router | NICE-TO-HAVE | NOT DONE | Post-launch |
| C-NEW-1 | LICENSE file | CRITICAL | **DONE** | Apache 2.0, committed |
| C-NEW-2 | DISCLAIMER.md | HIGH | NOT DONE | Still needed for legal tech credibility |
| C-NEW-3 | /build page | LOW | **EXISTS** | Page built, content present |
| C-NEW-4 | Privacy Policy page | MEDIUM | **DONE** | /privacy page exists and deployed |
| C-NEW-5 | Terms of Use page | MEDIUM | **DONE** | /terms page exists and deployed |

### Ten-Day Timetable Items (from March 6 plan)

| Day | Items | Status |
|-----|-------|--------|
| Day 1 (Mar 6) | Plan review, licensing decision, PAT rotation | Plan done, licensing done, **PAT NOT DONE** |
| Day 2 (Mar 7) | Git push, LICENSE, blog updates | **ALL DONE** |
| Day 3 (Mar 8) | Blog revisions (posts 1, 2, 4, 6) | **NOT DONE** — tone direction needed from user first |
| Day 4 (Mar 9) | Publish to Sanity, Stakeholder review, DISCLAIMER | **NOT DONE** |
| Day 5 (Mar 10) | Sanity CORS, Vercel setup, env vars | **ALL DONE** (deployed March 10) |
| Day 6 (Mar 11) | Deploy + Visual QA | **DONE** (deployed + visual QA with 28 screenshots) |
| Day 7 (Mar 12) | Email capture, Privacy, Terms | Privacy + Terms **DONE**. Email capture **NOT DONE** |
| Day 8 (Mar 13) | Governance, Analytics | Governance **MOSTLY DONE**. Analytics **NOT DONE** |
| Day 9 (Mar 14) | Final review, soft launch prep | NOT DONE |
| Day 10 (Mar 15-16) | Soft launch | NOT DONE |

### Summary: 12 of 22 original items are complete. 10 remain.

---

## 3. NEW WORKSTREAMS (from user, March 11)

### WS-1: Advisory Board Formation

**What's needed:** Named advisors with consent, listed on site or in materials.
**Current state:** No candidates identified. No outreach started.
**Dependencies:** User must identify candidates. This is a relationship task, not a build task.
**Realistic timeline:** 4-8 weeks to have 3-5 committed advisors.

**Recommended approach:**
1. User identifies 8-10 prospective advisors from professional network
2. Draft a one-page "Advisory Board Overview" (role description, time commitment, no compensation unless offered)
3. Personal outreach from Michael (not from PAI — Rule 3)
4. Expect ~50% conversion rate → target 8-10 asks for 4-5 seats
5. Add "Advisory Board" section to /about page once first 2-3 confirm

**Phase 1 (Soft Launch) minimum:** "Advisory Board forming — if you're interested in shaping access-to-justice technology, contact michael@justack.ai"
**Phase 2 (Public Launch) minimum:** 3-5 named advisors with bios on the site

### WS-2: Blog Corpus

**What's needed:** Enough published posts to demonstrate active thought leadership and subject matter depth.
**Current state:**
- 3 published in Sanity (Building the Justice Stack, They Deserve Better, Why Open Source Legal Tech)
- 3 drafts in Sanity (RenterShield Scans Leases, Open-Core Model, Jurisdictional Variation)
- 8 MDX drafts NOT in Sanity (added March 8 — never migrated)
- User flagged tone as "smartass, immature" — needs editorial direction before publishing more

**Blog corpus inventory (all sources):**

| # | Title | Location | Status | Tone Risk |
|---|-------|----------|--------|-----------|
| 1 | Building the Justice Stack | Sanity (published) | Needs layer description updates | Low |
| 2 | They Deserve Better Than Nothing | Sanity (published) | Needs one-line closing edit | Low |
| 3 | Why Open Source Legal Tech | Sanity (published) | Licensing references confirmed accurate | Low |
| 4 | How RenterShield Scans Leases | Sanity (draft) | Needs architecture reference fix | **CHECK TONE** |
| 5 | The Open-Core Model | Sanity (draft) | Ready for editorial review | **CHECK TONE** |
| 6 | Jurisdictional Variation | Sanity (draft) | Needs copy-edit | **CHECK TONE** |
| 7 | Building in the Open | MDX only | Not migrated to Sanity | **CHECK TONE** |
| 8 | Five Things Every Tenant Should Know | MDX only | Not migrated to Sanity | **CHECK TONE** |
| 9 | From Intake to Insight | MDX only | Not migrated to Sanity, refs flat-fee | **CHECK TONE + CONTENT** |
| 10 | How AI Triage Works Without Practicing Law | MDX only | Not migrated to Sanity | **CHECK TONE** |
| 11 | Privacy by Design in Legal Tech | MDX only | Not migrated to Sanity | **CHECK TONE** |
| 12 | The API-Native Law Firm | MDX only | Not migrated to Sanity, refs flat-fee | **CHECK TONE + CONTENT** |
| 13 | The Twelve Billion Dollar Gap | MDX only | Not migrated to Sanity | **CHECK TONE** |
| 14 | What Legal Information Actually Means | MDX only | Not migrated to Sanity, refs flat-fee | **CHECK TONE + CONTENT** |

**BLOCKER:** User must review and approve blog tone before batch migration. Without tone direction, publishing more AI-generated posts risks amplifying a style the founder dislikes.

**Phase 1 minimum:** 6-8 posts (revise 3 published + publish 3 Sanity drafts after tone review)
**Phase 2 minimum:** 10-15 posts (migrate best MDX drafts after editorial pass, remove flat-fee refs)

### WS-3: Lawyer-Facing Products

**What's needed:** Something a lawyer visiting /tools can actually use or sign up for.
**Current state:** /tools page repurposed as "lawyer network" page after flat-fee removal. No functional product. No intake form. No network to join.

**Options (for user decision):**
- **A) Lawyer Network Waitlist:** Simple intake form — "Join the justack.ai lawyer network. We're building a platform that connects people who need legal help with lawyers who provide it. Express interest." Wire to Resend or Google Form.
- **B) Practice Area Directory:** Placeholder directory structure showing where lawyer profiles will live. "Coming soon" with sign-up.
- **C) Defer:** Remove /tools from nav until there's something real. Add back when ready.

**Phase 1 minimum:** Option A (waitlist form) or Option C (remove from nav)
**Phase 2 minimum:** Functional intake + at least a pilot group of lawyers onboarded

### WS-4: Consumer Legal Help Products

**What's needed:** A visitor who needs legal help can do something on the site beyond reading blog posts.
**Current state:**
- Navigator ("Do I Need a Lawyer?") — architecture spec written, not built
- RenterShield — referenced in plans but not linked from site, unclear if accessible
- /help page exists ("I Need Legal Help") but functionality unknown
- Box45Calculator — lives at box45calculator.ca, not integrated into justack.ai

**Options (for user decision):**
- **A) Navigator MVP:** Ship a minimal version — guided intake form → assessment output. Even if simplistic, it demonstrates the product concept.
- **B) Link to Box45Calculator:** Cross-link existing working product to show something ships.
- **C) "Coming Soon" Waitlist:** /help page becomes "The Legal Navigator is coming. Sign up to be notified." Wire to Resend.
- **D) Defer:** /help page stays as-is. Don't promise products until they exist.

**Phase 1 minimum:** Option B or C
**Phase 2 minimum:** Navigator MVP functional

### WS-5: Aesthetic and Content Fine-Tuning

**What's needed:** The site looks and reads like a credible, professional legal tech operation.
**Current state:** Glassmorphism design is distinctive. Mobile responsive after March 10 fixes. But:
- npm audit shows 2 vulnerabilities (1 moderate, 1 high) from Vercel build
- Some pages may still have flat-fee language remnants
- "Coming Soon" badge sizing was fixed but broader aesthetic review not done
- No OG images / social preview cards
- No favicon beyond default

**Specific items:**
1. Full content audit — remove any remaining flat-fee references across all pages
2. OG images for social sharing (blog posts + key pages)
3. Favicon / site icon
4. npm audit fix
5. SEO meta tags review (titles, descriptions per page)
6. 404 page design
7. Loading states / skeleton screens for Sanity-powered pages

---

## 4. RED TEAM SYNTHESIS

Four adversarial agents independently analyzed this plan. Key convergent findings:

### What They Agreed On (Strengths)
- The site IS technically functional and deployable — Vercel handles scaling, SSL, CDN
- The A2Jai manifesto page carries genuine weight given Bryant's credentials
- A soft launch to a limited audience is forgiving and appropriate
- The technology stack is solid and modern

### What They Agreed On (Weaknesses)
1. **The credential-gap paradox:** Bryant's resume creates a HIGHER bar, not a lower one. A former AG launching a site with empty tool pages reads as "didn't take this seriously enough to ship." Advisors will judge against polished competitors.
2. **There is nothing to launch:** A visitor cannot buy, sign up for, or do anything. "You cannot officially launch a brochure."
3. **Email capture is silently broken:** Subscriptions are saved to local JSON that evaporates on every Vercel deploy. Every signup since deployment is lost. Fix or remove before any outreach.
4. **Adding scope to an incomplete plan lowers the ceiling:** Advisory Board + products + blogs + polish in 5 days "is not ambition, it is denial."
5. **GitHub PAT is a 90-second fix that's been deferred for 5+ days.** Just do it.

### The Core Question (from IN-4)
> "Is this actually a launch problem or a 'what am I building' problem?"

---

## 5. DEPENDENCIES MAP

```
GitHub PAT rotation (G3)
  └─→ Git commit all changes
       └─→ Clean repo state

Email capture fix (G7) ──────────────────→ Phase 1 launch
                                            ↑
Blog tone direction (USER DECISION) ──→ Blog editorial pass ──→ Blog corpus ──→ Phase 1 launch
                                                                  ↑
MDX migration to Sanity ──────────────────────────────────────────┘

Advisory Board candidates (USER DECISION) ──→ Outreach ──→ Confirmations ──→ Phase 2 launch

Lawyer product direction (USER DECISION) ──→ Build/waitlist ──→ Phase 1 or Phase 2

Consumer product direction (USER DECISION) ──→ Build Navigator MVP ──→ Phase 2 launch

Analytics setup (G9) ──→ Phase 1 launch (need visibility before sharing)
```

**Three items block on USER DECISIONS before any work can proceed:**
1. Blog tone direction — what voice does Michael want?
2. Lawyer product approach — Option A, B, or C?
3. Consumer product approach — Option A, B, C, or D?

---

## 6. TIMELINE OPTIONS

**Note (Rule 7):** These are options with estimates, not commitments. Michael decides the pace.

### Option 1: Phase 1 Soft Launch — Target: March 21-23 (10-12 days)

Assumes blog tone direction provided within 2 days. Scope: fix what's broken, polish what exists, don't build new products.

| Week | Focus | Items |
|------|-------|-------|
| **This week (Mar 11-14)** | Fix critical debt | PAT rotation, git commit, email capture → Resend, analytics setup, npm audit fix |
| **Next week (Mar 17-21)** | Content + polish | Blog tone review + editorial pass, publish 3 Sanity drafts, Stakeholder Overview update, OG images, favicon, flat-fee content sweep, "Advisory Board forming" language on /about |
| **Mar 21-23** | Soft launch | Share with 20-50 select contacts, monitor analytics |

**What gets deferred:** Lawyer products, consumer products (Navigator), Advisory Board recruitment, MDX migration, aesthetic overhaul.

### Option 2: Phase 1 Soft Launch — Target: April 1-4 (~3 weeks)

More thorough. Includes blog corpus expansion and one product decision.

| Week | Focus | Items |
|------|-------|-------|
| **Week 1 (Mar 11-16)** | Fix critical debt | PAT rotation, git commit, email capture, analytics, npm audit |
| **Week 2 (Mar 17-23)** | Content corpus | Blog tone review, editorial pass on all 14 posts, migrate best 5-6 MDX to Sanity, publish to reach 8-10 total posts. Stakeholder Overview update |
| **Week 3 (Mar 24-31)** | Product + polish | Lawyer network waitlist (or remove /tools from nav), Box45Calculator cross-link on /help, OG images, favicon, flat-fee sweep, aesthetic pass. Advisory Board outreach begins |
| **Apr 1-4** | Soft launch | Share with 50+ contacts, Stakeholder Overview to select advisors |

**What gets deferred:** Navigator MVP, Advisory Board confirmation, full aesthetic overhaul.

### Option 3: Phase 2 Public Launch — Target: May 1 (~7 weeks)

Full launch with a functional product and named advisors.

| Period | Focus | Items |
|--------|-------|-------|
| **Mar 11-23** | Foundation (same as Option 1) | All critical fixes + blog editorial pass |
| **Mar 24 - Apr 7** | Content + outreach | Full blog corpus (12+ posts), Advisory Board outreach, Stakeholder Overview finalized and sent |
| **Apr 7-21** | Product build | Navigator MVP (guided intake → assessment), lawyer network intake form, RenterShield linked from site |
| **Apr 21-30** | Polish + QA | Full aesthetic pass, SEO, OG images, mobile QA, Advisory Board page with first confirmations |
| **May 1** | Public launch | LinkedIn announcement, press outreach, full marketing push |

---

## 7. IMMEDIATE ACTIONS (No decisions needed — just debt cleanup)

These should happen regardless of which timeline option is chosen:

| # | Action | Effort | Dependency |
|---|--------|--------|------------|
| 1 | **Rotate GitHub PAT** | 5 min | None — just do it |
| 2 | **Git commit all deployed changes** | 10 min | After PAT rotation |
| 3 | **Fix or remove email capture** | 1-2 hours | None |
| 4 | **Set up analytics** (Plausible or Fathom) | 30 min | None |
| 5 | **npm audit fix** | 15 min | None |
| 6 | **Flat-fee content sweep** across all pages | 30 min | None |

**Total: ~3 hours of unblocked work.**

---

## 8. DECISIONS NEEDED FROM MICHAEL

Before the plan can move forward:

1. **Which timeline option?** (1, 2, or 3 — or a hybrid)
2. **Blog tone:** What voice do you want? The current AI-generated tone was flagged as "smartass, immature." Should posts be rewritten? What's the target voice? (e.g., "professional and restrained, like the Stakeholder Overview" or "conversational but serious")
3. **Lawyer products:** Option A (waitlist), B (directory placeholder), or C (remove /tools from nav)?
4. **Consumer products:** Option A (Navigator MVP), B (link Box45Calculator), C (waitlist), or D (defer)?
5. **Advisory Board candidates:** Who are you thinking of? PAI can draft outreach materials but cannot contact them (Rule 3).

---

## 9. ANTI-CRITERIA

- No flat-fee service references remain in this plan (archived per March 10 decision)
- No products invented beyond what's described in existing architecture docs
- No timelines locked — options presented per Rule 7
- No items removed from original plan — all audited and status-updated in Section 2
- Stakeholder Overview claims not shared until they match reality
