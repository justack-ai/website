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

"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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

  return (
    <section className="py-20 px-6 md:px-[60px] text-center">
      <h3 className="text-[28px] font-semibold tracking-tight mb-3">Join the Movement</h3>
      <p className="text-sm font-light text-white/40 mb-9 tracking-wide">
        Be first to know when we launch each phase.
      </p>

      {status === "success" ? (
        <p className="text-teal-400 font-medium">Welcome to the movement. We&apos;ll be in touch.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-0 max-w-[480px] mx-auto rounded-2xl overflow-hidden bg-white/[0.04] backdrop-blur-[20px] border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 bg-transparent border-none py-[18px] px-6 text-[15px] font-light text-white outline-none tracking-wide placeholder:text-white/25"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-gradient-to-br from-[#7c3aed] to-[#0d9488] border-none py-[18px] px-8 text-sm font-semibold text-white cursor-pointer tracking-wide whitespace-nowrap shadow-[0_1px_2px_rgba(0,0,0,0.3)] hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status === "loading" ? "Joining..." : "Join the Movement"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="text-red-400 text-sm mt-4">Something went wrong. Please try again.</p>
      )}
    </section>
  );
}
