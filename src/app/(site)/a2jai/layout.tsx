/*
 * Copyright 2026 Humilitas Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A2Jai — Restoring Access to Justice in the Age of AI | justack.ai",
  description:
    "The A2Jai manifesto. AI-powered legal technology to address Canada's access-to-justice crisis — commercial products and open-source tools.",
};

export default function A2JaiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
