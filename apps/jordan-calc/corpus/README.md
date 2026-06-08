# JordanFrameworkCalc — Legal Corpus

This corpus is the source of truth for every legal rule the calculation engine applies. It is human-editable by lawyers and machine-readable by the engine.

## Structure

```
corpus/
  index.json              — Corpus index (version, issue list, global pending watch)
  issues/
    ceiling_ocj.json
    ceiling_oscj.json
    re_election_ceiling.json
    retrial_clock.json
    direct_indictment_clock.json
    defence_delay_attribution.json
    change_of_counsel.json
    exceptional_circumstances_discrete.json
    complexity_exception.json
    covid_deductibility_ontario.json
    covid_deductibility_alberta.json
    remedy_framework.json
    meaningful_steps.json
    disclosure_delay.json
```

## Confidence Tiers

| Tier | Meaning | Engine behaviour |
|---|---|---|
| 1 | Arithmetic — pure date math | Single number, no caveat |
| 2 | Settled law — mechanical application | Single number + citation badge |
| 3 | Contested / jurisdiction-dependent | Three-scenario block (Low / Mid / High) |
| 4 | Unsettled / pending authority | Amber "Law May Change" banner |
| 5 | Counsel judgment required | No number; checklist panel only |

Uncertainty propagates upward. Net delay is never more certain than its least certain component.

## Editing the Corpus

- Each issue is one JSON file in `issues/`. Edit the file directly.
- **Legal training is required** to edit any `default_authority`, `jurisdiction_variants`, `confidence_tier`, or `pending_authority` field.
- After any edit: increment `version` and update `last_reviewed_date` and `reviewed_by`.
- Submit changes via pull request. Michael Bryant (corpus curator) must approve merges.
- After merge: bump the semver in `index.json`.

## Resolving a Pending Authority

When the SCC releases reasons on a watched case:

1. Set `resolved_date` and `resolution_note` in the `pending_authority` entry.
2. Update `status` to `decided_with_reasons`.
3. If the law changed: add a new `controlling_authority` entry; mark the superseded entry with `superseded_by`.
4. Reassess `confidence_tier` and `stability_score` for the affected issue.
5. Increment `version` on the issue file.
6. All prior calculations affected by this issue will be flagged for recalculation in the UI.

## Update SLAs

| Trigger | SLA |
|---|---|
| SCC reasons released on watched case | Corpus updated within 7 days |
| New SCC leave grant on Jordan issue | New pending_authority entry within 14 days |
| CA decision on contested issue | Jurisdiction variant reviewed within 30 days |
| 180 days since last full review | Full review completed within 30 days of flag |
| Any issue stability_score drops below 0.4 | Automatic Tier 4 treatment; curator notified immediately |

## Curator

**Michael Bryant** — corpus curator and sole approver for legal content changes.
All questions about legal accuracy of corpus entries go to Michael.
