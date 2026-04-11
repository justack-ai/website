/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { Metadata } from "next";
import Image from "next/image";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "For Lawyers | justack.ai",
  description: "Join the justack.ai lawyer network. AI-augmented legal service delivery for licensed professionals.",
};

export default function ToolsPage() {
  return (
    <main className="max-w-[900px] mx-auto px-6 md:px-8 py-20">
      {/* Header */}
      <div className="mb-12">
        <p className="text-sm font-light tracking-[4px] uppercase text-white/30 mb-4">For Lawyers</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-[-1.5px] mb-6">
          Build With Us
        </h1>
        <p className="text-lg font-light text-white/50 leading-relaxed max-w-[700px]">
          justack.ai is building infrastructure that connects people who need legal help with lawyers who can provide it. We are looking for licensed professionals who want to be part of that.
        </p>
      </div>

      <div className="mb-20 rounded-2xl overflow-hidden">
        <Image
          src="/images/scenes/justack-scene-03-papers.jpg"
          alt="A solo practitioner's desk under a warm lamp, stacked with file folders, banker boxes, and loose paper."
          width={1920}
          height={823}
          className="w-full h-auto"
        />
      </div>

      {/* Join the Network */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Join the Network</h2>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-4">
          We are building a network of lawyers who deliver legal services through the justack.ai platform. If you are a licensed lawyer in Ontario or British Columbia who is interested in serving clients through an AI-augmented delivery model, we want to hear from you.
        </p>
        <a
          href="mailto:michael@justack.ai"
          className="inline-block px-6 py-3 bg-gradient-to-br from-[#7c3aed] to-[#0d9488] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity no-underline"
        >
          michael@justack.ai
        </a>
      </section>

      <EmailCapture />
    </main>
  );
}
