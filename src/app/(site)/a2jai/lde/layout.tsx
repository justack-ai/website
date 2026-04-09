/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Dialectic Engine — LDE | justack.ai",
  description:
    "Tell your story. Get both sides. LDE is A2Jai's neuro-symbolic legal reasoning engine for Canadians who can't afford a lawyer.",
};

export default function LDELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
