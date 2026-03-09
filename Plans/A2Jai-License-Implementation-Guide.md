# A2Jai / justack.ai — License Implementation Guide

**Created:** 2026-03-06
**Source:** GC.AI analysis with PAI assessment notes
**Status:** For implementation — items map to soft launch timetable

---

## 1. LICENSE File

**Action:** Place the full, unmodified text of Apache License 2.0 in `LICENSE` at the repository root.
**Source:** https://www.apache.org/licenses/LICENSE-2.0.txt
**GC.AI guidance:** Use exact, unmodified text. Do not alter.
**PAI assessment:** Agree. Standard practice. This is Day 2 on the timetable (already planned).

---

## 2. NOTICE File

**Action:** Create `NOTICE` at the repository root.

**Content:**
```
justack.ai
Copyright 2026 Humilitas Group Limited

This product includes software developed by Humilitas Group Limited.
```

**GC.AI guidance:** Keep minimal. No marketing language, feature descriptions, or anything construable as modifying license terms. All downstream redistributors must carry this forward.

**PAI assessment:** Agree. The NOTICE file is also the natural place to reference supplemental terms (Responsible Use Addendum, data processing terms) without embedding them in the NOTICE itself — a simple "See RESPONSIBLE-USE.md for additional use restrictions" line would suffice. This was flagged in the earlier GC.AI compliance analysis and aligns with Apache 2.0 Section 4's permission to provide additional terms for derivative works.

**Note:** Third-party attribution will need to be added as dependencies are finalized. Audit `package.json` and any vendored code before launch.

---

## 3. Source File Headers

**Action:** Add Apache boilerplate header to every source file.

