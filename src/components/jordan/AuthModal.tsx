/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useState } from "react";
import { createBrowserClient } from "@/lib/jordan/supabase";

type Tab = "signin" | "signup";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onAuth?: () => void;
}

export default function AuthModal({ open, onClose, onAuth }: AuthModalProps) {
  const [tab, setTab] = useState<Tab>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const supabase = createBrowserClient();

  if (!open) return null;

  const resetState = () => {
    setError(null);
    setMagicLinkSent(false);
  };

  const handleEmailPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (tab === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
      } else {
        const { error: signInError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });
        if (signInError) throw signInError;
      }
      onAuth?.();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/jordan`,
        },
      });
      if (otpError) throw otpError;
      setMagicLinkSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#1A1A1A] p-8 shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Tabs */}
        <div className="mb-6 flex gap-4 border-b border-white/10 pb-3">
          {(["signin", "signup"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                resetState();
              }}
              className={`text-sm font-medium transition-colors ${
                tab === t
                  ? "text-violet-400 border-b-2 border-violet-400 pb-1"
                  : "text-white/50 hover:text-white/70"
              }`}
            >
              {t === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {magicLinkSent ? (
          <div className="text-center">
            <p className="text-white/80 mb-2">Check your email</p>
            <p className="text-sm text-white/50">
              We sent a login link to <strong>{email}</strong>
            </p>
            <button
              onClick={() => setMagicLinkSent(false)}
              className="mt-4 text-sm text-violet-400 hover:text-violet-300"
            >
              Try again
            </button>
          </div>
        ) : (
          <form onSubmit={handleEmailPassword} className="space-y-4">
            <div>
              <label
                htmlFor="auth-email"
                className="block text-sm text-white/60 mb-1"
              >
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/30 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="auth-password"
                className="block text-sm text-white/60 mb-1"
              >
                Password
              </label>
              <input
                id="auth-password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/30 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                placeholder="Min. 6 characters"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-violet-600 py-2.5 text-sm font-medium text-white hover:bg-violet-500 disabled:opacity-50 transition-colors"
            >
              {loading
                ? "Loading..."
                : tab === "signin"
                ? "Sign In"
                : "Create Account"}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#1A1A1A] px-2 text-white/40">or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleMagicLink}
              disabled={loading || !email}
              className="w-full rounded-lg border border-white/10 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white disabled:opacity-50 transition-colors"
            >
              Email me a login link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
