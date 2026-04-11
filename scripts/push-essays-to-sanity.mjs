/*
 * One-off: push the two A2J essays into Sanity.
 * Uses createOrReplace with slug-based _id for idempotency.
 * Run: SANITY_AUTH_TOKEN=$SANITY_API_TOKEN node scripts/push-essays-to-sanity.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { join } from "path";

// Minimal .env.local loader (no dotenv dep)
try {
  const env = readFileSync(".env.local", "utf-8");
  for (const line of env.split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
    }
  }
} catch {}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "b0kmw4n5",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
});

const CONTENT_DIR = join(process.cwd(), "content", "blog");
const TARGETS = ["dormant-or-predatory.mdx", "culture-of-complacency.mdx"];

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    const stripped = content.replace(/^\{\/\*[\s\S]*?\*\/\}\s*/, "");
    const m2 = stripped.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!m2) throw new Error("No frontmatter found");
    return parseFrontmatterFromMatch(m2);
  }
  return parseFrontmatterFromMatch(match);
}

function parseFrontmatterFromMatch(match) {
  const frontmatter = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    frontmatter[key] = value;
  }
  return { frontmatter, body: match[2].trim() };
}

function randomKey() {
  return Math.random().toString(36).slice(2, 10);
}

function createTextBlock(text, style) {
  return {
    _type: "block",
    _key: randomKey(),
    style,
    children: [{ _type: "span", _key: randomKey(), text, marks: [] }],
    markDefs: [],
  };
}

function markdownToPortableText(markdown) {
  const blocks = [];
  let para = [];
  const flush = () => {
    const text = para.join("\n").trim();
    if (text) blocks.push(createTextBlock(text, "normal"));
    para = [];
  };
  for (const line of markdown.split("\n")) {
    if (line.startsWith("## ")) { flush(); blocks.push(createTextBlock(line.slice(3).trim(), "h2")); continue; }
    if (line.startsWith("### ")) { flush(); blocks.push(createTextBlock(line.slice(4).trim(), "h3")); continue; }
    if (line.trim() === "") { flush(); continue; }
    para.push(line);
  }
  flush();
  return blocks;
}

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function main() {
  for (const file of TARGETS) {
    const raw = readFileSync(join(CONTENT_DIR, file), "utf-8");
    // Strip MDX JSX comment header if present
    const content = raw.replace(/^\{\/\*[\s\S]*?\*\/\}\s*/, "");
    const { frontmatter, body } = parseFrontmatter(content);
    const slug = slugify(frontmatter.title);
    const doc = {
      _id: `post-${slug}`,
      _type: "post",
      title: frontmatter.title,
      slug: { _type: "slug", current: slug },
      publishedAt: new Date(frontmatter.date).toISOString(),
      excerpt: frontmatter.excerpt,
      author: "Michael Bryant",
      tags: ["a2j-policy", "a2jai"],
      status: "published",
      body: markdownToPortableText(body),
    };
    console.log(`→ ${frontmatter.title}`);
    console.log(`  slug: ${slug}  blocks: ${doc.body.length}`);
    try {
      const result = await client.createOrReplace(doc);
      console.log(`  ✅ ${result._id}`);
    } catch (err) {
      console.error(`  ❌ ${err.message}`);
      process.exit(1);
    }
  }
}

main();
