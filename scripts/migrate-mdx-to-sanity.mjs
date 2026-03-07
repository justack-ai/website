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

/**
 * MDX → Sanity Migration Script
 *
 * Converts 3 MDX blog posts to Sanity Portable Text documents.
 * Run with: sanity exec scripts/migrate-mdx-to-sanity.mjs --with-user-token
 */

import { createClient } from "@sanity/client";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const client = createClient({
  projectId: "b0kmw4n5",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
});

const CONTENT_DIR = join(process.cwd(), "content", "blog");

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("No frontmatter found");

  const frontmatter = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    // Strip quotes
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    frontmatter[key] = value;
  }

  return { frontmatter, body: match[2].trim() };
}

function markdownToPortableText(markdown) {
  const blocks = [];
  const lines = markdown.split("\n");
  let currentParagraph = [];

  function flushParagraph() {
    if (currentParagraph.length === 0) return;
    const text = currentParagraph.join("\n").trim();
    if (!text) {
      currentParagraph = [];
      return;
    }
    blocks.push(createTextBlock(text, "normal"));
    currentParagraph = [];
  }

  for (const line of lines) {
    // Headings
    if (line.startsWith("## ")) {
      flushParagraph();
      blocks.push(createTextBlock(line.slice(3).trim(), "h2"));
      continue;
    }
    if (line.startsWith("### ")) {
      flushParagraph();
      blocks.push(createTextBlock(line.slice(4).trim(), "h3"));
      continue;
    }
    if (line.startsWith("#### ")) {
      flushParagraph();
      blocks.push(createTextBlock(line.slice(5).trim(), "h4"));
      continue;
    }

    // Empty line = paragraph break
    if (line.trim() === "") {
      flushParagraph();
      continue;
    }

    currentParagraph.push(line);
  }

  flushParagraph();
  return blocks;
}

function createTextBlock(text, style) {
  const children = parseInlineMarks(text);
  return {
    _type: "block",
    _key: randomKey(),
    style,
    children,
    markDefs: [],
  };
}

function parseInlineMarks(text) {
  const children = [];
  let remaining = text;

  while (remaining.length > 0) {
    // Bold: **text**
    const boldMatch = remaining.match(/^(.*?)\*\*(.*?)\*\*([\s\S]*)$/);
    if (boldMatch) {
      if (boldMatch[1]) {
        children.push(...parseEmphasis(boldMatch[1]));
      }
      children.push({
        _type: "span",
        _key: randomKey(),
        text: boldMatch[2],
        marks: ["strong"],
      });
      remaining = boldMatch[3];
      continue;
    }

    // Emphasis: *text* (but not **)
    const emMatch = remaining.match(/^(.*?)\*([^*]+?)\*([\s\S]*)$/);
    if (emMatch) {
      if (emMatch[1]) {
        children.push({
          _type: "span",
          _key: randomKey(),
          text: emMatch[1],
          marks: [],
        });
      }
      children.push({
        _type: "span",
        _key: randomKey(),
        text: emMatch[2],
        marks: ["em"],
      });
      remaining = emMatch[3];
      continue;
    }

    // Plain text
    children.push({
      _type: "span",
      _key: randomKey(),
      text: remaining,
      marks: [],
    });
    break;
  }

  if (children.length === 0) {
    children.push({
      _type: "span",
      _key: randomKey(),
      text,
      marks: [],
    });
  }

  return children;
}

function parseEmphasis(text) {
  return [{
    _type: "span",
    _key: randomKey(),
    text,
    marks: [],
  }];
}

function randomKey() {
  return Math.random().toString(36).slice(2, 10);
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const categoryToTags = {
  "personal-story": ["personal-story", "a2jai"],
  "a2j-policy": ["a2j-policy", "a2jai"],
  "legal-tech": ["legal-tech", "open-source"],
};

async function migrate() {
  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  console.log(`Found ${files.length} MDX files to migrate`);

  for (const file of files) {
    const content = readFileSync(join(CONTENT_DIR, file), "utf-8");
    const { frontmatter, body } = parseFrontmatter(content);

    const slug = slugify(frontmatter.title);
    const portableText = markdownToPortableText(body);
    const tags = categoryToTags[frontmatter.category] || [frontmatter.category];

    const doc = {
      _type: "post",
      title: frontmatter.title,
      slug: { _type: "slug", current: slug },
      publishedAt: new Date(frontmatter.date).toISOString(),
      excerpt: frontmatter.excerpt,
      author: "Matthew Bryant",
      tags,
      status: "published",
      body: portableText,
    };

    console.log(`\nMigrating: ${frontmatter.title}`);
    console.log(`  Slug: ${slug}`);
    console.log(`  Date: ${frontmatter.date} → ${doc.publishedAt}`);
    console.log(`  Category: ${frontmatter.category} → Tags: ${tags.join(", ")}`);
    console.log(`  Body blocks: ${portableText.length}`);

    try {
      const result = await client.create(doc);
      console.log(`  ✅ Created: ${result._id}`);
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}`);
    }
  }

  console.log("\n--- Migration complete ---");

  // Verify
  const posts = await client.fetch(
    '*[_type == "post" && status == "published"] | order(publishedAt desc) { title, slug, publishedAt, tags }'
  );
  console.log(`\nVerification: ${posts.length} published posts in Sanity:`);
  for (const post of posts) {
    console.log(`  - ${post.title} (${post.slug.current})`);
  }
}

migrate().catch(console.error);
