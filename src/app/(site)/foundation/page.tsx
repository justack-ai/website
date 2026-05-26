/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Justack Foundation | justack.ai",
  description:
    "The Justack Foundation exists to improve access to justice through practical legal technology, public legal education, and applied research.",
};

const directors = [
  {
    name: "Alex Peel",
    title: "Director",
    body: [
      "Alex Peel is a senior access-to-justice executive with nearly two decades of experience at Legal Aid BC. Her work has focused on public legal education, legal publications, service design, and the practical delivery of legal information to people who need it.",
      "She brings a rare combination of institutional knowledge and user-centred judgment to the Foundation's work. Her career has been shaped by the operational realities of legal aid: how people actually seek help, where legal information breaks down, and what makes legal services usable for communities facing barriers to justice.",
    ],
  },
  {
    name: "Paul Brookes",
    title: "Director",
    body: [
      "Paul Brookes has worked in internet and e-commerce product development for more than 25 years. He is the founder of Metropolis Media and has built digital products, platforms, and online experiences across a period of major technological change.",
      "His background gives the Foundation direct expertise in product strategy, digital execution, and user experience. He also served for three years on the Ontario Justice of the Peace Appointments Committee, bringing experience at the intersection of civic institutions, appointments, and public confidence in justice administration. He holds a degree from Toronto Metropolitan University.",
    ],
  },
  {
    name: "David Valentin",
    title: "Director",
    body: [
      "David Valentin is an award-winning activist, entrepreneur, and public-affairs strategist. He co-founded one of Canada's leading public sentiment, research, and political intelligence firms, helping organizations understand how people think, decide, and respond to public issues.",
      "His work sits at the intersection of civic engagement, public opinion research, strategy, and democratic participation. He brings to the Foundation a sophisticated understanding of public trust, communications, and the ways legal and institutional systems are experienced by the people they are meant to serve.",
    ],
  },
];

