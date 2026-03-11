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
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { client } from "../../../../../sanity/lib/client";
import { postBySlugQuery, postSlugsQuery } from "../../../../../sanity/lib/queries";
import { urlForImage } from "../../../../../sanity/lib/image";
import type { Image } from "sanity";

interface Props {
  params: Promise<{ slug: string }>;
}

interface SanityPostDetail {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  coverImage: Image | null;
  author: string | null;
  tags: string[] | null;
  status: string;
  body: PortableTextBlock[];
}

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(postSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post: SanityPostDetail | null = await client.fetch(postBySlugQuery, { slug });
  if (!post) return { title: "Post Not Found | justack.ai" };
  return {
    title: `${post.title} | justack.ai`,
    description: post.excerpt,
  };
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold tracking-tight mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold tracking-tight mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold tracking-tight mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-base font-light text-white/60 leading-[1.8] mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-purple-500/40 pl-6 my-6 text-white/50 italic font-light">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="bg-white/10 text-purple-300 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    link: ({ children, value }) => {
      const rel = value?.href?.startsWith("/") ? undefined : "noopener noreferrer";
      const target = value?.href?.startsWith("/") ? undefined : "_blank";
      return (
        <a
          href={value?.href}
          rel={rel}
          target={target}
          className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 my-4 text-white/60 font-light">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 my-4 text-white/60 font-light">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-[1.8]">{children}</li>,
    number: ({ children }) => <li className="leading-[1.8]">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      const imageUrl = urlForImage(value)?.width(700).url();
      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={value.alt || ""}
            className="rounded-lg w-full"
            loading="lazy"
          />
          {value.alt && (
            <figcaption className="text-center text-xs text-white/30 mt-3 font-light">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post: SanityPostDetail | null = await client.fetch(postBySlugQuery, { slug });
  if (!post) notFound();

  const primaryTag = post.tags?.[0];

  return (
    <main className="max-w-[700px] mx-auto px-8 py-20">
      {/* Back link */}
      <Link href="/blog" className="text-sm font-light text-white/30 hover:text-white/60 transition-colors no-underline tracking-wide mb-8 block">
        &larr; Back to Blog
      </Link>

      {/* Post header */}
      <header className="mb-12">
        {primaryTag && (
          <span className="text-[11px] font-light tracking-[3px] uppercase text-purple-400 mb-3 block">
            {primaryTag.replaceAll("-", " ")}
          </span>
        )}
        <h1 className="text-4xl font-bold tracking-[-1px] mb-4">{post.title}</h1>
        <div className="flex items-center gap-3">
          <p className="text-sm font-light text-white/30">
            {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          {post.author && (
            <>
              <span className="text-white/15">|</span>
              <p className="text-sm font-light text-white/30">{post.author}</p>
            </>
          )}
        </div>
      </header>

      {/* Post content */}
      <article className="prose prose-invert max-w-none">
        {post.body && <PortableText value={post.body} components={portableTextComponents} />}
      </article>

      {/* Footer */}
      <div className="section-divider mt-16 mb-8" />
      <p className="text-center text-sm font-light text-white/30">
        A2Jai &middot; Open Source Legal Help Tools &middot; <Link href="/" className="text-purple-400 hover:text-purple-300 no-underline">justack.ai</Link>
      </p>
    </main>
  );
}
