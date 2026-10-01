import { uploadedVideoPoster, uploadedVideoSrc, youtubeEmbedUrl, type PlayableVideo } from "@/lib/video";

interface VideoPlayerProps {
  video: PlayableVideo;
  /** Only after a click: browsers allow autoplay with sound on a user gesture. */
  autoPlay?: boolean;
  className?: string;
}

/** Plays a video from either source: a privacy-friendly YouTube embed, or the uploaded file. */
export default function VideoPlayer({ video, autoPlay = false, className = "w-full h-full" }: VideoPlayerProps) {
  if (video.source === "upload" && video.videoFile) {
    return (
      <video
        src={uploadedVideoSrc(video.videoFile.url)}
        poster={video.thumbnail?.url ?? uploadedVideoPoster(video.videoFile.url)}
        controls
        playsInline
        autoPlay={autoPlay}
        // Load only size/duration until the viewer presses play.
        preload={autoPlay ? "auto" : "metadata"}
        aria-label={video.title}
        className={`${className} bg-black object-contain`}
      />
    );
  }

  return (
    <iframe
      src={youtubeEmbedUrl(video.youtubeId, autoPlay)}
      title={video.title}
      className={`${className} border-0`}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
