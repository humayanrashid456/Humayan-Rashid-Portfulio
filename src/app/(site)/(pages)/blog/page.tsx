import type { Metadata } from "next";
import Blog from "@/components/sections/Blog";
import { getBlogPosts } from "@/lib/data/content";
import { getHomeContent } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles and practical guides on web development, SEO and growth.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const [posts, home] = await Promise.all([getBlogPosts(), getHomeContent()]);
  return <Blog heading={home.blog} posts={posts} />;
}
