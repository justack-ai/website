/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export const metadata = {
  title: "Sanity Studio | justack.ai",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="sanity-studio"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#fff",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {children}
    </div>
  );
}
