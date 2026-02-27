import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "justack.ai — Open Source Legal Help Tools",
  description: "They deserve better than nothing. A2Jai · Open Source Legal Help Tools — Access to justice infrastructure powered by AI and open source.",
  keywords: ["access to justice", "legal tech", "open source", "A2Jai", "legal help"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <div className="gradient-mesh" />
        <div className="noise" />
        <div className="relative z-[2]">
          <Nav />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
