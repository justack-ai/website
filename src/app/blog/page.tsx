import type { Metadata } from "next";
import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import { postsQuery } from "../../../sanity/lib/queries";

export const metadata: Metadata = {
  title: "Blog | justack.ai",
  description: "Thought leadership on access to justice, legal technology, and open source — from the team building justack.ai.",
};

interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  tags: string[] | null;
}

const tagColors: Record<string, string> = {
  "a2j-policy": "text-red-400 bg-red-500/15 border-red-500/30",
  "legal-tech": "text-purple-400 bg-purple-500/15 border-purple-500/30",
  "personal-story": "text-teal-400 bg-teal-500/15 border-teal-500/30",
  "open-source": "text-blue-400 bg-blue-500/15 border-blue-500/30",
};

const defaultTagColor = "text-white/50 bg-white/5 border-white/10";

export default async function BlogPage() {
  const posts: SanityPost[] = await client.fetch(postsQuery);

  return (
    <main className="max-w-[800px] mx-auto px-8 py-20">
      <div className="mb-16">
        <p className="text-sm font-light tracking-[4px] uppercase text-white/30 mb-4">Blog</p>
        <h1 className="text-5xl font-bold tracking-[-1.5px] mb-4">Thinking Out Loud</h1>
        <p className="text-lg font-light text-white/50">
          Writing about access to justice, legal technology, and the people the system forgot.
        </p>
      </div>

      <div className="space-y-8">
        {posts.map((post) => {
          const primaryTag = post.tags?.[0] || "general";
          return (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="block glass p-8 hover:scale-[1.01] transition-transform no-underline text-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-[10px] font-semibold tracking-[1.5px] uppercase px-2.5 py-0.5 rounded-full border ${tagColors[primaryTag] || defaultTagColor}`}>
                  {primaryTag.replace("-", " ")}
                </span>
                <span className="text-xs font-light text-white/30">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </span>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight mb-2">{post.title}</h2>
              <p className="text-sm font-light text-white/50 leading-relaxed">{post.excerpt}</p>
            </Link>
          );
        })}

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/30 font-light">No posts yet. Coming soon.</p>
          </div>
        )}
      </div>
    </main>
  );
}
