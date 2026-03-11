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
  title: "FAQ | justack.ai",
  description: "Frequently asked questions about justack.ai, A2Jai, and our legal help tools.",
};

const faqs = [
  {
    category: "About justack.ai",
    questions: [
      {
        q: "What is justack.ai?",
        a: "justack.ai is an access-to-justice technology platform built by Humilitas Group Limited. We build open source tools that help people understand their legal rights, determine whether they need a lawyer, and connect with legal services.",
      },
      {
        q: "Is justack.ai a law firm?",
        a: "No. justack.ai is a technology company. It is not a law firm. It does not provide legal advice, legal representation, or legal services. The tools and information we provide are for general informational and educational purposes only.",
      },
      {
        q: "What is A2Jai?",
        a: "A2Jai stands for Access to Justice through AI. It is the name of the project and mission behind justack.ai — restoring practical legal help to the people who have been priced out of it.",
      },
      {
        q: "Who is behind justack.ai?",
        a: "justack.ai was founded by Michael Bryant, who served as Attorney General of Ontario, CEO of the Canadian Civil Liberties Association, and CEO of Legal Aid BC. His career spans the full range of the justice system — from its most privileged corridors to its most underserved communities.",
      },
    ],
  },
  {
    category: "The Tools",
    questions: [
      {
        q: "What is the Navigator?",
        a: "The Navigator is an AI-powered legal navigation tool that helps you answer the question 'Do I need a lawyer?' It guides you through a structured intake, classifies your situation, and provides clear guidance on what you can handle yourself versus what requires professional help. It is currently in active development.",
      },
      {
        q: "Does the Navigator give legal advice?",
        a: "No. The Navigator provides navigational guidance — not legal advice. It helps you understand your situation, your options, and the appropriate level of professional help you may need. Every output includes a clear disclaimer and a path to a licensed lawyer.",
      },
      {
        q: "What areas of law does justack.ai cover?",
        a: "Our tools are designed around six practice areas: employment, business formation and governance, contracts, disputes, commercial leasing (non-residential), and privacy and AI governance. These are available in Ontario and British Columbia. We exclude real estate, family law, criminal law, immigration, tax planning, and matters requiring court appearances.",
      },
      {
        q: "How much do the tools cost?",
        a: "Basic triage is free. The Navigator product (when available) will be priced between $49 and $149 for a full guidance report. When you need a licensed lawyer, the Navigator will connect you with one from our network.",
      },
    ],
  },
  {
    category: "Open Source",
    questions: [
      {
        q: "Is justack.ai open source?",
        a: "Our core tools are open source under the Apache 2.0 licence — the most permissive widely-used open source licence. Commercial products like the Navigator are proprietary. The open-source side serves the mission; the commercial side funds it.",
      },
      {
        q: "Can I use the code for my own project?",
        a: "Yes. Apache 2.0 permits use, modification, and distribution for any purpose, including commercial use. See the LICENSE file in each repository for details, and our Responsible Use policy for ethical use expectations.",
      },
      {
        q: "How can I contribute?",
        a: "Visit our GitHub organization at github.com/justack-ai. We welcome bug reports, feature requests, and pull requests. All contributions must include a DCO sign-off. See CONTRIBUTING.md in each repository for our process.",
      },
    ],
  },
  {
    category: "Privacy & Data",
    questions: [
      {
        q: "How do you handle my data?",
        a: "We collect the minimum personal information necessary to provide our services. Legal data is particularly sensitive, and we treat it accordingly. We do not sell your data. We do not use it for advertising. See our Privacy Policy for full details.",
      },
      {
        q: "Is my legal information confidential?",
        a: "We take data security seriously. All transmissions are encrypted. If you use our navigation tools, the information you provide is processed to generate guidance and is not shared with third parties without your explicit consent. However, no solicitor-client privilege attaches to information shared with justack.ai, as we are not a law firm.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="max-w-[800px] mx-auto px-6 md:px-8 py-20">
      <div className="mb-20">
        <p className="text-sm font-light tracking-[4px] uppercase text-white/30 mb-4">FAQ</p>
        <h1 className="text-5xl font-bold tracking-[-1.5px] mb-6">Frequently Asked Questions</h1>
        <p className="text-lg font-light text-white/50 leading-relaxed">
          Common questions about justack.ai, our tools, and how we work.
        </p>
      </div>

      <div className="space-y-12">
        {faqs.map((section) => (
          <section key={section.category}>
            <h2 className="text-xl font-semibold tracking-tight mb-6">{section.category}</h2>
            <div className="grid gap-4">
              {section.questions.map((faq) => (
                <div key={faq.q} className="glass p-6">
                  <h3 className="text-base font-semibold mb-2">{faq.q}</h3>
                  <p className="text-sm font-light text-white/50 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="section-divider mt-12" />
          </section>
        ))}
      </div>

      <div className="mt-16 glass p-6 text-center">
        <p className="text-base font-light text-white/50 mb-4">
          Have a question that is not answered here?
        </p>
        <a
          href="mailto:hello@justack.ai"
          className="inline-block px-6 py-3 bg-gradient-to-br from-[#7c3aed] to-[#0d9488] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity no-underline"
        >
          hello@justack.ai
        </a>
      </div>
    </main>
  );
}
