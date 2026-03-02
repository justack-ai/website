import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage,
    author,
    tags
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage,
    author,
    tags,
    status,
    body
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && status == "published"].slug.current
`;
