# Missing the Mark — Published Formulas

**Spec v1.0 · 2026-04-17**

The Borovoy Coefficient uses a three-tier analytical progression — **Missing the Mark, Literally** (MTM-L), **Missing the Mark, Figuratively** (MTM-F), **Missing the Mark, Circumstantially** (MTM-C) — mirroring the common-law progression from plain-meaning reading → purposive / Charter-test reading → full contextual reading with facts.

Each tier publishes **its own formula**. The math is open. Any reader can reproduce a score from the inputs, or contest a specific cell, rather than contesting a black-box composite.

---

## Tier 1 — MTM-Literal

**Live in v1.0.**

### What it asks
Does the text of the statute, read on its face, accomplish what its preamble says it is for?

### Inputs (all textual, no case law)
- `P = {p₁, p₂, …, pₘ}` — discrete purpose claims extracted verbatim from the preamble, purpose clause, or short title of the statute
- `S = {s₁, s₂, …, sₙ}` — operative provisions of the statute (sections creating offences, duties, powers, rights). Excludes definitions, interpretation, coming-into-force, transitional provisions, amendments to other Acts, administrative schedules
- `serves(sⱼ, pᵢ) ∈ {0, 1}` — does provision `sⱼ` plausibly advance purpose `pᵢ` on a plain textual reading?

### Intermediate quantities

**Faithfulness** — fraction of stated purposes that at least one provision advances:

```
F = (1/m) · Σᵢ 𝟙[ ∃j : serves(sⱼ, pᵢ) = 1 ]
```

**Excess** — fraction of operative provisions that advance no stated purpose:

```
X = (1/n) · Σⱼ 𝟙[ ∀i : serves(sⱼ, pᵢ) = 0 ]
```

### The published formula

```
MTM-L = 100 · [ α · (1 − F) + β · X ]     with α + β = 1
```

**Default weights:** α = 0.5, β = 0.5 (equal weight on under-delivery of stated purposes and over-reach beyond them).

**Output range:** `0` (literal alignment — statute's operative text faithfully implements and does not exceed its stated purpose) → `100` (statute's operative text bears no resemblance to its stated purpose on face).

### What MTM-L is measuring

Facial / textual alignment between drafted purpose and drafted operation. Nothing more. A statute with MTM-L = 0 may still be grossly misaligned in performance — the tier does not ask that question. That is MTM-F and MTM-C work.

### Worked example — *Access to Information Act*, RSC 1985, c A-1

**P (purposes):**
- p₁ = "To extend the present laws of Canada to provide a right of access to information in records under the control of a government institution."

m = 1.

**S (operative provisions, extracted from training data):**
- s₁ = `s. 4(1)` — right of access for Canadian citizens and permanent residents
- s₂ = `s. 7` — 30-day response obligation on head of government institution
- s₃ = `s. 41(1)` — complaint right to Information Commissioner on refused access

n = 3.

**serves matrix:**

| | p₁ |
|---|---|
| s₁ | 1 |
| s₂ | 1 |
| s₃ | 1 |

**Computation:**
- Purposes served by ≥1 provision = 1/1 → F = 1.0000
- Provisions serving no purpose = 0/3 → X = 0.0000
- MTM-L = 100 · [0.5 · (1 − 1.0000) + 0.5 · 0.0000] = **0.00**

**Interpretation:** On its face, the Access to Information Act's operative provisions faithfully advance its stated access purpose without any provisions exceeding that purpose. The law is **literally aligned**. Its well-documented performance problems (delayed / redacted / refused disclosures) are enforcement-asymmetry pathologies, not textual misalignment — they belong to MTM-F / MTM-C analysis.

This is the kind of finding MTM-L is designed to produce: it isolates the text-layer question and gives a clean answer to it, leaving the performance question to higher tiers.

---

## Tier 2 — MTM-Figurative *(coming soon, v1.1)*

### What it asks
Does the statute establish a Charter *violation* on its face? The inquiry has two sequential stages, following the *R v Big M Drug Mart* analytical order: first the purpose is tested; only if the purpose survives do the effects get tested. Oakes (s.1 justification) does **not** enter at this tier — Oakes presupposes an established violation. MTM-F asks whether the violation is established, not whether it is justified.

### Two-stage structure (Big M analytical order)

**Stage 1 — Purpose validity.** Is the statute's dominant characteristic — its purpose, determined using the *Big M* purposive method (text + context + objects + legislative history; refined for criminal provisions in *R v Sharpe*, 2001 SCC 2 and *R v Khawaja*, 2012 SCC 69) — constitutionally permissible? If the purpose itself is Charter-incompatible (e.g., *Big M* on the religious purpose of the *Lord's Day Act*; *R v Morgentaler*, [1988] 1 SCR 30), the law is unconstitutional on that ground alone — effects do not need to be examined.

**Stage 2 — Effects-violation likelihood, purpose notwithstanding.** If the purpose passes Stage 1, do the effects of the statute, read on the face of the statute, infringe a Charter-protected right? This is where the "missing the mark" question lives at the purposive layer: the drafters' purpose may be valid, but the statute's operative effects may miss that mark in a way that violates rights.

### Inputs
- `P*` — purpose(s) constructed per *Big M* / *Sharpe* / *Khawaja*
- `E = {e₁, …, eᵣ}` — effects identified on the face of the statute (scope of conduct captured, rights engaged, penalties imposed, administrative powers conferred)

### Intermediate quantities, each on [0, 1]

