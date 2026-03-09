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
  title: "Privacy Policy | justack.ai",
  description: "How justack.ai collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-[800px] mx-auto px-6 md:px-8 py-20">
      <div className="mb-16">
        <p className="text-sm font-light tracking-[4px] uppercase text-white/30 mb-4">Legal</p>
        <h1 className="text-5xl font-bold tracking-[-1.5px] mb-6">Privacy Policy</h1>
        <p className="text-sm font-light text-white/40">Last updated: March 2026</p>
      </div>

      <div className="space-y-12 text-base font-light text-white/60 leading-[1.8]">
        <section>
          <h2 className="text-xl font-semibold text-white/90 mb-3">Who We Are</h2>
          <p>
            justack.ai is a product of <strong className="text-white/80">Humilitas Group Limited</strong>, a technology company incorporated in British Columbia, Canada. We build open source legal help tools. We are not a law firm and do not provide legal advice or legal services.
          </p>
        </section>

        <div className="section-divider" />

        <section>
          <h2 className="text-xl font-semibold text-white/90 mb-3">Information We Collect</h2>
          <p className="mb-4">We collect the minimum amount of personal information necessary to operate our services:</p>
          <div className="glass p-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white/80 mb-1">Email Addresses</h3>
              <p className="text-sm">If you sign up for our newsletter or updates, we collect your email address. We use this solely to send you updates about justack.ai. You can unsubscribe at any time.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white/80 mb-1">Usage Data</h3>
              <p className="text-sm">We may collect anonymized usage analytics to understand how our tools are used and how to improve them. We use privacy-respecting analytics tools that do not track individuals across websites.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white/80 mb-1">Information You Provide</h3>
              <p className="text-sm">If you use our legal navigation tools (when available), you may provide information about your legal situation. This information is processed to generate guidance and is not shared with third parties without your explicit consent.</p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section>
          <h2 className="text-xl font-semibold text-white/90 mb-3">How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To provide and improve our tools and services</li>
            <li>To send you updates and communications you have opted into</li>
            <li>To generate anonymized, aggregated insights about how our tools are used</li>
            <li>To respond to your inquiries and requests</li>
          </ul>
          <p className="mt-4">We do not sell your personal information. We do not use your data for advertising.</p>
        </section>

        <div className="section-divider" />

        <section>
          <h2 className="text-xl font-semibold text-white/90 mb-3">Data Security</h2>
          <p>
            We take reasonable measures to protect your information from unauthorized access, alteration, or destruction. Legal information is particularly sensitive, and we treat it with corresponding care. All data transmission is encrypted.
          </p>
        </section>

        <div className="section-divider" />

        <section>
          <h2 className="text-xl font-semibold text-white/90 mb-3">Data Retention</h2>
          <p>
            We retain your information only as long as necessary to provide our services. You may request deletion of your personal data at any time by contacting us.
          </p>
        </section>

        <div className="section-divider" />

        <section>
          <h2 className="text-xl font-semibold text-white/90 mb-3">Third-Party Services</h2>
          <p>
            We may use third-party services for hosting (Vercel), content management (Sanity), and analytics. These services have their own privacy policies. We select service providers that align with our commitment to data privacy.
          </p>
        </section>

        <div className="section-divider" />

        <section>
          <h2 className="text-xl font-semibold text-white/90 mb-3">Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Withdraw consent for communications at any time</li>
            <li>Request a copy of your data in a portable format</li>
          </ul>
        </section>

        <div className="section-divider" />

        <section>
          <h2 className="text-xl font-semibold text-white/90 mb-3">Contact</h2>
          <p>
            For privacy-related inquiries, contact us at{" "}
            <a href="mailto:privacy@justack.ai" className="text-purple-400 hover:text-purple-300 transition-colors">privacy@justack.ai</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
