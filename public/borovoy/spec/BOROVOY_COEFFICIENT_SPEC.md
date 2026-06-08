# The Borovoy Coefficient — Specification v1.0

**A Civil-Liberties Measure of Legislative Alignment**

*In honour of Alfred Alan Borovoy, O.C. (1932-2015), General Counsel, Canadian Civil Liberties Association, 1968-2009.*

---

## What it is

The Borovoy Coefficient is a 0-to-100 composite measure of the gap between what a law was *meant* to do (its stated purpose) and what it *actually* does (its observed rights-respecting performance). A low coefficient signals alignment. A high coefficient signals misalignment — the civil-liberties pathology Borovoy spent fifty years diagnosing.

The doctrine it belongs to is called **Legislative Alignment** — the observation that statutes, regulations, and enforcement patterns are optimization systems subject to the same four-variant Goodhart taxonomy as machine-learning models (Manheim & Garrabrant 2018; Hennessy & Goodhart 2023), and that the failure modes Borovoy catalogued across five decades of Canadian civil-liberties work — over-breadth, proxy enforcement, power-hoarding, mesa-institutional drift — are specific instances of well-understood alignment failures.

---

## Theoretical foundation

The Borovoy Coefficient is anchored in **two parallel lineages** that turn out to describe the same phenomenon:

### The legal lineage (from Borovoy)
- *Intent vs. effect*: "There is an important distinction between intent and effect. The question we must ask is whether the language, regardless of the intent, is broad enough to cover that activity." (Borovoy, testimony on Bill C-36, 2001.)
- *The Power-Hoarding Fallacy* (Borovoy's coined term): governments seize more emergency power than the actual threat warrants.
- *Institutional drift*: "[We] never imagined they might ultimately be used against freedom of speech." (Borovoy on the human-rights commissions he helped build, ca. 2008, in the lead-up to repeal of CHRA s.13.)

### The machine-learning lineage
- *Outer alignment*: the problem of aligning a system's specified objective with the designer's actual desired goal (Hubinger et al., *Risks from Learned Optimization*, 2019).
- *Inner alignment / mesa-optimization*: the problem of aligning a learned sub-system's operative objective with the specified objective it was trained on (Hubinger et al. 2019).
- *Specification gaming*: "behaviour that satisfies the literal specification of an objective without achieving the intended outcome" (Krakovna et al., DeepMind, 2020).
- *Goodhart's Law*: "when a measure becomes a target, it ceases to be a good measure" (Strathern 1997, compressing Goodhart 1975).
- *Reward tampering*: the attractor state where an agent intervenes in the reward-provision protocol rather than achieving the proxy objective (Cohen, Hutter & Osborne 2022).

**The structural identity between the two lineages is not analogy — it is mathematics.** Hennessy & Goodhart, *Goodhart's Law and Machine Learning: A Structural Perspective* (64 *International Economic Review* 1075, 2023), prove that regulation-Goodhart and ML-Goodhart produce the same bias under the same assumptions. Any optimization process operating on a specified proxy for an underspecifiable goal — neural network, regulatory agency, or legislative drafter — is subject to the same four-variant failure taxonomy.

---

## The five dimensions

Each dimension is scored 0-100 (0 = no misalignment; 100 = maximum misalignment on this axis), and each is grounded in a recognized Canadian legal doctrine.

### D1 — Purpose-Effect Gap
**What it measures.** The divergence between a law's stated purpose (preamble, purpose clause, Hansard record, regulatory impact analysis) and its observed effect on the conduct the drafters targeted.

**Legal doctrine.** *Canada (Minister of Citizenship and Immigration) v. Vavilov*, 2019 SCC 65 — reasonableness review asks whether administrative action aligns with statutory purpose. The Vavilov framework is the living Canadian version of the outer-alignment question.

**ML analogue.** Outer alignment (Hubinger et al. 2019).

**Scoring rubric.**
- 0-19: Observed effect tracks stated purpose with minimal slippage.
- 20-39: Observed effect tracks most of purpose; some documented slippage.
- 40-59: Significant purpose-effect gap, acknowledged in scholarly/judicial record.
- 60-79: Observed effect substantially exceeds or diverges from stated purpose.
- 80-100: Law performs no discernible version of its stated purpose; functions as something else entirely.

### D2 — Proportionality
**What it measures.** Whether the law's rights-infringing effect is proportionate to its salutary objective.

**Legal doctrine.** *R. v. Oakes*, [1986] 1 SCR 103 — the Oakes test (pressing and substantial objective; rational connection; minimal impairment; balance of effects).

**ML analogue.** Pareto efficiency in multi-objective optimization.

**Scoring rubric.**
- 0-19: Oakes plainly satisfied; objective pressing, minimal impairment, balanced effects.
- 20-39: Oakes satisfied but one prong thin (usually minimal impairment).
- 40-59: Oakes contested; minimal-impairment prong fails in serious challenges.
- 60-79: Oakes-style proportionality plainly fails on one or more prongs.
- 80-100: Rights-infringing effects grossly disproportionate to the objective; law could not survive meaningful s.1 scrutiny.

### D3 — Overbreadth / Scope Creep
**What it measures.** The gap between the conduct the law captures and the conduct its drafters targeted; includes drift since enactment.

**Legal doctrine.** *R. v. Heywood*, [1994] 3 SCR 761 (overbreadth under s.7); *Canada (Attorney General) v. Bedford*, 2013 SCC 72 (arbitrariness + overbreadth + gross disproportionality as Charter s.7 principles of fundamental justice); *R. v. Nova Scotia Pharmaceutical Society*, [1992] 2 SCR 606 (void for vagueness).

**ML analogue.** Distributional shift (Amodei et al. 2016); *extremal Goodhart* (Manheim & Garrabrant 2018).

**Scoring rubric.**
- 0-19: Captures the targeted conduct; no reasonably-foreseeable overreach.
- 20-39: Captures the targeted conduct plus marginal additional conduct.
- 40-59: Captures substantially more than targeted; scholars or dissents flag overbreadth.
- 60-79: Overbreadth confirmed in case law; narrowing interpretations required.
- 80-100: Language captures conduct bearing no resemblance to the law's target (Borovoy's 2001 C-36 critique).

