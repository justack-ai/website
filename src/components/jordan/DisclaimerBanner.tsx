/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

export default function DisclaimerBanner() {
  return (
    <div className="rounded-lg border border-amber-500/30 bg-white/5 backdrop-blur px-5 py-4 text-sm text-white/80">
      This tool provides calculation assistance only. It does not provide legal
      advice and should not be relied upon as a substitute for independent legal
      judgment. Verify all outputs with qualified counsel.
    </div>
  );
}
