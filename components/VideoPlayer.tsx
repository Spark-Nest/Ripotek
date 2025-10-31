type Props = {
  provider: "youtube" | "vimeo" | "loom" | "selfhosted";
  videoIdOrUrl: string;
  title: string;
};

export default function VideoPlayer({ provider, videoIdOrUrl, title }: Props) {
  let src = "";
  if (provider === "youtube") {
    // accept full URL or ID
    const id = videoIdOrUrl.includes("youtube") || videoIdOrUrl.includes("youtu.be")
      ? (new URL(videoIdOrUrl)).searchParams.get("v") || videoIdOrUrl.split("/").pop() || ""
      : videoIdOrUrl;
    src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0&modestbranding=1`;
  } else if (provider === "vimeo") {
    const id = videoIdOrUrl.split("/").pop();
    src = `https://player.vimeo.com/video/${id}?autoplay=1&muted=1`;
  } else if (provider === "loom") {
    // loom share URL works directly with params
    src = `${videoIdOrUrl}?autoplay=1&muted=1`;
  }

  if (provider === "selfhosted") {
    return (
      <video
        className="w-full h-full"
        controls
        autoPlay
        muted
        playsInline
        poster=""
      >
        <source src={videoIdOrUrl} type="video/mp4" />
        Sorry, your browser doesn’t support embedded videos.
      </video>
    );
  }

  return (
    <iframe
      className="w-full h-full"
      src={src}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