### D4 — Rights Intrusion
**What it measures.** The severity, duration, and reversibility of rights infringed; which Charter rights are touched; whether enforcement imposes irreparable consequences.

**Legal doctrine.** Canadian Charter of Rights and Freedoms ss. 2, 7, 8, 9, 11, 12, 15; the jurisprudence on irreparable harm (e.g., *Charkaoui v. Canada (Citizenship and Immigration)*, 2007 SCC 9).

**ML analogue.** Safety-critical systems analysis (severity × reversibility of failure).

**Scoring rubric.**
- 0-19: No Charter rights materially engaged.
- 20-39: Charter rights engaged but lightly; infringements remediable.
- 40-59: Charter rights materially infringed; remediation possible but costly.
- 60-79: Severe rights infringement (detention, deportation, criminal record, mandatory minimum).
- 80-100: Rights infringement is severe, persistent, difficult to reverse (e.g., secret-evidence regime, irrecoverable deportation, long mandatory-minimum sentences struck down in *Nur* / *Lloyd*).

### D5 — Enforcement Asymmetry
**What it measures.** Disparate impact of enforcement across groups; whether the bureaucracy administering the law has developed a revealed objective distinct from the enacted objective.

**Legal doctrine.** *R. v. Le*, 2019 SCC 34 (racial profiling in police encounters); *R. v. Khawaja*, 2012 SCC 69 (executive discretion and its limits); s.15 Charter equality; the administrative-law duty of fairness.

**ML analogue.** Inner alignment failure (Hubinger et al. 2019); mesa-optimization; reward tampering / regulatory capture (Cohen, Hutter & Osborne 2022).

**Scoring rubric.**
- 0-19: Enforcement tracks statutory language; no documented disparate impact.
- 20-39: Enforcement mostly tracks statute; minor documented asymmetries.
- 40-59: Documented disparate impact; bureaucratic practice drifts from enacted intent.
- 60-79: Severe enforcement asymmetry; the bureaucracy optimizes something different than the statute.
- 80-100: The enforcement regime is the law's primary harm; the text has become a pretext (Operation Soap bathhouse raids 1981; Freedom Convoy Emergencies Act invocation 2022).

---

## The composite coefficient

```
Borovoy Coefficient (BC) = 0.25·D1 + 0.15·D2 + 0.20·D3 + 0.25·D4 + 0.15·D5
```

**Weighting rationale.** D1 (Purpose-Effect Gap) and D4 (Rights Intrusion) are weighted heaviest because Borovoy's concern was always rights-affecting divergence from purpose. D3 (Overbreadth) is heavy because it is the most common mechanism of drift. D2 (Proportionality) and D5 (Enforcement Asymmetry) are lighter because D2 is substantially captured by D4 and D5 is harder to operationalize at the measurement stage. Weights are published in the spec, not proprietary, and may be tuned empirically as the corpus grows.

---

## Interpretation bands

| Range | Band | Meaning |
|---|---|---|
| 0 – 19 | **Aligned** | Law performs as drafters intended; rights-respecting; the Vavilov reasonableness default. |
| 20 – 39 | **Drift** | Gap between purpose and effect exists but is addressable; amendable without re-architecture. |
| 40 – 59 | **Misaligned** | Significant purpose-effect gap with rights impact; likely narrowing construction required; s.1 contested. |
| 60 – 79 | **Severe misalignment** | Section 1 justification implausible on current record; Charter-vulnerable; should be struck, narrowed, or re-enacted. |
| 80 – 100 | **Unconstitutional-by-design** | Cannot be saved by judicial read-down; repeal or re-architecture only path; the Borovoy ceiling. |

