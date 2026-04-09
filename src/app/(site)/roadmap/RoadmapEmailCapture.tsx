/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useState } from "react";

export default function RoadmapEmailCapture({
  toolSlug,
  toolName,
  accentColor,
}: {
  toolSlug: string;
  toolName: string;
  accentColor: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/roadmap-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tool_interest: toolSlug }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm font-medium" style={{ color: accentColor }}>
        We&apos;ll notify you when {toolName} launches.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-0 rounded-lg overflow-hidden bg-white/[0.03] border border-white/[0.06]">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 bg-transparent border-none py-2.5 px-4 text-[13px] font-light text-white outline-none placeholder:text-white/20 min-w-0"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="border-none py-2.5 px-4 text-[11px] font-semibold tracking-[0.5px] text-white cursor-pointer whitespace-nowrap hover:opacity-80 transition-opacity disabled:opacity-50"
        style={{ background: `${accentColor}33` }}
      >
        {status === "loading" ? "..." : "Notify me"}
      </button>
    </form>
  );
}