export default function FoundationPage() {
  return (
    <main className="max-w-[800px] mx-auto px-8 py-20">
      {/* Header */}
      <div className="mb-20">
        <p className="text-sm font-light tracking-[4px] uppercase text-white/30 mb-4">
          Not-for-profit
        </p>
        <h1 className="text-5xl font-bold tracking-[-1.5px] mb-8">
          Justack Foundation
        </h1>
        <p className="text-lg font-light text-white/75 leading-[1.7] mb-6">
          The Justack Foundation exists to improve access to justice through
          practical legal technology, public legal education, and applied
          research.
        </p>
        <p className="text-base font-light text-white/60 leading-[1.8]">
          Our work is grounded in a simple premise: access to justice is not
          only a legal problem. It is also a design problem, a technology
          problem, and a public-service problem.
        </p>
      </div>

      {/* Hero illustration — arrival, walking into justice */}
      <div className="relative rounded-2xl overflow-hidden mb-16">
        <Image
          src="/foundation/scene-courthouse-steps.jpg"
          alt="A woman in a sage trench coat carrying a folder walks up the stone steps of a small civic courthouse, one hand on the rail, toward a heavy door slightly open with warm light spilling out."
          width={1484}
          height={572}
          priority
          sizes="(min-width: 800px) 800px, 100vw"
          className="w-full h-auto"
        />
      </div>

      <div className="section-divider mb-16" />

      {/* Our Work */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">
          Our Work
        </h2>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-4">
          The Foundation supports initiatives that help people understand their
          rights, navigate legal processes, and obtain practical assistance
          before legal problems become more serious.
        </p>
        <p className="text-base font-light text-white/60 leading-[1.8]">
          This includes public-facing legal information, access-to-justice
          technology, research on legal system barriers, and partnerships with
          organizations working directly with communities that are underserved
          by the current system.
        </p>
      </section>

      {/* Our Work illustration — community workshop */}
      <div className="relative rounded-2xl overflow-hidden mb-16">
        <Image
          src="/foundation/scene-workshop.jpg"
          alt="Five diverse adults sit around a wooden table in a sunlit community-centre library while a community legal worker leans in to point at a document — books, papers, and tea between them."
          width={1584}
          height={672}
          sizes="(min-width: 800px) 800px, 100vw"
          className="w-full h-auto"
        />
      </div>

      <div className="section-divider mb-16" />

      {/* Why It Matters */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">
          Why It Matters
        </h2>
        <p className="text-base font-light text-white/60 leading-[1.8]">
          Access to justice is often discussed in institutional terms: courts,
          lawyers, tribunals, funding, and reform. Those issues matter. But for
          most people, the problem is more immediate. They need to know what
          their problem is, what their options are, what steps to take, and
          where to get help.
        </p>
      </section>

      <div className="section-divider mb-16" />

      {/* Our Approach */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">
          Our Approach
        </h2>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-4">
          The Foundation's approach is practical, evidence-informed, and
          collaborative.
        </p>
        <p className="text-base font-light text-white/60 leading-[1.8]">
          We focus on projects that can be tested, improved, and deployed. We
          are interested in tools that help real users, not demonstrations of
          technology for its own sake. We work from the premise that legal
          information must be accurate, accessible, and designed around the
          needs of the person using it.
        </p>
      </section>

      {/* Our Approach illustration — civic help desk */}
      <div className="relative rounded-2xl overflow-hidden mb-16">
        <Image
          src="/foundation/scene-help-desk.jpg"
          alt="A help-desk worker in a dusty-pink blouse leans across a wooden counter, pointing toward a stack of pamphlets, while a man holding a manila folder listens with relief."
          width={1484}
          height={572}
          sizes="(min-width: 800px) 800px, 100vw"
          className="w-full h-auto"
        />
      </div>

      <div className="section-divider mb-16" />

      {/* Board of Directors */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">
          Board of Directors
        </h2>
        <div className="grid gap-8">
          {directors.map((d) => (
            <div key={d.name} className="glass p-6">
              <h3 className="text-lg font-semibold mb-1">{d.name}</h3>
              <p className="text-xs font-light tracking-[2px] uppercase text-white/40 mb-4">
                {d.title}
              </p>
              {d.body.map((para, i) => (
                <p
                  key={i}
                  className={`text-sm font-light text-white/55 leading-relaxed ${
                    i < d.body.length - 1 ? "mb-3" : ""
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider mb-16" />

      {/* Executive Director */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">
          Executive Director
        </h2>
        <div className="glass p-6">
          <h3 className="text-lg font-semibold mb-4">Hon. Michael Bryant</h3>
          <p className="text-sm font-light text-white/55 leading-relaxed">
            Our ED has served as Executive Director and General Counsel of one
            of Canada&apos;s most established legal charities, Canadian Civil
            Liberties Association, and of the Canadian Civil Liberties
            Education Trust; and as CEO of Legal Aid BC. He also served on the
            boards of multiple charities in Canada, and taught law at
            universities in Canada and the UK. Bryant served as 35th Attorney
            General of Ontario and has been working in justice infrastructure
            systems for over twenty-five years.
          </p>
        </div>
      </section>

      <div className="section-divider mb-16" />

      {/* Contact / Get Involved */}
      <section>
        <h2 className="text-2xl font-semibold tracking-tight mb-6">
          Contact / Get Involved
        </h2>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-4">
          The Foundation welcomes conversations with legal organizations,
          community groups, researchers, funders, and technologists interested
          in improving access to justice.
        </p>
        <p className="text-base font-light text-white/60 leading-[1.8] mb-8">
          We are particularly interested in projects that combine legal
          expertise with practical deployment: tools, research, or partnerships
          that can help people understand and act on their legal rights.
        </p>
        <a
          href="mailto:foundation@justack.ai"
          className="inline-block px-6 py-3 bg-gradient-to-br from-[#7c3aed] to-[#0d9488] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity no-underline"
        >
          foundation@justack.ai
        </a>
      </section>
    </main>
  );
}
