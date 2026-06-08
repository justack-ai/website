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
      <JordanCalculator />
      <section className="mt-16 glass p-8">
        <h2 className="text-xl font-semibold text-white/90 mb-4">About This Tool</h2>
        <div className="space-y-3 text-sm text-white/60 leading-relaxed">
          <p>
            The Charter Delay Calculator computes net delay under the framework established by
            <em> R v Jordan</em>, 2016 SCC 27. It applies the presumptive ceilings and accounts for
            defence delay attribution under <em>R v Hanan</em>, 2023 SCC 12.
          </p>
          <p>
            This tool provides calculation assistance only. It does not provide legal advice.
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/30">
          <p>Copyright 2026 Humilitas Group Limited · MPL-2.0</p>
        </div>
      </section>
    </main>
  );
}
