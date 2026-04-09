/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { JordanCalculator } from "@/components/jordan/JordanCalculator";

export default function JordanPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="gradient-text text-4xl font-bold tracking-tight sm:text-5xl">
          Charter Delay Calculator
        </h1>
        <p className="mt-4 text-lg text-white/60">
          R v Jordan (2016 SCC 27) — s. 11(b) delay analysis
        </p>
        <p className="mt-2 text-sm text-white/40">
          Uncertainty-aware. Three-scenario output. Not legal advice.
        </p>
      </div>

      {/* Calculator */}
      <JordanCalculator />

      {/* Legal Framework Reference */}
      <section className="mt-16 glass p-8">
        <h2 className="text-xl font-semibold text-white/90 mb-4">
          About This Tool
        </h2>
        <div className="space-y-3 text-sm text-white/60 leading-relaxed">
          <p>
            The Charter Delay Calculator computes net delay under the framework
            established by <em>R v Jordan</em>, 2016 SCC 27. It applies the
            presumptive ceilings (18 months for provincial court, 30 months for
            superior court) and accounts for defence delay attribution under{" "}
            <em>R v Hanan</em>, 2023 SCC 12, exceptional circumstances
            deductions, and meaningful steps requirements.
          </p>
          <p>
            Where legal questions are contested or jurisdiction-dependent, the
            tool discloses uncertainty through its confidence tier system.
            Defence delay attribution produces three scenarios (Low / Mid /
            High) rather than a single deterministic number, reflecting the
            inherent uncertainty of contextual Hanan analysis.
          </p>
          <p>
            This tool provides calculation assistance only. It does not provide
            legal advice and is not a substitute for independent legal judgment.
            Verify all outputs with qualified counsel.
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/30">
          <p>
            Legal citations: <em>R v Jordan</em>, 2016 SCC 27 ·{" "}
            <em>R v Cody</em>, 2017 SCC 31 · <em>R v KGK</em>, 2020 SCC 7 ·{" "}
            <em>R v Hanan</em>, 2023 SCC 12 · <em>R v J.F.</em>, 2022 SCC 17
          </p>
          <p className="mt-1">
            Copyright 2026 Humilitas Group Limited · Licensed under MPL-2.0
          </p>
        </div>
      </section>
    </main>
  );
}
