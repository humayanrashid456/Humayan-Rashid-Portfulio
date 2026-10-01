import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VideoDetail from "@/components/detail/VideoDetail";
import { getVideos } from "@/lib/data/content";
import type { VideoData } from "@/lib/data/types";
import { SITE_URL } from "@/lib/site";
import { isoDuration, parseDuration, uploadedVideoSrc, videoThumbnail } from "@/lib/video";

export async function generateStaticParams() {
  const videos = await getVideos();
  return videos.map((video) => ({ slug: video.slug }));
}

export async function generateMetadata({ params }: PageProps<"/videos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const video = (await getVideos()).find((v) => v.slug === slug);
  if (!video) return {};
  return {
    title: video.title,
    ...(video.description ? { description: video.description } : {}),
    alternates: { canonical: `/videos/${video.slug}` },
    openGraph: {
      type: "video.other",
      title: video.title,
      images: [videoThumbnail(video)],
      ...(video.source === "upload" && video.videoFile ? { videos: [{ url: uploadedVideoSrc(video.videoFile.url), type: "video/mp4" }] } : {}),
    },
  };
}

/** schema.org VideoObject, so the page is eligible for video results in Google. */
function videoJsonLd(video: VideoData) {
  const seconds = video.videoFile?.durationSeconds ?? parseDuration(video.duration);
  const thumbnail = videoThumbnail(video);
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description || video.title,
    thumbnailUrl: [thumbnail.startsWith("/") ? `${SITE_URL}${thumbnail}` : thumbnail],
    uploadDate: video.createdAt,
    ...(seconds ? { duration: isoDuration(seconds) } : {}),
    ...(video.source === "upload" && video.videoFile
      ? { contentUrl: uploadedVideoSrc(video.videoFile.url) }
      : { embedUrl: `https://www.youtube.com/embed/${video.youtubeId}` }),
  };
}

export default async function VideoPage({ params }: PageProps<"/videos/[slug]">) {
  const { slug } = await params;
  const videos = await getVideos();
  const video = videos.find((v) => v.slug === slug);
  if (!video) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so content can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd(video)).replace(/</g, "\\u003c") }}
      />
      <VideoDetail video={video} related={videos.filter((v) => v.slug !== slug).slice(0, 3)} />
    </>
  );
}
