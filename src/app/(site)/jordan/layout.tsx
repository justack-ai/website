/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Charter Delay Calculator — justack.ai",
  description:
    "Calculate s. 11(b) delay under the R v Jordan framework. Free, accurate, and uncertainty-aware. Built for criminal defence lawyers.",
  keywords: [
    "Jordan framework",
    "s 11(b)",
    "charter delay",
    "criminal defence",
    "stay application",
    "legal tech",
    "justack",
  ],
  openGraph: {
    title: "Charter Delay Calculator — justack.ai",
    description:
      "Calculate s. 11(b) delay under the R v Jordan framework. Free, accurate, and uncertainty-aware.",
    type: "website",
    url: "https://justack.ai/jordan",
  },
};

export default function JordanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
