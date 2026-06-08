/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useState } from "react";
import { createBrowserClient } from "@/lib/jordan/supabase";

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (tab === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setMessage("Check your email for a confirmation link.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else onClose();
    }
    setLoading(false);
  };

  const handleMagicLink = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setError(error.message);
    else setMessage("Check your email for a login link.");
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="glass max-w-sm w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">{tab === "signin" ? "Sign In" : "Sign Up"}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white text-xl">&times;</button>
        </div>

        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab("signin")} className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${tab === "signin" ? "bg-violet text-white" : "bg-white/5 text-white/60"}`}>
            Sign In
          </button>
          <button onClick={() => setTab("signup")} className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${tab === "signup" ? "bg-violet text-white" : "bg-white/5 text-white/60"}`}>
            Sign Up
          </button>
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required
            className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2 text-white placeholder-white/40 focus:border-violet focus:outline-none" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required minLength={6}
            className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2 text-white placeholder-white/40 focus:border-violet focus:outline-none" />
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-violet py-2.5 text-sm font-medium text-white hover:bg-violet/80 disabled:opacity-50 transition-colors">
            {loading ? "..." : tab === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button onClick={handleMagicLink} disabled={!email || loading} className="text-xs text-violet-400 hover:text-violet-300 disabled:opacity-40">
            Email me a login link instead
          </button>
        </div>

        {error && <p className="mt-3 text-sm text-red-400 text-center">{error}</p>}
        {message && <p className="mt-3 text-sm text-teal-400 text-center">{message}</p>}
      </div>
    </div>
  );
}
