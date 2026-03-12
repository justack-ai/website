# Bail Hearing Cheat Sheet — Product Scope

**Product:** Bail Hearing Cheat Sheet
**Platform:** justack.ai
**Status:** Scoping
**Date:** 2026-03-11
**Author:** Michael Bryant / PAI

---

## 1. Executive Summary

The Bail Hearing Cheat Sheet is a lawyer-facing tool that takes a small number of inputs about a bail hearing (charge type, criminal history, bail plan details) and renders a structured scaffold of arguments, relevant law, suggested conditions, and Crown rebuttals. It targets two user segments: (1) private counsel who handle bail hearings infrequently and need a quick refresher, and (2) duty counsel managing high-volume bail courts who need a rapid headstart.

This is not an AI product. The combinatorial space of bail arguments is finite and enumerable. A well-designed decision tree with curated legal content will be more reliable, more trustworthy, and cheaper to maintain than an LLM generating bail arguments. The tool scaffolds — the lawyer adapts.

---

## 2. Canadian Bail Law — Legal Foundation

### 2.1 Statutory Framework

**Criminal Code, Part XVI — Compelling Appearance / Interim Release (ss. 493–524)**

The bail regime is governed primarily by **s. 515**, which sets out the framework for judicial interim release. Key provisions:

| Section | Content |
|---------|---------|
| **s. 493** | Definitions — "judge," "justice," "officer in charge" |
| **s. 493.1** | **Principle of restraint** — release at earliest opportunity, on least onerous conditions (codified by Bill C-75) |
| **s. 493.2** | **Particular attention to Indigenous accused and vulnerable populations** (codified by Bill C-75) |
| **s. 515(1)** | Default: justice SHALL order release on undertaking without conditions unless Crown shows cause |
| **s. 515(2)** | Forms of release (the "ladder") — (a) undertaking without conditions → (e) recognizance with surety and deposit |
| **s. 515(3)** | Power to impose conditions on undertaking/recognizance |
| **s. 515(4)** | Conditions must relate to ensuring attendance, public safety, or confidence in the administration of justice |
| **s. 515(5)** | Detention order — if no conditions can satisfy the grounds |
| **s. 515(6)** | **Reverse onus** — accused must show cause for specific offences |
| **s. 515(10)** | **Grounds for detention** — (a) primary, (b) secondary, (c) tertiary |
| **s. 515(12)** | Variation of release orders |
| **s. 519** | Release on bail pending review |
| **s. 520/521** | Review of detention/release orders (by superior court) |
| **s. 522** | Bail for s. 469 offences (murder) — heard by superior court judge |
| **s. 524** | Arrest and detention of accused who breaches conditions |

### 2.2 The Three Grounds for Detention — s. 515(10)

**Primary Ground — s. 515(10)(a):** Detention is necessary to ensure the accused's attendance in court.

- Flight risk assessment
- Factors: ties to community, family, employment, prior failures to appear, severity of potential sentence, citizenship/immigration status
- This is the most commonly argued and most commonly overcome ground

**Secondary Ground — s. 515(10)(b):** Detention is necessary for the protection or safety of the public, including any victim of or witness to the offence, or any person under the age of 18, having regard to all the circumstances including any substantial likelihood that the accused will, if released, commit a criminal offence or interfere with the administration of justice.

- Public safety assessment
- Factors: criminal record (especially for violence, weapons, similar offences), nature and seriousness of the charge, prior breaches of court orders, escalating pattern, relationship between accused and victim, substance abuse, mental health
- Often the most contested ground

**Tertiary Ground — s. 515(10)(c):** Detention is necessary to maintain confidence in the administration of justice, having regard to all the circumstances, including:
- (i) the apparent strength of the prosecution's case
- (ii) the gravity of the offence
- (iii) the circumstances surrounding the commission of the offence, including whether a firearm was used
- (iv) the fact that the accused is liable, on conviction, for a potentially lengthy term of imprisonment or, in the case of an offence that involves a firearm, a minimum punishment of imprisonment for a term of three years or more

- The "catch-all" ground — narrowly applied after *St-Cloud*
- Not a substitute for primary/secondary when those are weak
- Should be used only in the "strongest cases" per *Antic*

### 2.3 Reverse Onus Situations — s. 515(6)

