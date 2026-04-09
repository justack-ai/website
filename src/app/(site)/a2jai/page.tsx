/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "A2Jai — Restoring Access to Justice | justack.ai",
  description:
    "The A2Jai manifesto: restoring access to justice in the age of AI. By Michael Bryant.",
};

/* ── Historical timeline data ── */
const timelineEras = [
  { year: "5th c. BC", label: "Athens", desc: "Lay dicasts \u2014 citizens deciding cases" },
  { year: "1361", label: "Justices of the Peace", desc: "Local dispute resolution" },
  { year: "Medieval", label: "Piepowder Courts", desc: "Justice at fairs and markets" },
  { year: "19th c.", label: "Professionalization", desc: "Access regulated out of existence" },
  { year: "20th c.", label: "Legal Aid", desc: "Partial remedy, insufficient reach" },
  { year: "Now", label: "AI + A2Jai", desc: "Restoring practical justice" },
];

/* ── All 8 manifesto sections ── */
const sections: {
  label: string;
  title: string;
  paragraphs: string[];
  timelineAfter?: boolean;
  image?: string;
}[] = [
  {
    label: "Crisis",
    title: "The System as It Stands",
    image: "/images/manifesto/crisis.webp",
    paragraphs: [
      `The legal system in Canada operates, for most people, in one of two modes: dormant or predatory.`,
      `Dormant, in that it is irrelevant to people experiencing unfairness, exploitation, and injustice in their daily lives \u2014 wrongs for which the courts could provide a remedy but cannot, because the system lies inert for the masses. Those gifts are bought and sold, but not for them.`,
      `Predatory, because those without resources encounter the system only as an instrument of harm \u2014 selective policing, systemic discrimination documented and conceded by nearly every government in Canada, and a family law apparatus that is whispered about in despair. Meanwhile, the wealthy deploy the system as a weapon, pursuing relief that the rest of the population cannot access. The great power that justice embodies ends up wielded only by the privileged, to the detriment of everyone else.`,
      `This did not happen by accident. It accumulated \u2014 over two centuries of professionalization \u2014 through overhead, specialization, billable-hour economics, and the consolidation of legal practice into a credentialed profession. The gains in rigour, procedural fairness, and doctrinal sophistication are real. But they came at a cost that was never explicitly debated, never put to a democratic vote: the cost of access.`,
      `That trade-off has produced what the Supreme Court of Canada has called a \u201Cculture of complacency,\u201D in the criminal law context, but the tag applies throughout the system. The bar and bench hold a monopoly over this system \u2014 over access to it and over its inaccessibility. They have proven unable or unwilling to disrupt it.`,
      `This is not an indictment of every lawyer. Within the defence bar, and spotty exceptions in BigLaw, many lawyers accept fees so low that it\u2019s not easy to make a good living, despite delivering extraordinary value. Duty counsel, legal aid lawyers, and pro bono practitioners carry impossible caseloads for inadequate compensation, because they believe in the system\u2019s promise. The failure is institutional, not individual. But the institutional failure is devastating.`,
    ],
  },
  {
    label: "Economics",
    title: "The Economic Failure",
    image: "/images/manifesto/economics.webp",
    paragraphs: [
      `The access-to-justice crisis is, at its core, a market failure.`,
      `Legal aid is primarily for criminal law, some family law, and some provinces provide variations on the theme of poverty law, while Ontario has a cluster of legal aid clinics that serve a variety of needs. However, to qualify for legal aid requires household income below a threshold describing genuine poverty. Above that line sits the majority of the population \u2014 unable to qualify for legal aid, unable to afford counsel. For the medium to large corporate client, lawyers are a cost of doing business. For the rest of the democracy, they are an unaffordable curiosity \u2014 a promise unfulfilled.`,
      `The A2J movement \u2014 call it 1.0 \u2014 arose because responsible people tried to remedy this. Committees were formed, luminaries convened \u2014 many of whom became luminaries through the very dynamics that created the crisis. The movement produced awareness, research, and good intentions. It did not produce access.`,
    ],
  },
  {
    label: "Perception",
    title: "The Perception Failure",
    image: "/images/manifesto/perception.webp",
    paragraphs: [
      `Compounding the economic failure is a failure of information \u2014 and it is just as damaging.`,
      `Most people do not know that some affordable legal help exists in pockets of the system. They assume all lawyers are unaffordable, and most lawyers have done nothing to correct that assumption. This ignorance is itself an access-to-justice failure.`,
      `The deeper problem is one of perceived value. In a consumer culture conditioned by the logic of the deal, the discount, and the comparison shop, justice has been devalued by the very people who need it most. If your information about the legal system comes from social media and sensationalized coverage, you will undervalue the system and its actors. Judges? Biased, many assume. Lawyers? A terrible bargain.`,
      `The corollary to overvaluation by insiders is total devaluation by everyone else. The verdict of the public is clear: the system\u2019s value is entirely obscured by its overpricing, relative to the market it purports to serve.`,
    ],
  },
  {
    label: "History",
    title: "What We Lost",
    timelineAfter: true,
    image: "/images/manifesto/history.webp",
    paragraphs: [
      `It was not always so, it seems.`,
      `Maybe this is ancient historical nostalgia nonsense, but there is plenty of scholarship validating that the lay dicasts of Athens were ordinary citizens deciding cases by the hundreds. The early Justices of the Peace, following the Statute of 1361, were local figures resolving disputes without a professionalized bar. The Courts of Piepowder \u2014 what Blackstone called the most expeditious court of justice known to the law of England \u2014 adjudicated commercial disputes at fairs and markets, on the spot, before merchants could leave town.`,
      `Much of it was crude, sometimes brutal. But it was justice of a kind: accessible, timely, and comprehensible to the people it served. Call it practical justice \u2014 not perfect, but immediate, available, and understood by those who used it. For most of legal history, that was all democracies asked of their courts.`,
      `By the late nineteenth century \u2014 through the procedural fusion of law and equity, the professionalization of the judiciary, and the rise of the credentialed profession \u2014 that practical justice was regulated out of existence. The compound logic of professionalization priced it out of the market.`,
      `What we gained to perfectionism and excellence, we lost to access.`,
    ],
  },
  {
    label: "Opportunity",
    title: "The New Opportunity",
    image: "/images/manifesto/opportunity.webp",
    paragraphs: [
      `The proliferation of legal tech developments and AI brings three distinct opportunities to democratize legal help.`,
      `Augmentation. AI permits the augmentation of lawyers, creating efficiencies that may eventually be passed to the consumer through lower prices. Corporate in-house counsel are already adopting AI at twice the rate of law firms. At a minimum, the law firm business model will change. Companies will rely on outside counsel less, because they can, at a level of risk and cost that is manageable. Firms that adapt will thrive. Firms that do not will face an existential reckoning.`,
      `Information access. AI permits access to legal information and knowledge that, even if inferior to what lawyers acquire through decades of practice, is vastly superior to the status quo \u2014 which, for most people, is nothing. The evidence is already visible in subscription platforms offering affordable legal instruments to small businesses and individuals.`,
      `Productization. This is the crux. The productization of legal assistance offers an opportunity for practical justice of a kind not seen since the Piepowder Courts (the what? Scroll up for the reference). Consumers show little aversion to the associated risk. The disclaimers are familiar and accepted. For the vast majority of the population lacking timely or affordable legal aid, AI legal technology represents a highly valuable asset, worth the risk, because it is so much better than nothing.`,
      `Consider what this looks like in practice: an individual facing eviction uses A2Jai software or agents to identify applicable statutory protections, generate a statement of defence, and file within the limitation period \u2014 a process that currently requires thousands of dollars in legal fees or months on a legal aid waitlist. A small business owner receives a demand letter and, within minutes, understands her rights, her exposure, and her options. A mother navigating a custody dispute in Brampton accesses guided assistance that helps her prepare materials for court \u2014 not a replacement for counsel, but infinitely better than walking in with a pile of randomly useless evidence.`,
      `A2Jai marks the beginning of a more accessible judicial system, improved by technology to a level approaching the professional product. Neither the Piepowder Court nor an AI application is perfect. But both are accessible \u2014 and access is what has been missing for two centuries.`,
    ],
  },
  {
    label: "Project",
    title: "A2Jai: The Project",
    image: "/images/manifesto/project.webp",
    paragraphs: [
      `A2Jai is building processor-powered legal technology \u2014 both commercial and open-source \u2014 designed to disrupt the access-to-justice crisis from both ends of the market.`,
      `For lawyers: tools that augment practice, reduce overhead, and create efficiencies that make affordable representation economically viable.`,
      `For consumers: products that provide legal information, knowledge, and guided assistance at a price point and accessibility level that the current system cannot match.`,
      `For the ecosystem: open-source tools that permit developers, legal academics, and technologists to build on A2Jai\u2019s infrastructure, extending access beyond what any single company can achieve.`,
      `The commercial side funds the mission. The open-source side fulfils it, in limited form, but more fully through a freemium model that is actually affordable. Is $29 a lot to use an app? Even if it was a tenth of the cost, which is an understatement, $29 is in the realm of affordable, whereas $300 (and I don\u2019t know of a contract lawyer who could review a lease for $300) is totally off the table for almost every tenant outside the luxury class. Tenants don\u2019t see retaining a lawyer, itself a search for the Holy Grail, as an expense worth considering, so they don\u2019t even explore whether their lease is legally sound, by getting legal help. Doesn\u2019t cross their mind! Instead, they DIY with social media intelligence gathering.`,
      `A2Jai is committed to maintaining that duality by design. The open-source infrastructure is not a phase to be outgrown. It is a structural commitment \u2014 because the access-to-justice crisis will not be solved by any single company, and the tools to address it should not be locked behind a premium paywall.`,
    ],
  },
  {
    label: "Author",
    title: "Who Is Behind This",
    image: "/images/manifesto/author.webp",
    paragraphs: [
      `A2Jai is designed, developed, funded and authored by Michael Bryant \u2014 former Attorney General of Ontario, former CEO of the Canadian Civil Liberties Association, former CEO of Legal Aid BC, and a person who has experienced the justice system from its most privileged corridors to its most unforgiving depths. Charged with two serious criminal offences, represented by Marie Henein, and ultimately the charges were withdrawn by the Special Prosecutor. Bryant has since spent a decade in the spaces where the system\u2019s failures are most visible: homeless shelters, recovery meetings, the Downtown Eastside of Vancouver, and the bail court cells of Brampton.`,
      `That range of experience \u2014 from the pinnacle of the profession to its point of greatest need \u2014 informs every product A2Jai builds.`,
    ],
  },
  {
    label: "Invitation",
    title: "The Invitation",
    image: "/images/manifesto/invitation.webp",
    paragraphs: [
      `A2Jai is a personal project designed for a collective. It needs open-source developers, computer scientists, legal technologists, and professionals who understand that the access-to-justice crisis is a market opportunity of extraordinary scale, serving a population that the legal profession has inadvertently abandoned.`,
      `AI will not replace the bar. But it may restore to the masses the practical justice that the bar, inadvertently, priced out of existence.`,
      `Every day this system remains unchanged, many thousands of people across Canada face the courts alone \u2014 unrepresented, uninformed, and overmatched. They deserve better than nothing. A2Jai is built to give them better than nothing.`,
      `That is the project. That is A2Jai.`,
    ],
  },
];