---

## The output schema

```json
{
  "law": "Statute name, year, citation",
  "jurisdiction": "federal | provincial | municipal",
  "purpose_stated": "What the drafters said it was for",
  "borovoy_coefficient": 73,
  "band": "Severe misalignment",
  "dimensions": {
    "purpose_effect_gap": 78,
    "proportionality": 62,
    "overbreadth": 85,
    "rights_intrusion": 74,
    "enforcement_asymmetry": 55
  },
  "drift_vectors": [
    {
      "from": "Stated target conduct",
      "to": "Actually-captured conduct",
      "evidence": "Case citation or scholarly source",
      "goodhart_variant": "extremal | regressional | causal | adversarial"
    }
  ],
  "evidence": [
    {"quote": "...", "source": "Case or source citation"},
    ...
  ],
  "design_reforms": [
    "Sunset clause requiring re-enactment every N years",
    "Narrowing of statutory definitions",
    "Mandatory parliamentary oversight reports",
    "Independent complaints mechanism",
    "Disparate-impact reporting requirement"
  ],
  "limitations": "Notes on contested facts, ongoing litigation, evidence gaps"
}
```

---

## What the Borovoy Coefficient does NOT measure

Three explicit disclosures, because honesty is the price of scholarly credibility:

1. **Under-reach.** The Coefficient measures over-reach — the failure mode Borovoy diagnosed. It does not measure laws that fail by doing too little (insufficient environmental regulation, under-enforcement of monopoly restraint, tenant-protection gaps). A reciprocal *Merton Coefficient* or *Regulatory-Gap Coefficient* is future work and explicitly outside the scope of this measure.
2. **Legitimacy.** The Coefficient measures alignment, not legitimacy. A properly enacted statute within legislative competence may score high on the Coefficient and still be legitimate law. Alignment failure is a performance failure, not a legitimacy failure; conflating them is a category error.
3. **Normative correctness of the stated purpose.** The Coefficient takes the stated purpose as given and asks whether the law performs it. It does not judge whether the purpose was worth pursuing in the first place — that is political philosophy, not measurement.

---

## Rebuttable-presumption protocol

Borovoy Coefficients are provisional. New evidence updates the score. Five recognized triggers for re-scoring:

1. **Judicial finding.** A superior court's finding on any dimension updates the corresponding score.
2. **Empirical study.** Peer-reviewed evidence on disparate impact (D5), overbreadth (D3), or rights effects (D4).
3. **Legislative amendment.** Narrowing or broadening amendments trigger re-scoring.
4. **Scholarly consensus shift.** Documented shifts in the scholarly consensus on purpose, effect, or proportionality.
5. **Observed enforcement pattern change.** Official data showing material enforcement shift triggers D5 re-scoring.

Scores are versioned. The full evidence trail is preserved.

---

## The scoring protocol

Scoring uses a Claude-family language model, following the canonical prompt in `/spec/SCORING_PROMPT.md`. The protocol:

1. **Inputs**: statute full text; stated purpose (from preamble, purpose clause, or Hansard); observed-effect evidence; known rights impacts; known enforcement patterns.
2. **Process**: structured scoring across the five dimensions with evidence citations.
3. **Outputs**: JSON conforming to the output schema above, plus a three-sentence lay-summary.
4. **Temperature**: 0 (deterministic).
5. **Version**: scoring prompt versioned (v1.0 initial).

---

## Prospective design reforms — the Borovoy drafting principles

From the research record, five drafting reforms that would reduce Borovoy Coefficients at source:

1. **Sunset clauses** requiring affirmative re-enactment on a 5- or 10-year cycle (Borovoy's consistent ask on national-security legislation since 2001).
2. **Purpose-effect reporting** — statutory obligation on responsible ministers to publish annual data on whether the law is achieving its purpose, with defined metrics (a legislative analogue to alignment benchmarks).
3. **Disparate-impact dashboards** — mandatory publication of enforcement data disaggregated by geography, income, and (where constitutionally required) protected grounds, so D5 is measurable at source.
4. **Narrowing presumption** — courts should read statutory language narrowly in Charter-adjacent fields unless drafters used plain expansive language; this tightens D3 at construction.
5. **Independent oversight bodies** — not advisory review committees (à la SIRC), but bodies with hard-powers on a statutory footing, closing the mesa-optimization loop Borovoy flagged.

These reforms are the Coefficient's prospective-design move: not just measurement, but a corrigible drafting methodology.

---

## Version

**Spec v1.0** — 2026-04-16. Michael Bryant, justack.ai. Released under MPL-2.0 as part of the Justack legal-alignment infrastructure.

## Citation

Bryant, M. (2026). *The Borovoy Coefficient: A Civil-Liberties Measure of Legislative Alignment* (Spec v1.0). Justack.ai.