When reverse onus applies, the **accused** bears the burden of showing why detention is not justified. The onus shifts from the Crown to defence.

| Trigger | Statutory Reference | Practical Note |
|---------|-------------------|----------------|
| **s. 469 offence (murder, treason)** | s. 522 (superior court bail) | Heard by Superior Court judge, not JP |
| **Indictable offence while already on bail** | s. 515(6)(a)(i) | Very common — "bail on bail" |
| **Indictable offence while on probation** | s. 515(6)(a)(i) | |
| **Indictable offence while on parole** | s. 515(6)(a)(i) | |
| **Indictable offence while subject to conditional sentence** | s. 515(6)(a)(i) | |
| **Offence under s. 467.11, 467.111, 467.12, or 467.13** | s. 515(6)(a)(ii) | Criminal organization offences |
| **Terrorism offence (Part II.1)** | s. 515(6)(a)(iii) | |
| **Offence under s. 99, 100, or 103** | s. 515(6)(a)(iv) | Weapons trafficking/smuggling |
| **Offence with firearm/weapon + connection to criminal org** | s. 515(6)(a)(v) | |
| **Serious offence (as defined) while not ordinarily resident in Canada** | s. 515(6)(a)(vi) | |
| **Drug offences — trafficking, importing, production (CDSA s. 5(3), 6(3), 7(2))** | s. 515(6)(a)(vii) | Import/export, production — not simple possession |
| **Firearms offences — ss. 95, 96, 102, 103** | s. 515(6)(a)(viii) | Unauthorized possession, trafficking |
| **Breach of s. 515(12) conditions** | s. 515(6)(b) | Alleged breach of existing bail conditions |
| **IPV reverse onus (Bill C-48)** | s. 515(6)(b.1) | Accused previously convicted of violence against intimate partner + current charge involves violence against intimate partner |
| **Repeat violent offence with weapon (Bill C-48)** | s. 515(6)(b.2) | Charged with violent offence involving weapon + prior conviction for violent offence with weapon |

### 2.4 Key Case Law

#### R v Antic, 2017 SCC 27

**Holding:** Established the "ladder principle" — release conditions must be the least onerous necessary. The justice must start at the bottom of the ladder (unconditional release) and justify each step up.

**The Antic Ladder:**
1. Unconditional release on undertaking (s. 515(1))
2. Undertaking with conditions (s. 515(2)(a))
3. Recognizance without surety, without deposit (s. 515(2)(b))
4. Recognizance without surety, with deposit (s. 515(2)(c))
5. Recognizance with surety, without deposit (s. 515(2)(d))
6. Recognizance with surety and deposit (s. 515(2)(e))
7. If the accused is not ordinarily resident in the province — recognizance with deposit of cash or other valuable security (s. 515(2)(e.1))
8. Detention order (s. 515(5))

**Practical impact:** Justices cannot skip rungs. If they jump from unconditional release to a surety requirement, they must explain why lesser conditions are inadequate. Defence counsel should explicitly walk the ladder in submissions.

**Also from Antic:** The tertiary ground should be applied only in the "strongest cases" — it is not a residual catch-all.

#### R v Zora, 2020 SCC 14

**Holding:** Bail conditions must be (1) clearly articulated, (2) minimal in number, (3) necessary and linked to the statutory grounds, (4) reasonable and proportionate, (5) least onerous in the circumstances, (6) tailored to the individual's specific risks, (7) respectful of Charter values, and (8) reasonably capable of being performed by the particular accused. Also established that breach of bail conditions (s. 145(3)) requires subjective mens rea.

**Practical impact:**
- Conditions like "abstain from alcohol" require a nexus to the offence or risk
- "Keep the peace and be of good behaviour" is flagged as potentially too onerous — it effectively criminalizes any breach of any statute
- Conditions that criminalize symptoms of mental illness or addiction are problematic
- Boilerplate conditions (same standard list on every accused) are no longer defensible
- Each condition must independently satisfy the nexus test
- Defence counsel should challenge each proposed condition individually

#### R v St-Cloud, 2015 SCC 27

**Holding:** Clarified the tertiary ground (s. 515(10)(c)). The test is not whether public safety is at risk but whether a reasonable, informed member of the public would lose confidence in the justice system if the accused were released. All four factors must be considered; the list is not exhaustive but the factors guide the analysis.