/* ── Section accent colors ── */
const sectionAccents = [
  "rgba(239, 68, 68, 0.5)",   // Crisis
  "rgba(234, 179, 8, 0.5)",   // Economics
  "rgba(168, 85, 247, 0.5)",  // Perception
  "rgba(13, 148, 136, 0.5)",  // History
  "rgba(59, 130, 246, 0.5)",  // Opportunity
  "rgba(139, 92, 246, 0.5)",  // Project
  "rgba(94, 234, 212, 0.5)",  // Author
  "rgba(96, 165, 250, 0.5)",  // Invitation
];

/* ── Arc of Access Table ── */
function ArcOfAccessTable() {
  return (
    <div className="my-16">
      <p className="text-[11px] font-light tracking-[4px] uppercase text-teal-400/60 text-center mb-8">
        The Arc of Access
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-[11px] font-light tracking-[2px] uppercase text-white/30 w-[120px]">
                Period
              </th>
              <th className="text-left py-3 px-4 text-[11px] font-light tracking-[2px] uppercase text-white/30 w-[200px]">
                Institution
              </th>
              <th className="text-left py-3 px-4 text-[11px] font-light tracking-[2px] uppercase text-white/30">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {timelineEras.map((era, i) => {
              const isLast = i === timelineEras.length - 1;
              return (
                <tr
                  key={i}
                  className={`border-b border-white/[0.04] ${isLast ? "text-teal-300/80" : "text-white/50"}`}
                >
                  <td className={`py-3 px-4 font-light ${isLast ? "text-teal-400/70" : "text-white/30"}`}>
                    {era.year}
                  </td>
                  <td className={`py-3 px-4 font-medium ${isLast ? "text-teal-300/90" : "text-white/60"}`}>
                    {era.label}
                  </td>
                  <td className="py-3 px-4 font-light">
                    {era.desc}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function A2JaiPage() {
  return (
    <main className="max-w-[820px] mx-auto px-6 md:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-24">
        <p className="text-sm font-light tracking-[6px] uppercase text-white/30 mb-6">
          The Manifesto
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-[-3px] leading-[1.05] manifesto-gradient mb-6">
          A2Jai
        </h1>
        <p className="text-xl font-light text-white/40 tracking-wide max-w-[600px] mx-auto leading-relaxed">
          Restoring Access to Justice in the Age of AI
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-24">
        {sections.map((section, i) => (
          <section key={i}>
            {/* Section header */}
            <div className="mb-8">
              <span
                className="text-[11px] font-light tracking-[4px] uppercase mb-3 block"
                style={{ color: sectionAccents[i] }}
              >
                {section.label}
              </span>
              <h2 className="text-3xl font-bold tracking-[-0.5px] leading-tight">
                {section.title}
              </h2>
              <div
                className="mt-4 w-12 h-[2px] rounded-full"
                style={{ background: sectionAccents[i] }}
              />
            </div>

            {/* Section illustration */}
            {section.image && (
              <div className="mb-8 rounded-xl overflow-hidden opacity-90">
                <Image
                  src={section.image}
                  alt={section.title}
                  width={820}
                  height={360}
                  className="w-full h-auto"
                  priority={i === 0}
                />
              </div>
            )}

            {/* Paragraphs */}
            <div className="space-y-6">
              {section.paragraphs.map((paragraph, j) => (
                <p
                  key={j}
                  className="text-[17px] font-light text-white/55 leading-[1.85] tracking-[0.01em]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Arc of Access table (after History section) */}
            {section.timelineAfter && <ArcOfAccessTable />}
          </section>
        ))}
      </div>

      {/* Closing */}
      <div className="text-center mt-24 mb-12">
        <div className="w-16 h-[1px] mx-auto mb-12" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)" }} />
        <p className="text-sm font-light text-white/20 tracking-[3px] uppercase">
          That is the project. That is A2Jai.
        </p>
      </div>
    </main>
  );
}
