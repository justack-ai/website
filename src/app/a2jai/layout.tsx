import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A2Jai — Restoring Access to Justice in the Age of AI | justack.ai",
  description:
    "The A2Jai manifesto. AI-powered legal technology to address Canada's access-to-justice crisis — commercial products and open-source tools.",
};

export default function A2JaiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