**Practical impact:**
- Strength of the Crown's case is a factor — weak cases undercut the tertiary ground
- The "hypothetical reasonable person" is informed about the facts, the law, and the principle of innocence
- Defence can argue: the reasonable person understands that pre-trial detention is the exception

#### Other Important Cases

- **R v Hall, 2002 SCC 64:** Upheld constitutionality of the tertiary ground (s. 515(10)(c)) under Charter ss. 7 and 11(e) — maintaining public confidence in the justice system is a valid basis for detention
- **R v Morales, [1992] 3 SCR 711:** Struck down the vague "public interest" detention ground — led to Parliament enacting the more precise tertiary ground upheld in Hall
- **R v Myers, 2019 SCC 18:** Automatic right to detention review after 30 days (summary) or 90 days (indictable) — no special showing required, only passage of time
- **R v Tunney, 2018 ONCA 565:** Indigenous accused — Gladue factors must be considered at bail

### 2.5 Bill C-75 (2019) — Bail Reform

**Key changes:**
- **Codified the principle of restraint** (s. 493.1) — release at earliest reasonable opportunity, on least onerous conditions
- **Added s. 493.2** — particular attention to circumstances of Indigenous accused, and accused who belong to vulnerable populations overrepresented in the criminal justice system
- **Expanded police release powers** (s. 496–498) — officers can release on more types of conditions without requiring a bail hearing
- **Imposed positive obligation on justices** to consider the accused's circumstances when setting conditions
- **Added s. 515(2.03)** — conditions must not be imposed to change the social condition of the accused (e.g., cannot impose a curfew to "straighten out" the accused's lifestyle)

**Policy rationale:** Address the crisis of over-incarceration on remand. By 2018, more than 60% of people in provincial/territorial custody were on remand (unsentenced). Indigenous people disproportionately affected.

### 2.6 Bill C-48 (2023) — Bail Tightening

**Key changes:**
- **New reverse onus for intimate partner violence** (s. 515(6)(b.1)) — accused previously convicted of IPV and currently charged with IPV must show cause
- **New reverse onus for repeat violent offences with weapons** (s. 515(6)(b.2))
- **Expanded consideration of community safety** — added "safety of the community" language to detention considerations
- **Required consideration of accused's history** — violence, weapons, breaches must be considered

**Political context:** Introduced in response to high-profile violent incidents involving accused persons released on bail. Significant pressure from law enforcement and provincial premiers (especially Ontario, BC). Defence bar and CCLA criticized the bill as reactive, disproportionate, and likely to worsen Indigenous over-representation. CCLA argued certain provisions may violate Charter ss. 7, 9, and 11(e).

**Practical impact for the tool:** The IPV and weapons reverse onus provisions are now among the most commonly triggered reverse onus situations in practice. The tool must identify these triggers from the input variables.

---

## 3. Input Variables

### Design Principle
Minimum viable input for maximum useful output. The lawyer should be able to complete the form in under 2 minutes. Every field must change the output — no decorative fields.

### Input Fields (8 fields)

| # | Field | Type | Options/Format | Why This Changes the Output |
|---|-------|------|----------------|----------------------------|
| 1 | **Most Serious Charge** | Dropdown | Categories: Assault/Assault with Weapon/Aggravated Assault, Sexual Assault, Robbery, Drug Trafficking/Production/Import, Firearms (Unauthorized Possession/Trafficking), Break & Enter (Dwelling), Fraud Over $5k, Impaired Driving (Causing Bodily Harm/Death), Murder/Manslaughter, Uttering Threats, Criminal Harassment, Breach of Court Order, Other Indictable, Other Hybrid, Summary | Determines which grounds Crown will emphasize, triggers reverse onus, sets the ladder starting point |
| 2 | **Intimate Partner Violence?** | Toggle | Yes / No | Triggers IPV-specific considerations, potential reverse onus under C-48, no-contact conditions |
| 3 | **Criminal Record** | Multi-select | No record / Unrelated record / Related prior convictions / Prior violent convictions / Prior weapons convictions / Prior failures to comply | Determines secondary ground strength, may trigger reverse onus (bail-on-bail, C-48 weapons) |
| 4 | **Currently on Release?** | Toggle | Yes (bail, probation, conditional sentence, parole) / No | Triggers reverse onus (s. 515(6)(a)(i)) — most common reverse onus trigger |
| 5 | **Surety Available?** | Radio | Yes — strong (family, employed, aware of charges) / Yes — available but weak / No surety / Not needed (expect release without surety) | Determines ladder position, bail plan strength |
| 6 | **Accused's Community Ties** | Multi-select | Employed / Student / Family in jurisdiction / Stable housing / Born in Canada-PR / Foreign national-no PR / No fixed address | Drives primary ground (flight risk) analysis |
| 7 | **Substance Abuse Relevant?** | Toggle | Yes / No | Triggers treatment condition suggestions, addresses secondary ground |
| 8 | **Jurisdiction** | Dropdown | Ontario / British Columbia / Alberta / Quebec / Other | Province-specific bail programs (e.g., Toronto Bail Program, John Howard Society BC) |

### Fields Deliberately Excluded
- **Accused name** — not needed for legal analysis, raises privacy concerns
- **Date** — the tool always reflects current law
- **Specific Criminal Code section** — too granular; charge categories suffice for argument scaffolding
- **Victim details** — captured implicitly by IPV toggle and charge type
- **Judge/JP identity** — outside scope of a legal argument tool

---

## 4. Output Structure

The output is a **one-page scannable scaffold** organized into sections the lawyer can glance at and adapt. Not prose — structured bullets with emphasis markers.

### Output Sections

1. **Situation Assessment** (auto-generated header)
   - Reverse onus? Yes/No + statutory reference
   - Which grounds Crown will likely argue
   - Overall difficulty rating: Straightforward / Moderate / Challenging

2. **Primary Ground (Flight Risk) — Your Arguments**
   - Bullet points tailored to the input (e.g., "Employed — argue community ties reduce flight risk")
   - Case citation if applicable
   - "Crown will likely argue: [anticipated argument]"
   - "Your rebuttal: [suggested response]"

3. **Secondary Ground (Public Safety) — Your Arguments**
   - Same structure as primary
   - Tailored to criminal record and charge type
   - Specific rebuttal to prior record arguments

4. **Tertiary Ground (Confidence in Justice System)**
   - Only shown if charge severity triggers it (serious violent offences, firearms, etc.)
   - St-Cloud factors applied to this scenario
   - "The reasonable person also knows: [principle of innocence, presumption of release]"

5. **Reverse Onus Section** (only if triggered)
   - Which reverse onus applies + statutory reference
   - "The accused must show cause. Frame your argument as: [template]"
   - Burden-shifting language suggestions

6. **Bail Plan — Suggested Conditions**
   - Ladder position recommendation based on inputs
   - Suggested conditions with nexus to the grounds (Zora-compliant)
   - Conditions to resist (overly broad conditions the Crown may seek)

7. **Key Citations**
   - 3-5 case citations relevant to this scenario
   - One-line holding for each
   - Antic ladder, Zora conditions, St-Cloud tertiary (as applicable)

8. **Bail Program Referral** (if available in jurisdiction)
   - Toronto Bail Program, John Howard Society, Elizabeth Fry, etc.
   - Contact/referral process

---

## 5. Sample Input/Output Mockup

### Sample Input

| Field | Value |
|-------|-------|
| Most Serious Charge | Assault with Weapon |
| Intimate Partner Violence? | Yes |
| Criminal Record | Prior violent convictions |
| Currently on Release? | Yes (probation) |
| Surety Available? | Yes — strong (mother, employed, aware of charges) |
| Community Ties | Employed, Family in jurisdiction, Stable housing |
| Substance Abuse Relevant? | Yes |
| Jurisdiction | Ontario |

### Sample Output

---

> **BAIL HEARING CHEAT SHEET**
>
> **Charge:** Assault with Weapon (s. 267(a)) — Intimate Partner Violence
>
> ---
>
> **SITUATION ASSESSMENT**
> - **REVERSE ONUS APPLIES** — Two triggers:
>   - s. 515(6)(a)(i): Indictable offence while on probation
>   - s. 515(6)(b.1): Prior IPV conviction + current IPV charge (Bill C-48)
> - **Burden is on the accused** to show why detention is not justified
> - Crown will argue: Primary, Secondary, and likely Tertiary grounds
> - **Difficulty: Challenging** — double reverse onus, IPV, prior violence
>
> ---
>
> **PRIMARY GROUND — FLIGHT RISK**
>
> Your arguments:
> - Accused is employed — has reason to remain in the jurisdiction
> - Family in jurisdiction (mother proposed as surety) — community ties
> - Stable housing — not transient
> - "The accused has every reason to attend court and no history of flight"
>
> Crown will likely argue:
> - Severity of potential sentence creates incentive to flee
> - Prior record suggests disregard for court processes
>
> Your rebuttal:
> - "Severity of sentence is speculative — the accused is presumed innocent"
> - If no prior FTAs: "The accused has always attended court as required"
> - Per *Antic* at para 67: flight risk must be assessed on the specific circumstances, not the charge alone
>
> ---
>
> **SECONDARY GROUND — PUBLIC SAFETY**
>
> Your arguments:
> - Strong surety (mother) who can supervise and enforce conditions
> - Accused willing to attend substance abuse treatment — addresses root cause
> - Proposed no-contact condition with complainant eliminates specific risk
> - Proposed residential condition with surety ensures supervision
> - "The risk can be managed in the community with appropriate conditions"
>
> Crown will likely argue:
> - Prior violent convictions show pattern of dangerousness
> - Offence committed on probation shows prior conditions insufficient
> - IPV context — escalation risk, victim vulnerability
>
> Your rebuttal:
> - "Prior conditions did not include a surety or treatment — this plan is qualitatively different"
> - "The accused is now prepared to address substance abuse, which is the underlying factor"
> - Per *Zora* at para 89: conditions must be capable of compliance — the proposed plan is realistic
>
> ---
>
> **TERTIARY GROUND — PUBLIC CONFIDENCE**
>
> Crown may argue this ground given the IPV context and prior record.
>
> Your arguments (*St-Cloud* factors):
> - (i) Strength of Crown's case — [assess based on disclosure — note if weak]
> - (ii) Gravity — assault with weapon is serious but not most serious
> - (iii) Circumstances — [address specific facts]
> - (iv) Potential sentence — range for s. 267(a) is wide; accused not facing maximum
> - "A reasonable, informed member of the public understands that pre-trial detention is the exception, not the rule — *Antic* at para 67"
> - "Confidence in justice is maintained by RELEASING on appropriate conditions, not by detaining"
>
> ---
>
> **REVERSE ONUS — YOUR FRAMEWORK**
>
> The accused bears the burden. Frame your submissions as:
>
> 1. "The accused acknowledges the reverse onus and will show cause"
> 2. Address each ground the Crown relies on
> 3. Present the bail plan as the answer to each concern
> 4. "Detention is not justified because the bail plan adequately addresses [each ground]"
>
> Key citation: *R v Antic*, 2017 SCC 27 at para 67 — even under reverse onus, the ladder principle applies. The justice must consider less restrictive forms of release before ordering detention.
>
> ---
>
> **BAIL PLAN — SUGGESTED CONDITIONS**
>
> Ladder position: **Recognizance with surety** (rung 5 of Antic ladder)
>
> Suggested conditions (each linked to a ground — *Zora*-compliant):
> - Reside with surety (mother) at [address] — supervision, stability (secondary)
> - No contact directly or indirectly with complainant — victim safety (secondary)
> - No attendance at [complainant's address/workplace] — victim safety (secondary)
> - Report to bail supervision as directed — monitoring (primary)
> - Abstain from alcohol and non-prescription drugs — nexus to offence (secondary)
> - Attend and complete substance abuse assessment/treatment — addresses root cause (secondary)
> - Surrender passport — flight risk (primary)
> - Curfew 10pm–6am except for work — supervision (primary/secondary)
>
> Conditions to RESIST if Crown proposes:
> - Blanket internet/phone ban — no nexus to assault charge (*Zora*)
> - House arrest — disproportionate at this stage (*Antic* ladder)
> - GPS monitoring — should be reserved for higher rungs (*Antic*)
>
> ---
>
> **KEY CITATIONS**
>
> | Case | Holding | Use For |
> |------|---------|---------|
> | *R v Antic*, 2017 SCC 27 | Ladder principle — least restrictive conditions; tertiary ground only in strongest cases | Resisting over-conditions, arguing for lower rung |
> | *R v Zora*, 2020 SCC 14 | Conditions must have nexus to risk, be capable of compliance, not unduly restrictive | Challenging Crown's proposed conditions |
> | *R v St-Cloud*, 2015 SCC 27 | Tertiary ground — reasonable informed person test; all four factors must be weighed | Rebutting tertiary ground arguments |
> | s. 493.1 (Bill C-75) | Principle of restraint — release at earliest opportunity on least onerous conditions | Framing all submissions |
>
> ---
>
> **BAIL PROGRAM REFERRAL**
>
> **Toronto Bail Program** (if in Toronto)
> - Provides bail supervision, verification, and support
> - Can strengthen bail plan — "supervised release through an established program"
> - Contact through duty counsel office or direct referral
>
> **John Howard Society of Ontario** — bail support and verification services

---

## 6. Technical Scope

### 6.1 Recommendation: Static Next.js Page with Client-Side Logic

**This does NOT need AI.** The argument space is finite:
- ~15 charge categories × 6 criminal history options × 2 IPV states × 2 on-release states = ~360 combinations
- Each combination maps to a deterministic set of: reverse onus triggers, relevant grounds, argument templates, condition suggestions, case citations
- This is a decision tree, not a generative problem

**Architecture:**
- Single Next.js page at `/tools/bail-cheat-sheet`
- Client-side TypeScript logic (no API calls, no backend, no database)
- Form component → processing function → rendered output component
- All legal content stored as structured TypeScript constants (not markdown, not a CMS)
- Print-friendly CSS for courtroom use

**Why not AI?**
- Hallucination risk is unacceptable in criminal law
- Deterministic output builds lawyer trust — same inputs always produce same output
- No API costs, no latency, no rate limits
- Easier to audit and maintain — content is in code, changes are PRs
- No data privacy concerns — nothing leaves the browser

### 6.2 Complexity Estimate: Medium (1 week)

| Component | Estimate |
|-----------|----------|
| Legal content authoring (argument templates, conditions, citations) | 2-3 days |
| Input form UI | 0.5 day |
| Decision tree logic | 1 day |
| Output rendering + print CSS | 1 day |
| Testing + review by a criminal lawyer | 1 day |
| **Total** | **5-6 working days** |

### 6.3 Codebase Placement

```
src/
  app/(site)/tools/
    bail-cheat-sheet/
      page.tsx              # Main page component
      components/
        BailForm.tsx        # Input form
        CheatSheet.tsx      # Output renderer
      lib/
        bail-logic.ts       # Decision tree + reverse onus detection
        bail-content.ts     # All legal content (argument templates, conditions, citations)
        bail-types.ts       # TypeScript types for inputs/outputs
```

**Navigation:** Add to the `/tools` section (currently "For Lawyers"). The bail cheat sheet would be the first concrete tool in that section.

**Note:** The current `/tools` page excludes criminal law from the lawyer network practice areas. The bail cheat sheet is a standalone tool, not a lawyer network feature — it doesn't require changing the practice area scope.

---

## 7. Legal and Ethical Considerations

### 7.1 Unauthorized Practice of Law (UPL)

**Risk: LOW.** This tool is designed exclusively for licensed lawyers. Key mitigants:

- **Audience:** The tool assumes the user is a lawyer. The interface, language, and content presuppose legal training. A non-lawyer would not know how to use it effectively.
- **Nature of output:** The tool provides a scaffold, not advice. It does not tell the lawyer what to argue — it reminds them what arguments exist for this fact pattern. Analogous to a legal textbook or a CLE checklist.
- **No client-specific advice:** The tool does not know the client's name, the specific facts of the case, or the strength of the evidence. The lawyer applies professional judgment to adapt the scaffold.
- **Precedent:** Legal research tools (Westlaw, CanLII, Lexis) provide case law and analysis to lawyers without UPL concerns. Practice-area checklists and argument templates are standard professional tools.

### 7.2 Disclaimer Requirements

Every output must include:

```
DISCLAIMER: This tool provides a general framework for bail hearing preparation
based on the Criminal Code of Canada and relevant case law as of [date]. It is
designed for use by licensed lawyers only and does not constitute legal advice.
The lawyer is responsible for verifying the current state of the law, assessing
the specific facts of each case, and exercising independent professional judgment.
This tool does not replace legal research or professional competence.

Last legal content update: [date]
```

Additional UI-level notices:
- Gate the tool behind a "I am a licensed lawyer" acknowledgment (not authentication — just a friction point)
- Display the "last updated" date prominently so lawyers can assess currency

### 7.3 Currency and Maintenance

**This is the biggest ongoing risk.** Bail law changes through legislation, appellate decisions, and practice directions.

**Maintenance strategy:**
- **Legal content version date** displayed on every output
- **Quarterly review cycle** — review legislative changes, new SCC/appellate decisions
- **Change triggers** — set up alerts for:
  - New Criminal Code amendments affecting Part XVI
  - SCC bail decisions (CanLII alerts)
  - Provincial bail program changes
- **Content in code** — legal content lives in `bail-content.ts`, not a database. Changes go through code review (PR), ensuring a lawyer reviews before deployment.
- **Git blame** — every content change is attributable and reversible

**Known upcoming risks:**
- Further bail reform legislation is always possible given the political salience of bail
- Provincial variations in bail programs and practices may require jurisdiction-specific content
- Case law evolves — new appellate decisions may refine or extend Antic/Zora/St-Cloud

---

## 8. Go-to-Market Considerations

### 8.1 Target Users

| Segment | Need | How They Find Us |
|---------|------|-----------------|
| **Duty counsel** | Speed — 5-15 minutes between hearings | Legal Aid Ontario / LAO internal distribution, word of mouth |
| **Private criminal counsel (occasional)** | Refresh — haven't done a bail hearing in months | Google "bail hearing checklist Canada", justack.ai content marketing |
| **Articling students / junior lawyers** | Learning — first bail hearings | Law school distribution, CLE referrals |

### 8.2 Distribution Strategy

- Free tool — no paywall, no login required (just the lawyer acknowledgment)
- SEO-optimized for "Canadian bail hearing checklist," "bail hearing arguments Canada," "s. 515 bail cheat sheet"
- Share to criminal law listservs and associations (Criminal Lawyers' Association, Defence Counsel Association of Ottawa, etc.)
- This is a **lead generation tool** for justack.ai — demonstrates competence, builds email list, creates awareness for future products

### 8.3 Success Metrics

- Unique users per month
- Email captures from the page
- Print-to-screen ratio (if trackable — high print rate = lawyers using it in court)
- Repeat usage (same user returning for different hearings)

---

## 9. Open Questions for Decision

1. **Lawyer acknowledgment gate:** Simple checkbox ("I am a licensed lawyer") or more formal? A checkbox creates minimal friction; anything more reduces adoption.

2. **Print optimization:** Should the output be optimized for printing? Duty counsel often work from paper in bail court. Recommend yes — clean, single-page print layout.

3. **Feedback mechanism:** Should there be a way for lawyers to flag errors or suggest improvements? Recommend a simple "Report an issue" mailto link.

4. **Scope of charge categories:** The proposed 15 categories cover ~90% of bail hearings. Should we add more specific categories (e.g., child pornography, human trafficking) in v2?

5. **Provincial variations:** v1 covers Ontario and BC. Should Alberta be in v1 or v2? Bail programs differ by province but core law (Criminal Code) is federal.

6. **Criminal law in the lawyer network:** The current `/tools` page excludes criminal law. Does this tool signal a strategic shift, or is it a standalone product separate from the lawyer network?

7. **Bill C-48 sub-paragraph verification:** The reverse onus provisions added by Bill C-48 are referenced as s. 515(6)(b.1) (IPV) and s. 515(6)(b.2) (repeat weapons violence). **Before build:** verify exact sub-paragraph designations against the official Justice Laws website (laws-lois.justice.gc.ca). The SCC neutral citation system predates C-48; the paragraph letters used here are based on the bill as passed but should be confirmed in the current consolidated Criminal Code.

---

## 10. Recommended Next Steps

1. **Legal content review** — Have a practising criminal lawyer review this scope document for accuracy
2. **User interviews** — Talk to 2-3 duty counsel and 2-3 private criminal lawyers to validate the input/output design
3. **Build v1** — Static Next.js implementation (~1 week)
4. **Soft launch** — Share with criminal law contacts for feedback
5. **Iterate** — Refine based on lawyer feedback before broader distribution
