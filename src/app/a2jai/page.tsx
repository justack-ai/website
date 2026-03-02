"use client";

import { useEffect, useState, useRef } from "react";
import type { Metadata } from "next";

/* ── Pull quotes: key lines from the manifesto ── */
const pullQuotes: Record<number, string> = {
  0: "The failure is institutional, not individual. But the institution has failed.",
  3: "What we lost was not excellence. It was access.",
  4: "This is not a futuristic novelty. It is the return of the accessible court.",
  5: "The commercial side funds the mission. The open-source side fulfils it.",
  7: "They deserve better than nothing.",
};

/* ── Historical timeline data ── */
const timelineEras = [
  { year: "5th c. BC", label: "Athens", desc: "Lay dicasts — citizens deciding cases" },
  { year: "1361", label: "Justices of the Peace", desc: "Local dispute resolution" },
  { year: "Medieval", label: "Piepowder Courts", desc: "Justice at fairs and markets" },
  { year: "19th c.", label: "Professionalization", desc: "Access regulated out of existence" },
  { year: "20th c.", label: "Legal Aid", desc: "Partial remedy, insufficient reach" },
  { year: "Now", label: "AI + A2Jai", desc: "Restoring practical justice", active: true },
];

/* ── All 8 manifesto sections — verbatim from Google Doc ── */
const sections = [
  {
    label: "Crisis",
    title: "The System as It Stands",
    paragraphs: [
      `The legal system in Canada operates, for most people, in one of two modes: dormant or predatory.`,
      `Dormant, in that it is irrelevant to people experiencing unfairness, exploitation, and injustice in their daily lives — wrongs for which the courts could provide a remedy but cannot, because the system lies inert for the masses. Those gifts are bought and sold, but not for them.`,
      `Predatory, because those without resources encounter the system only as an instrument of harm — selective policing, systemic discrimination documented and conceded by nearly every government in Canada, and a family law apparatus that is whispered about in despair. Meanwhile, the wealthy deploy the system as a weapon, pursuing relief that the rest of the population cannot access. The great power that justice embodies ends up wielded only by the privileged, to the detriment of everyone else.`,
      `This did not happen by accident. It accumulated — over two centuries of professionalization — through overhead, specialization, billable-hour economics, and the consolidation of legal practice into a credentialed profession. The gains in rigour, procedural fairness, and doctrinal sophistication are real. But they came at a cost that was never explicitly debated, never put to a democratic vote: the cost of access.`,
      `That trade-off has produced what the Supreme Court of Canada has called a "culture of complacency." The bar and bench hold a monopoly over this system — over access to it and over its inaccessibility. They have proven unable or unwilling to disrupt it.`,
      `This is not an indictment of every lawyer. Within the defence bar, lawyers exist who will accept fees as low as a thousand dollars for early resolution of a criminal matter, delivering extraordinary value. Duty counsel, legal aid lawyers, and pro bono practitioners carry impossible caseloads for inadequate compensation, because they believe in the system's promise. The failure is institutional, not individual. But the institution has failed.`,
    ],
  },
  {
    label: "Economics",
    title: "The Economic Failure",
    paragraphs: [
      `The access-to-justice crisis is, at its core, a market failure.`,
      `Legal aid requires household income below a threshold describing genuine poverty. Above that line sits the majority of the population — unable to qualify for legal aid, unable to afford counsel. For the corporate client, lawyers are a cost of doing business. For the rest of the democracy, they are an unaffordable curiosity — a promise unfulfilled.`,
      `The A2J movement — call it 1.0 — arose because responsible people tried to remedy this. Committees were formed, luminaries convened — many of whom became luminaries through the very dynamics that created the crisis. The movement produced awareness, research, and good intentions. It did not produce access.`,
    ],
  },
  {
    label: "Perception",
    title: "The Perception Failure",
    paragraphs: [
      `Compounding the economic failure is a failure of information — and it is just as damaging.`,
      `Most people do not know that affordable legal help exists. They assume all lawyers are unaffordable, and most lawyers have done nothing to correct that assumption. This ignorance is itself an access-to-justice failure.`,
      `The deeper problem is one of perceived value. In a consumer culture conditioned by the logic of the deal, the discount, and the comparison shop, justice has been devalued by the very people who need it most. If your information about the legal system comes from social media and sensationalized coverage, you will undervalue the system and its actors. Judges? Biased, many assume. Lawyers? A terrible bargain.`,
      `The corollary to overvaluation by insiders is total devaluation by everyone else. The verdict of the public is clear: the system's value is entirely obscured by its overpricing, relative to the market it purports to serve.`,
    ],
  },
  {
    label: "History",
    title: "What We Lost",
    paragraphs: [
      `It was not always so.`,
      `The lay dicasts of Athens were ordinary citizens deciding cases by the hundreds. The early Justices of the Peace, following the Statute of 1361, were local figures resolving disputes without a professionalized bar. The Courts of Piepowder — what Blackstone called the most expeditious court of justice known to the law of England — adjudicated commercial disputes at fairs and markets, on the spot, before merchants could leave town.`,
      `Much of it was crude, sometimes brutal. But it was justice of a kind: accessible, timely, and comprehensible to the people it served. Call it practical justice — not perfect, but immediate, available, and understood by those who used it. For most of legal history, that was all democracies asked of their courts.`,
      `By the late nineteenth century — through the procedural fusion of law and equity, the professionalization of the judiciary, and the rise of the credentialed profession — that practical justice was regulated out of existence. The compound logic of professionalization priced it out of the market.`,
      `What we lost was not excellence. It was access.`,
    ],
  },
  {
    label: "Opportunity",
    title: "The AI Opportunity",
    paragraphs: [
      `AI brings three distinct opportunities to restore it.`,
      `Augmentation. AI permits the augmentation of lawyers, creating efficiencies that may eventually be passed to the consumer through lower prices. Corporate in-house counsel are already adopting AI at twice the rate of law firms. At a minimum, the law firm business model will change. Companies will rely on outside counsel less, because they can, at a level of risk and cost that is manageable. Firms that adapt will thrive. Firms that do not will face an existential reckoning.`,
      `Information access. AI permits access to legal information and knowledge that, even if inferior to what lawyers acquire through decades of practice, is vastly superior to the status quo — which, for most people, is nothing. The evidence is already visible in subscription platforms offering affordable legal instruments to small businesses and individuals.`,
      `Productization. This is the crux. The productization of legal assistance offers an opportunity for practical justice of a kind not seen since the Piepowder Courts. Consumers show little aversion to the associated risk. The disclaimers are familiar and accepted. For the vast majority of the population lacking timely or affordable legal aid, AI legal technology represents a highly valuable asset, worth the risk, because it is so much better than nothing.`,
      `Consider what this looks like in practice: an individual facing eviction uses A2Jai to identify applicable statutory protections, generate a statement of defence, and file within the limitation period — a process that currently requires thousands of dollars in legal fees or months on a legal aid waitlist. A small business owner receives a demand letter and, within minutes, understands her rights, her exposure, and her options. A father navigating a custody dispute in Brampton accesses guided assistance that helps him prepare materials for court — not a replacement for counsel, but infinitely better than walking in with nothing.`,
      `This is not a futuristic novelty. It is the return of the accessible court, improved by technology to a level approaching the professional product. Neither the Piepowder Court nor an AI application is perfect. But both are accessible — and access is what has been missing for two centuries.`,
    ],
  },
  {
    label: "Project",
    title: "A2Jai: The Project",
    paragraphs: [
      `A2Jai is building AI-powered legal technology — both commercial and open-source — designed to disrupt the access-to-justice crisis from both ends of the market.`,
      `For lawyers: tools that augment practice, reduce overhead, and create efficiencies that make affordable representation economically viable.`,
      `For consumers: products that provide legal information, knowledge, and guided assistance at a price point and accessibility level that the current system cannot match.`,
      `For the ecosystem: open-source models that permit developers, legal academics, and technologists to build on A2Jai's infrastructure, extending access beyond what any single company can achieve.`,
      `The commercial side funds the mission. The open-source side fulfils it.`,
      `A2Jai is committed to maintaining that duality by design. The open-source infrastructure is not a phase to be outgrown. It is a structural commitment — because the access-to-justice crisis will not be solved by any single company, and the tools to address it should not be locked behind a paywall. The commercial products sustain the enterprise; the open-source models ensure that the mission outlives any business decision.`,
    ],
  },
  {
    label: "Author",
    title: "Who Is Behind This",
    paragraphs: [
      `A2Jai is designed, developed, and authored by Michael Bryant — former Attorney General of Ontario, former CEO of the Canadian Civil Liberties Association, former CEO of Legal Aid BC, and a person who has experienced the justice system from its most privileged corridors to its most unforgiving depths. Charged with two serious criminal offences, represented by Marie Henein, and ultimately acquitted, Bryant has since spent a decade in the spaces where the system's failures are most visible: homeless shelters, recovery meetings, the Downtown Eastside of Vancouver, and the bail court cells of Brampton.`,
      `That range of experience — from the pinnacle of the profession to its point of greatest need — informs every product A2Jai builds.`,
    ],
  },
  {
    label: "Invitation",
    title: "The Invitation",
    paragraphs: [
      `A2Jai is a personal project that is designed to become a collective one. It needs open-source developers, computer scientists, legal technologists, and investors who understand that the access-to-justice crisis is not merely a social problem — it is a market opportunity of extraordinary scale, serving a population that the legal profession has inadvertently abandoned.`,
      `AI will not replace the bar. But it may restore to the masses the practical justice that the bar, inadvertently, priced out of existence.`,
      `Every day this system remains unchanged, thousands of people across Canada face the courts alone — unrepresented, uninformed, and overmatched. They deserve better than nothing. A2Jai is built to give them better than nothing.`,
      `That is the project. That is A2Jai.`,
    ],
  },
];

