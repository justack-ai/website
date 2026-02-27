import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A2Jai — The Manifesto | justack.ai",
  description: "Access to justice is not a feature. It is the product. The A2Jai manifesto for open source legal help tools.",
};

const sections = [
  {
    label: "Origin",
    title: "The Piepowder Courts",
    content: `In medieval England, itinerant merchants had no access to the common law courts. They were foreigners, outsiders, people passing through. So the markets created their own courts — the Courts of Piepowder — named for the dusty feet (pieds poudreux) of the traders who stood before them. Justice was dispensed the same day, in plain language, without lawyers. It worked because it had to. The alternative was no justice at all.`,
  },
  {
    label: "Problem",
    title: "The Justice Gap",
    content: `Today, over 80% of Canadians facing legal problems cannot afford a lawyer. Legal aid has been hollowed out. Courts are overwhelmed. The profession has professionalized itself into inaccessibility. The people who need justice most — tenants facing eviction, parents losing custody, workers fired without cause — are the people the system serves least. They deserve better than nothing.`,
  },
  {
    label: "Vision",
    title: "Technology as Restoration",
    content: `AI legal technology is not disruption. It is restoration. It is the return of the Piepowder Court — justice dispensed quickly, in plain language, accessible to anyone regardless of their means. We are not replacing lawyers. We are reaching the people lawyers never reach. We are building tools for the 80%.`,
  },
  {
    label: "Model",
    title: "The Dual Model",
    content: `The commercial side funds the mission. The open-source side fulfils it. Every tool we build for paying clients generates revenue that supports free tools for the public. Every open-source contribution strengthens the ecosystem that makes the commercial tools better. This is not charity. This is architecture.`,
  },
  {
    label: "Principles",
    title: "Design Principles",
    content: `Open source by default. Privacy by design. Plain language always. Regulatory respect — we work with law societies, not around them. Human-centered — every tool starts with the person facing the problem, not the technology solving it. Transparent pricing — radical in legal, necessary for trust.`,
  },
  {
    label: "Call",
    title: "Join Us",
    content: `Whether you are a developer who believes code can close the justice gap, a lawyer who wants to augment your practice, a funder who sees the market opportunity in access to justice, or someone who simply believes that everyone deserves better than nothing — there is a place for you in the justice stack.`,
  },
];

export default function A2JaiPage() {
  return (
    <main className="max-w-[900px] mx-auto px-8 py-20">
      {/* Header */}
      <div className="text-center mb-24">
        <p className="text-sm font-light tracking-[6px] uppercase text-white/30 mb-6">The Manifesto</p>
        <h1 className="text-6xl font-bold tracking-[-2px] leading-[1.05] manifesto-gradient mb-6">
          A2Jai
        </h1>
        <p className="text-xl font-light text-white/40 tracking-wide max-w-[600px] mx-auto leading-relaxed">
          Access to Justice through Artificial Intelligence — a framework for building legal help tools that serve the people the system forgot.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-24">
        {sections.map((section, i) => (
          <div key={i} className="relative">
            <span className="text-[11px] font-light tracking-[3px] uppercase text-purple-400 mb-3 block">
              {section.label}
            </span>
            <h2 className="text-3xl font-bold tracking-tight mb-6">{section.title}</h2>
            <p className="text-lg font-light text-white/60 leading-[1.8] tracking-wide">
              {section.content}
            </p>
            {i < sections.length - 1 && (
              <div className="section-divider mt-24" />
            )}
          </div>
        ))}
      </div>

      {/* Closing */}
      <div className="text-center mt-32">
        <p className="text-[48px] font-bold tracking-[-1.5px] leading-[1.1] manifesto-gradient">
          They deserve better than nothing.
        </p>
        <p className="text-sm font-light text-white/30 tracking-[2px] uppercase mt-6">
          — A2Jai · justack.ai
        </p>
      </div>
    </main>
  );
}