**Stage 1:**
- `PV` — **Purpose-invalidity probability**: probability `P*` is itself Charter-incompatible on face. `0` for recognized legitimate state objectives; `1` for facially impermissible purposes; intermediate for mixed or contested purposes.

**Stage 2** — `EL` = **Effects-violation likelihood** = probability effects infringe a Charter right *given* purpose is valid, computed as:

```
EL = w₁·OB + w₂·AR + w₃·GD + w₄·RI
```

where:
- `OB` — **Overbreadth at face**: fraction of captured conduct falling outside `P*`'s proper scope (*R v Heywood*, [1994] 3 SCR 761; *Canada (AG) v Bedford*, 2013 SCC 72)
- `AR` — **Arbitrariness at face**: degree to which operative effects bear no rational connection to `P*` (*Bedford*)
- `GD` — **Gross-disproportionality at face**: severity of rights-infringing effects relative to their ostensible purpose (*Bedford*; *R v Malmo-Levine*, 2003 SCC 74)
- `RI` — **Rights-intrusion severity on face**: severity-weighted intrusion on Charter-protected conduct (ss. 2, 7, 8, 9, 11, 12, 15)

**Default weights** (all sum to 1): `w₁ = 0.30, w₂ = 0.20, w₃ = 0.20, w₄ = 0.30`.

### The published formula

```
MTM-F = 100 · [ PV + (1 − PV) · EL ]
```

**Interpretation of the composition.** The formula expresses the probability that the statute establishes a Charter violation on its face, under the law of total probability:

```
Pr[violation] = Pr[purpose invalid] + Pr[purpose valid] · Pr[effects invalid | purpose valid]
              = PV         +  (1 − PV)    ·  EL
```

- When `PV = 1` (purpose is Charter-incompatible), `MTM-F = 100` regardless of effects — a *Big M*-style strike is established at Stage 1.
- When `PV = 0` (purpose is a valid state objective), `MTM-F = 100 · EL` — Stage 1 is clean and the score is driven entirely by the effects analysis at Stage 2.
- Intermediate `PV` values produce a blended score.

### What MTM-F is NOT

MTM-F is not an Oakes analysis. Oakes asks whether an established Charter violation is demonstrably justified in a free and democratic society under s.1. That analysis requires adjudicative and legislative facts (pressing-and-substantial objective evidence, minimal-impairment comparator data, proportionality context) and therefore belongs to **MTM-Circumstantial**, not MTM-Figurative.

**Output range:** `0` (no Charter violation established on face) → `100` (Charter violation established at Stage 1 or Stage 2 on face).

*Tier 2 scoring is not live in v1.0. Formula published so the methodology is transparent before the tool is built.*

---

## Tier 3 — MTM-Circumstantial *(coming later, v1.2+)*

### What it asks
MTM-F plus adjudicative and legislative facts: does the statute survive full Oakes contextual analysis with social-science evidence, enforcement data, and disparate-impact findings entered?

### Inputs (beyond MTM-F)
- Adjudicative facts: documented enforcement patterns, disparate-impact studies, operational data
- Legislative facts: social-science evidence on the policy the statute implements (*Reference re Firearms Act*, 2000 SCC 31; *R v Bryan*, 2007 SCC 12)
- Comparator regimes: cross-jurisdictional performance data where available

### Formula (provisional)

```
MTM-C = 100 · [ γ₁·MTM-F/100 + γ₂·DI + γ₃·EF ]     with γ₁ + γ₂ + γ₃ = 1

where:
  DI = Disparate Impact component, [0,1], based on documented s.15 / s.7 asymmetry evidence
  EF = Enforcement Failure component, [0,1], based on observed enforcement data vs stated objective
  default: γ₁ = 0.50, γ₂ = 0.30, γ₃ = 0.20
```

**Output:** probability statute will fail full Oakes contextual analysis. Intended as the tier most closely aligned with actual judicial-outcome prediction.

*Tier 3 is v1.2+ work. Math published here for transparency and invitation to peer critique.*

---

## Calibration protocol

The published formulas are **priors**. The weights (`α, β` for MTM-L; `w₁…w₄` for MTM-F; `γ₁…γ₃` for MTM-C) are **data-fittable** once a labelled corpus of statutory provisions with known judicial outcomes is scored.

### Dependent variable
**Charter-vulnerability**: probability a superior court strikes, reads down, or declares invalid the provision within N years, measured against the Canadian s.52(1) jurisprudence.

### Validation method (v1.0)
**Retrospective calibration** — score statutory provisions with already-known judicial outcomes and check whether MTM-L tracks the outcome. See `calibration/report.json` for AUC, Brier score, reliability diagram, and bootstrap 95% CI on fitted α, β.

### Outcome coding
- `struck` / `declared_invalid` → 1.0
- `read_down` → 0.5
- `upheld` / `upheld_on_appeal` → 0.0

### Fit model (MTM-L)
L2-regularized gradient descent on:
```
predicted_outcome = α · (1 − F) + β · X     with α + β = 1 (reparam: α = σ(θ))
loss = MSE + λ · θ²                         λ = 0.5 default
```
Bootstrap 95% CI via 1000 resamples.

---

## Versioning

- **v1.0** (2026-04-17) — Initial spec. MTM-L live. MTM-F, MTM-C documented but not implemented.
- Changes to formulas, weights, or outcome coding require a version bump and are logged in `SPEC_CHANGELOG.md`.

## License

All formulas and this specification are released under **Mozilla Public License 2.0**. The tool is and will remain free regardless of future ownership decisions.

## Citation

Bryant, M. (2026). *Missing the Mark: Published Formulas for the Borovoy Coefficient* (v1.0). Justack.ai.
