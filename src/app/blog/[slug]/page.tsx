import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found | justack.ai" };
  return {
    title: `${post.title} | justack.ai`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Simple MDX-to-HTML rendering (paragraphs, headings, bold, italic)
  const htmlContent = post.content
    .split("\n\n")
    .filter((block) => block.trim())
    .map((block) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("### ")) return `<h3 class="text-xl font-semibold tracking-tight mt-8 mb-3">${trimmed.slice(4)}</h3>`;
      if (trimmed.startsWith("## ")) return `<h2 class="text-2xl font-semibold tracking-tight mt-10 mb-4">${trimmed.slice(3)}</h2>`;
      if (trimmed.startsWith("# ")) return `<h1 class="text-3xl font-bold tracking-tight mt-12 mb-4">${trimmed.slice(2)}</h1>`;
      // Handle bold and italic
      const processed = trimmed
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');
      return `<p class="text-base font-light text-white/60 leading-[1.8] mb-4">${processed}</p>`;
    })
    .join("\n");

  return (
    <main className="max-w-[700px] mx-auto px-8 py-20">
      {/* Back link */}
      <Link href="/blog" className="text-sm font-light text-white/30 hover:text-white/60 transition-colors no-underline tracking-wide mb-8 block">
        &larr; Back to Blog
      </Link>

      {/* Post header */}
      <header className="mb-12">
        <span className="text-[11px] font-light tracking-[3px] uppercase text-purple-400 mb-3 block">
          {post.category.replace("-", " ")}
        </span>
        <h1 className="text-4xl font-bold tracking-[-1px] mb-4">{post.title}</h1>
        <p className="text-sm font-light text-white/30">
          {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </header>

      {/* Post content */}
      <article
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Footer */}
      <div className="section-divider mt-16 mb-8" />
      <p className="text-center text-sm font-light text-white/30">
        A2Jai &middot; Open Source Legal Help Tools &middot; <Link href="/" className="text-purple-400 hover:text-purple-300 no-underline">justack.ai</Link>
      </p>
    </main>
  );
}
