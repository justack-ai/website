/*
 * Copyright 2026 Humilitas Group Limited. All Rights Reserved.
 *
 * This file contains proprietary content including product names,
 * descriptions, and roadmap information. This content is NOT covered
 * by the Mozilla Public License 2.0 that governs the project's source
 * code. You may not reproduce, distribute, or create derivative works
 * from this content for commercial purposes without written permission
 * from Humilitas Group Limited.
 *
 * The open source license (MPL-2.0) applies to source code only and
 * does not extend to website content, product descriptions, or
 * marketing materials contained in this file.
 */

export type ToolStatus = "live" | "coming-soon" | "in-development";

export type PracticeArea =
  | "housing"
  | "criminal"
  | "employment"
  | "family"
  | "consumer"
  | "practitioner"
  | "developer";

export interface RoadmapTool {
  name: string;
  slug: string;
  description: string;
  status: ToolStatus;
  practiceArea: PracticeArea;
  href?: string;
  external?: boolean;
}

export const practiceAreaColors: Record<PracticeArea, string> = {
  housing: "#a855f7",
  criminal: "#ef4444",
  employment: "#ef4444",
  family: "#eab308",
  consumer: "#3b82f6",
  practitioner: "#0d9488",
  developer: "#6366f1",
};

export const practiceAreaLabels: Record<PracticeArea, string> = {
  housing: "Housing",
  criminal: "Criminal",
  employment: "Employment",
  family: "Family",
  consumer: "Consumer",
  practitioner: "Practitioner",
  developer: "Developer",
};

export const statusConfig: Record<ToolStatus, { label: string; color: string; bg: string }> = {
  live: { label: "Live", color: "#22c55e", bg: "rgba(34, 197, 94, 0.12)" },
  "coming-soon": { label: "Coming Soon", color: "#eab308", bg: "rgba(234, 179, 8, 0.12)" },
  "in-development": { label: "In Development", color: "#3b82f6", bg: "rgba(59, 130, 246, 0.12)" },
};

export const liveTools: RoadmapTool[] = [
  {
    name: "RenterShield",
    slug: "rentershield",
    description: "Lease compliance audit for Toronto renters. Upload your lease, get a plain-language report on what\u2019s enforceable and what\u2019s not.",
    status: "live",
    practiceArea: "housing",
    href: "https://rentershield.justack.ai",
    external: true,
  },
  {
    name: "Termtool",
    slug: "termtool",
    description: "Privacy policy and terms generator for Shopify app developers. Scoped to your actual API permissions.",
    status: "live",
    practiceArea: "developer",
    href: "https://apps.shopify.com/termtool",
    external: true,
  },
  {
    name: "Box45Calculator",
    slug: "box45calculator",
    description: "Canadian tax Box 45 calculator for bookkeepers. Built for T4/T5 slip preparation season.",
    status: "live",
    practiceArea: "consumer",
    href: "https://box45calculator.ca",
    external: true,
  },
  {
    name: "InstructIT",
    slug: "instructit",
    description: "Auditable client instruction capture for lawyers. Structured intake with a defensible record of what the client said.",
    status: "live",
    practiceArea: "practitioner",
    href: "/instructit",
  },
];

export const phase1Tools: RoadmapTool[] = [
  {
    name: "Charter Delay Calculator",
    slug: "charter-delay-calculator",
    description: "Calculates whether a criminal case has exceeded constitutional time limits. For defence counsel and duty counsel.",
    status: "coming-soon",
    practiceArea: "criminal",
  },
  {
    name: "Bail Conditions Tool",
    slug: "bail-conditions-tool",
    description: "Translates court-ordered bail conditions into plain language. For accused persons and sureties.",
    status: "coming-soon",
    practiceArea: "criminal",
  },
  {
    name: "Court Deadline Calculator",
    slug: "court-deadline-calculator",
    description: "Criminal procedure deadline tracker. Never miss a filing date.",
    status: "coming-soon",
    practiceArea: "criminal",
  },
  {
    name: "Record Suspension Guide",
    slug: "record-suspension-guide",
    description: "Step-by-step eligibility guide for people seeking a criminal record suspension.",
    status: "coming-soon",
    practiceArea: "criminal",
  },
];

export const phase2Tools: RoadmapTool[] = [
  {
    name: "Severance Calculator",
    slug: "severance-calculator",
    description: "Understand whether your severance offer is fair. Covers statutory and common law entitlements.",
    status: "coming-soon",
    practiceArea: "employment",
  },
  {
    name: "Employment Standards Calculator",
    slug: "employment-standards-calculator",
    description: "Check your entitlements under the Employment Standards Act. Overtime, vacation, termination.",
    status: "coming-soon",
    practiceArea: "employment",
  },
  {
    name: "Small Claims Toolkit",
    slug: "small-claims-toolkit",
    description: "Everything you need to file or defend a small claims case in Ontario.",
    status: "coming-soon",
    practiceArea: "consumer",
  },
];

export const phase3Tools: RoadmapTool[] = [
  {
    name: "Financial Statement Generator",
    slug: "financial-statement-generator",
    description: "Generates mandatory financial disclosure forms for family law proceedings.",
    status: "coming-soon",
    practiceArea: "family",
  },
  {
    name: "Separation Guide",
    slug: "separation-guide",
    description: "Step-by-step guide through separation and divorce. Property, support, parenting, process.",
    status: "coming-soon",
    practiceArea: "family",
  },
  {
    name: "Court Form Generator",
    slug: "court-form-generator",
    description: "Auto-populates Ontario court forms from structured data.",
    status: "coming-soon",
    practiceArea: "consumer",
  },
  {
    name: "Debt Rights Guide",
    slug: "debt-rights-guide",
    description: "Know your rights when a collection agency calls. Limitation periods, exempt assets, dispute options.",
    status: "coming-soon",
    practiceArea: "consumer",
  },
  {
    name: "Human Rights Tribunal Guide",
    slug: "human-rights-tribunal-guide",
    description: "File an HRTO application. Grounds, time limits, mediation, remedies.",
    status: "coming-soon",
    practiceArea: "consumer",
  },
];

export const practitionerTools: RoadmapTool[] = [
  {
    name: "Client Intake Kit",
    slug: "client-intake-kit",
    description: "Structured intake forms with conflict screening for law practices.",
    status: "coming-soon",
    practiceArea: "practitioner",
  },
  {
    name: "Legal Document Classifier",
    slug: "legal-document-classifier",
    description: "AI-powered document classification with privilege-first defaults. For solo practitioners managing their own files.",
    status: "coming-soon",
    practiceArea: "practitioner",
  },
];