**Header text:**
```
Copyright 2026 Humilitas Group Limited

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

**PAI assessment:** Agree. This is automatable — a script can prepend headers to all `.ts`, `.tsx`, `.js`, `.jsx`, `.mdx`, `.css` files. Exclude `node_modules`, `.next`, and generated files. Add a pre-commit hook or CI check to enforce headers on new files.

**Implementation note:** Use appropriate comment syntax per file type:
- `.ts/.tsx/.js/.jsx`: `/* ... */` block comment
- `.css`: `/* ... */` block comment
- `.mdx`: `{/* ... */}` JSX comment
- `.json`: Not possible (JSON doesn't support comments) — skip

---

## 4. README Disclosures

**Action:** Add to README.md:
- Statement: "Licensed under Apache License 2.0"
- Link to LICENSE file
- Link to NOTICE file
- Contribution requirements (DCO — see Section 5)
- Disclaimer: "justack.ai does not constitute legal advice. justack.ai is a product of Humilitas Group Limited, a technology company. It is not a law firm and does not provide legal services."

**PAI assessment:** Agree. The disclaimer language is important — it must clearly separate Humilitas Group (tech company, license holder) from Bryant Law Group (law practice, separate entity). GC.AI correctly identified this separation.

---

## 5. Contributor Requirements: DCO (not CLA)

**Decision:** Use Developer Certificate of Origin (DCO) as default. Option to layer CLA later if relicensing flexibility needed.

**GC.AI rationale (agreed):**
- Apache 2.0 Section 5 already provides inbound=outbound licensing
- Apache 2.0 Section 3 provides patent grants from contributors
- DCO adds provenance paper trail at low friction
- CLA creates contributor friction (employer legal review) that a pre-launch project can't afford
- If relicensing needed later, introduce CLA for new contributions at that point

**Implementation:**
1. Add `DCO.md` to repository root (standard DCO 1.1 text)
2. Install DCO GitHub App on the repository
3. Document in CONTRIBUTING.md that all commits must include `Signed-off-by` line
4. Contributors use: `git commit -s -m "commit message"`

**PAI assessment:** Agree. DCO is the right choice at this stage. The Spring/Broadcom precedent (CLA → DCO for Apache 2.0 projects) validates this as industry-accepted. CLA can be introduced later if commercial licensing or foundation structure requires it.

---

## 6. Standardization Rules

**What you CANNOT modify (and still claim Apache 2.0):**
- Grant of copyright license (Section 2)
- Grant of patent license (Section 3)
- Redistribution conditions (Section 4)
- Warranty disclaimer (Section 7)
- Limitation of liability (Section 8)

**What you CAN customize:**
- NOTICE file (attribution notices, not license modifications)
- Additional terms for derivative works (Section 4) — this is where the Responsible Use Addendum lives
- Warranty and support offerings for a fee (Section 9) — on your own behalf, not other contributors'

**PAI assessment:** This confirms the legal basis for the Responsible Use Addendum. Apache 2.0 Section 4 explicitly permits additional terms for derivative works. The addendum is a supplemental document, not a license modification. GC.AI's guidance here is precise and correct.

---

## 7. Dispute Resolution — TWO OPTIONS

### Option 1: Rely on General Law (No DR Clause)

Apache 2.0 is silent on dispute resolution. Disputes resolve under the general law of whichever jurisdiction has authority. For Humilitas Group (Canadian corporation), this means Canadian copyright/patent law or the equivalent in the infringer's jurisdiction.

### Option 2: Terms of Service with DR Provisions

GC.AI drafted a ToS dispute resolution clause (Sections 10.1–10.6) covering:
- Governing law (Ontario + federal Canada)
- 30-day good-faith negotiation period
- Binding arbitration under ADRIC rules (Toronto seat, single arbitrator, videoconference)
- Small claims court exception
- Injunctive relief exception
- Class action waiver

### PAI Assessment — ISSUES TO FLAG

**Internal contradiction in GC.AI output:** The drafted DR clause (Section 10.1) specifies Ontario as governing law and Toronto as arbitration seat. But the "practical steps" section at the end says "Specify British Columbia as the governing jurisdiction and the courts of British Columbia as the exclusive forum." These are contradictory. This needs a decision from the founder — Ontario or BC — based on where Humilitas Group is incorporated and where the founder primarily practices.

**Recommendation:** Option 2 (ToS with DR) is the stronger approach for a legal tech product. But the DR clause belongs in a Terms of Service document, not in the license or NOTICE file. This is a separate workstream from the license implementation — it should be drafted as part of the website legal pages (Terms of Service, Privacy Policy, Acceptable Use Policy).

**The class action waiver (Section 10.6) may not be enforceable in Canada.** Canadian courts have been skeptical of class action waivers in consumer contracts (see Uber v. Heller, 2020 SCC 16). If justack.ai's tools are used by individuals (consumers), this clause may be struck. Flag for counsel review.

---

## 8. Intercompany IP Agreement (NEW ITEM)

**GC.AI flagged:** The IP boundary between Humilitas Group Limited and Bryant Law Group should be documented in an intercompany agreement. The Apache 2.0 license governs downstream users, not the relationship between the two entities.

**PAI assessment:** This is a legitimate concern that was not in our timetable. The two entities have a "separate-but-related" relationship:
- Humilitas Group Limited = tech company, owns justack.ai, holds the Apache 2.0 license
- Bryant Law Group = law practice, may use justack.ai tools, provides flat-fee legal services referenced on the website

An intercompany agreement should clarify:
- Humilitas Group owns all A2Jai/justack.ai IP
- Bryant Law Group is a licensee/user, not an owner or co-developer
- Any IP created by the founder in his capacity as lawyer (e.g., legal content, precedent documents) is assigned to one entity or the other with clear boundaries
- Data flows between the entities (if any) are governed by appropriate terms

**Status:** Not on the 10-day timetable. Not a launch blocker. But should be on the pre-revenue checklist.

---

## Implementation Timetable Mapping

| Item | Timetable Day | Priority | Status |
|------|--------------|----------|--------|
| LICENSE file | Day 2 (March 7) | Critical | DONE (2026-03-06) |
| NOTICE file | Day 2 (March 7) | Critical | DONE (2026-03-06) |
| Source file headers | Day 2-3 | High | DONE (2026-03-06) — 32 files |
| README disclosures | Day 2 (March 7) | Critical | DONE (2026-03-06) |
| DCO setup | Day 3 (March 8) | High | DONE (2026-03-06) |
| CONTRIBUTING.md | Day 3 (March 8) | High | DONE (2026-03-06) |
| RESPONSIBLE-USE.md | Day 2 (March 7) | High | DONE (2026-03-06) — in repo root |
| Terms of Service (incl. DR) | Day 5-6 | Medium | PENDING — Ontario governing law, ADRIC arbitration |
| Intercompany IP agreement | May 1, 2026 | Low | DEFERRED — founder decision |