/* ── Section accent colors (subtle, per-section identity) ── */
const sectionAccents = [
  "rgba(239, 68, 68, 0.5)",   // Crisis — red
  "rgba(234, 179, 8, 0.5)",   // Economics — amber
  "rgba(168, 85, 247, 0.5)",  // Perception — purple
  "rgba(13, 148, 136, 0.5)",  // History — teal
  "rgba(59, 130, 246, 0.5)",  // Opportunity — blue
  "rgba(139, 92, 246, 0.5)",  // Project — violet
  "rgba(94, 234, 212, 0.5)",  // Author — light teal
  "rgba(96, 165, 250, 0.5)",  // Invitation — light blue
];

/* ── Timeline Component ── */
function HistoricalTimeline() {
  return (
    <div className="my-16 py-10 px-6 relative">
      <p className="text-[11px] font-light tracking-[4px] uppercase text-teal-400/60 text-center mb-10">
        The Arc of Access
      </p>
      <div className="relative max-w-[900px] mx-auto">
        {/* Connecting line */}
        <div
          className="absolute top-[28px] left-[5%] right-[5%] h-[1px]"
          style={{
            background: "linear-gradient(90deg, rgba(13,148,136,0.1), rgba(139,92,246,0.4), rgba(13,148,136,0.4), rgba(139,92,246,0.3), rgba(239,68,68,0.3), rgba(94,234,212,0.6))",
          }}
        />
        <div className="flex justify-between relative">
          {timelineEras.map((era, i) => (
            <div key={i} className="flex flex-col items-center text-center flex-1 px-1">
              {/* Node */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mb-3 border ${
                  era.active
                    ? "border-teal-400/60 bg-teal-500/10"
                    : i < 3
                      ? "border-white/10 bg-white/[0.03]"
                      : "border-red-400/20 bg-red-500/[0.03]"
                }`}
                style={era.active ? { boxShadow: "0 0 16px rgba(13,148,136,0.3)" } : {}}
              >
                <div className={`w-2 h-2 rounded-full ${
                  era.active ? "bg-teal-400" : i < 3 ? "bg-white/20" : "bg-red-400/30"
                }`} />
              </div>
              {/* Year */}
              <span className={`text-[10px] tracking-[1px] mb-1 ${
                era.active ? "text-teal-400/80" : "text-white/25"
              }`}>
                {era.year}
              </span>
              {/* Label */}
              <span className={`text-xs font-semibold tracking-tight mb-1 ${
                era.active ? "text-white" : "text-white/40"
              }`}>
                {era.label}
              </span>
              {/* Description */}
              <span className="text-[10px] font-light text-white/25 leading-tight max-w-[100px]">
                {era.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Pull Quote Component ── */
function PullQuote({ text }: { text: string }) {
  return (
    <div className="my-12 mx-auto max-w-[720px]">
      <div
        className="relative py-8 px-10 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderLeft: "3px solid rgba(139, 92, 246, 0.5)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3), 0 0 40px rgba(139,92,246,0.04)",
        }}
      >
        <div className="absolute -top-3 left-8 text-4xl text-violet-400/20 font-serif select-none">&ldquo;</div>
        <p className="text-xl font-light text-white/80 leading-[1.7] tracking-wide italic">
          {text}
        </p>
      </div>
    </div>
  );
}

/* ── Section Navigation (sticky sidebar) ── */
function SectionNav({ activeSection }: { activeSection: number }) {
  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3">
      {sections.map((section, i) => (
        <a
          key={i}
          href={`#section-${i}`}
          className="group flex items-center gap-3 no-underline transition-all duration-300"
        >
          <div
            className={`w-1.5 rounded-full transition-all duration-300 ${
              i === activeSection ? "h-6 bg-violet-400" : "h-1.5 bg-white/15 group-hover:bg-white/30"
            }`}
          />
          <span
            className={`text-[10px] tracking-[2px] uppercase transition-all duration-300 ${
              i === activeSection
                ? "text-violet-400 opacity-100 translate-x-0"
                : "text-white/0 group-hover:text-white/40 -translate-x-2 group-hover:translate-x-0"
            }`}
          >
            {section.label}
          </span>
        </a>
      ))}
    </nav>
  );
}

/* ── Main Page ── */
export default function A2JaiPage() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -50% 0px" }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SectionNav activeSection={activeSection} />

      <main className="max-w-[820px] mx-auto px-8 py-20">
        {/* Header */}
        <div className="text-center mb-32 relative">
          {/* Background glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full opacity-20 blur-[100px] -z-[1]"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)" }}
          />
          <p className="text-sm font-light tracking-[6px] uppercase text-white/30 mb-6">
            The Manifesto
          </p>
          <h1
            className="text-7xl font-bold tracking-[-3px] leading-[1.05] manifesto-gradient mb-6"
            style={{ textShadow: "0 0 80px rgba(139,92,246,0.2)" }}
          >
            A2Jai
          </h1>
          <p className="text-xl font-light text-white/40 tracking-wide max-w-[600px] mx-auto leading-relaxed">
            Restoring Access to Justice in the Age of AI
          </p>
          {/* Scroll hint */}
          <div className="mt-16 flex flex-col items-center gap-2 text-white/15">
            <span className="text-[10px] tracking-[3px] uppercase">Read</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M8 4v12M4 12l4 4 4-4" />
            </svg>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-0">
          {sections.map((section, i) => (
            <div
              key={i}
              id={`section-${i}`}
              ref={(el) => { sectionRefs.current[i] = el; }}
              className="scroll-mt-20"
            >
              {/* Section header */}
              <div className="mb-10 relative">
                <span
                  className="text-[11px] font-light tracking-[4px] uppercase mb-3 block"
                  style={{ color: sectionAccents[i] }}
                >
                  {section.label}
                </span>
                <h2
                  className="text-4xl font-bold tracking-[-1px] leading-tight"
                  style={{ textShadow: `0 0 40px ${sectionAccents[i].replace("0.5", "0.15")}` }}
                >
                  {section.title}
                </h2>
                {/* Accent line under title */}
                <div
                  className="mt-4 w-12 h-[2px] rounded-full"
                  style={{ background: sectionAccents[i] }}
                />
              </div>

              {/* Section paragraphs */}
              <div className="space-y-6 mb-8">
                {section.paragraphs.map((paragraph, j) => {
                  // First paragraph of first section gets drop cap treatment
                  const isDropCap = i === 0 && j === 0;
                  return (
                    <p
                      key={j}
                      className={`text-[17px] font-light text-white/55 leading-[1.85] tracking-[0.01em] ${
                        isDropCap ? "first-letter:text-5xl first-letter:font-bold first-letter:text-white/80 first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-[0.8]" : ""
                      }`}
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Pull quote (if this section has one) */}
              {pullQuotes[i] && <PullQuote text={pullQuotes[i]} />}

              {/* Historical timeline (after "What We Lost" section) */}
              {i === 3 && <HistoricalTimeline />}

              {/* Section divider */}
              {i < sections.length - 1 && (
                <div className="py-16 flex justify-center">
                  <div
                    className="w-16 h-[1px]"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${sectionAccents[i]}, transparent)`,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Closing crescendo ── */}
        <div className="text-center mt-32 mb-20 relative">
          {/* Background glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-15 blur-[120px] -z-[1]"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.5), rgba(13,148,136,0.3), transparent 70%)" }}
          />

          <div className="section-divider mb-16" />

          <p
            className="text-[56px] font-bold tracking-[-2px] leading-[1.05] manifesto-gradient mb-6"
            style={{ textShadow: "0 0 80px rgba(139,92,246,0.3), 0 0 160px rgba(13,148,136,0.1)" }}
          >
            They deserve better<br />than nothing.
          </p>
          <p className="text-2xl font-light text-white/25 tracking-tight mt-6 leading-relaxed max-w-[500px] mx-auto">
            A2Jai is built to give them better than nothing.
          </p>

          <div className="mt-16">
            <p className="text-sm font-light text-white/15 tracking-[3px] uppercase">
              That is the project. That is A2Jai.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
