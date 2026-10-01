import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "@/components/content/Markdown";
import BlogDetail from "@/components/detail/BlogDetail";
import { getBlogPost, getBlogPosts } from "@/lib/data/content";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      images: [post.coverImage.url],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getBlogPost(slug), getBlogPosts()]);
  if (!post) notFound();

  return (
    <BlogDetail post={post} related={posts.filter((p) => p.slug !== slug).slice(0, 3)}>
      <Markdown source={post.body} />
    </BlogDetail>
  );
}
