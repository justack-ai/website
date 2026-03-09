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
  title: "Terms of Use | justack.ai",
  description: "Terms of use for justack.ai — open source legal help tools by Humilitas Group Limited.",
};

export default function TermsPage() {
  return (
    <main className="max-w-[800px] mx-auto px-6 md:px-8 py-20">
      <div className="mb-16">
        <p className="text-sm font-light tracking-[4px] uppercase text-white/30 mb-4">Legal</p>
        <h1 className="text-5xl font-bold tracking-[-1.5px] mb-6">Terms of Use</h1>
        <p className="text-sm font-light text-white/40">Last updated: March 2026</p>
      </div>

      <div className="space-y-12 text-base font-light text-white/60 leading-[1.8]">
        <section>
          <h2 className="text-xl font-semibold text-white/90 mb-3">About justack.ai</h2>
          <p className="mb-4">
            justack.ai is a product of <strong className="text-white/80">Humilitas Group Limited</strong>, a technology company incorporated in British Columbia, Canada.
          </p>
          <div className="glass p-6 border-l-2 border-l-amber-500/40">
            <p className="text-sm font-semibold text-amber-400/80 mb-2">Important</p>
            <p className="text-sm">
              justack.ai is not a law firm. It does not provide legal advice, legal representation, or legal services. The tools and information provided by justack.ai are for general informational and educational purposes only and do not constitute legal advice.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        <section>
          <h2 className="text-xl font-semibold text-white/90 mb-3">Acceptance of Terms</h2>
          <p>
            By accessing or using justack.ai, you agree to be bound by these Terms of Use. If you do not agree to these terms, do not use the site or its tools.
          </p>
        </section>

        <div className="section-divider" />

        <section>
          <h2 className="text-xl font-semibold text-white/90 mb-3">Use of the Site</h2>
          <p className="mb-4">You may use justack.ai for lawful purposes consistent with these terms. You agree not to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use the site or its tools for the unauthorized practice of law</li>
            <li>Represent that any information obtained from justack.ai constitutes legal advice</li>
            <li>Use the tools to harass, intimidate, or harm others</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Use the site in any way that violates applicable laws</li>
          </ul>
        </section>

        <div className="section-divider" />

        <section>
          <h2 className="text-xl font-semibold text-white/90 mb-3">No Legal Advice</h2>
          <p className="mb-4">
            The information provided by justack.ai, including any output from our navigation tools, is <strong className="text-white/80">not legal advice</strong>. It is general legal information intended to help you understand your situation and your options.
          </p>
          <p className="mb-4">
            If you need legal advice, you should consult a qualified lawyer licensed in your jurisdiction. justack.ai may provide referrals to legal professionals, but does not endorse, guarantee, or take responsibility for any services provided by third parties.
          </p>
          <p>
            No solicitor-client, attorney-client, or lawyer-client relationship is created by your use of justack.ai.
          </p>
        </section>

        <div className="section-divider" />

        <section>
          <h2 className="text-xl font-semibold text-white/90 mb-3">AI-Generated Content</h2>
          <p className="mb-4">
            Some content and guidance provided by justack.ai is generated or assisted by artificial intelligence. While we make reasonable efforts to ensure accuracy, AI-generated content may contain errors, omissions, or inaccuracies.
          </p>
          <p>
            You should independently verify any information or guidance before relying on it, particularly for matters with legal, financial, or other significant consequences.
          </p>
        </section>

        <div className="section-divider" />

        <section>
          <h2 className="text-xl font-semibold text-white/90 mb-3">Open Source Code</h2>
          <p>
            Portions of justack.ai are released as open source software under the Apache License, Version 2.0. Your use of open source code is governed by the applicable license terms, which are available in the relevant repositories at{" "}
            <a href="https://github.com/justack-ai" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">github.com/justack-ai</a>. See also our{" "}
            <a href="https://github.com/justack-ai/website/blob/main/RESPONSIBLE-USE.md" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">Responsible Use policy</a>.
          </p>
        </section>

        <div className="section-divider" />

        <section>
          <h2 className="text-xl font-semibold text-white/90 mb-3">Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Humilitas Group Limited and its affiliates, officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of justack.ai.
          </p>
        </section>

        <div className="section-divider" />

        <section>
          <h2 className="text-xl font-semibold text-white/90 mb-3">Changes to These Terms</h2>
          <p>
            We may update these terms from time to time. Changes will be posted on this page with an updated revision date. Your continued use of justack.ai after changes are posted constitutes acceptance of the revised terms.
          </p>
        </section>

        <div className="section-divider" />

        <section>
          <h2 className="text-xl font-semibold text-white/90 mb-3">Governing Law</h2>
          <p>
            These terms are governed by the laws of the Province of British Columbia and the federal laws of Canada applicable therein, without regard to conflict of law principles.
          </p>
        </section>

        <div className="section-divider" />

        <section>
          <h2 className="text-xl font-semibold text-white/90 mb-3">Contact</h2>
          <p>
            For questions about these terms, contact us at{" "}
            <a href="mailto:hello@justack.ai" className="text-purple-400 hover:text-purple-300 transition-colors">hello@justack.ai</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
