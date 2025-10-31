"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type Provider = "youtube" | "vimeo" | "loom" | "selfhosted";

function getYouTubeId(raw: string) {
  try {
    if (!raw) return "";
    if (!raw.includes("youtu")) return raw; // already an ID
    const u = new URL(raw);
    // shorts
    if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/").pop() || "";
    // watch?v=
    const v = u.searchParams.get("v");
    if (v) return v;
    // youtu.be/<id>
    const last = u.pathname.split("/").pop();
    return last || "";
  } catch {
    return raw;
  }
}

export default function VideoPlayer({
  provider,
  videoIdOrUrl,
  title,
  poster,
}: {
  provider: Provider;
  videoIdOrUrl: string;
  title: string;
  poster?: string;
}) {
  const [ready, setReady] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const { embedUrl, isSelfHostedMp4, outboundUrl } = useMemo(() => {
    const raw = (videoIdOrUrl || "").trim();

    if (provider === "youtube") {
      const id = getYouTubeId(raw);
      const embed = id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1` : "";
      return { embedUrl: embed, isSelfHostedMp4: false, outboundUrl: id ? `https://youtu.be/${id}` : "" };
    }

    if (provider === "vimeo") {
      const id = raw.includes("/") ? raw.split("/").pop() || "" : raw;
      const embed = id ? `https://player.vimeo.com/video/${id}?autoplay=1&muted=1` : "";
      return { embedUrl: embed, isSelfHostedMp4: false, outboundUrl: id ? `https://vimeo.com/${id}` : "" };
    }

    if (provider === "loom") {
      let embed = raw;
      try {
        const url = new URL(raw);
        if (url.pathname.includes("/share/")) embed = raw.replace("/share/", "/embed/");
      } catch {
        // raw might be just an ID
        embed = `https://www.loom.com/embed/${raw}`;
      }
      if (embed) embed += (embed.includes("?") ? "&" : "?") + "autoplay=1&muted=1";
      return { embedUrl: embed, isSelfHostedMp4: false, outboundUrl: raw };
    }

    if (provider === "selfhosted") {
      const isMp4 = /\.mp4(\?|#|$)/i.test(raw);
      return { embedUrl: raw, isSelfHostedMp4: isMp4, outboundUrl: raw };
    }

    return { embedUrl: "", isSelfHostedMp4: false, outboundUrl: "" };
  }, [provider, videoIdOrUrl]);

  const showFrame = provider !== "selfhosted";
  const showVideoTag = provider === "selfhosted" && isSelfHostedMp4;

  const frame = showFrame ? (
    <iframe
      className="rtk-player-media"
      src={embedUrl}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
      onLoad={() => setReady(true)}
    />
  ) : showVideoTag ? (
    <video
      className="rtk-player-media"
      controls
      autoPlay
      muted
      playsInline
      preload="metadata"
      crossOrigin="anonymous"
      poster={poster}
      onCanPlay={() => setReady(true)}
      onError={() => setErr("Video file could not be loaded. Ensure the URL is a direct .mp4 with CORS enabled.")}
    >
      <source src={embedUrl} type="video/mp4" />
      Sorry, your browser doesn’t support embedded videos.
    </video>
  ) : (
    // selfhosted but not mp4
    <div className="rtk-player-fallback">
      <p className="text-sm">
        This URL isn’t a direct .mp4 file. Host an MP4 on a CDN with CORS, or use YouTube/Vimeo/Loom.
        {outboundUrl && (
          <>
            {" "}Try{" "}
            <a className="text-teal-300 underline" href={outboundUrl} target="_blank" rel="noreferrer">
              opening it directly
            </a>.
          </>
        )}
      </p>
    </div>
  );

  return (
    <div className="rtk-player group">
      {!ready && poster && showFrame && (
        <div className="rtk-player-poster">
          <Image src={poster} alt={title} fill sizes="100vw" className="object-cover" />
          <div className="rtk-player-overlay">
            <div className="rtk-player-play">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7-11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}
      {frame}
      {err && (
        <div className="rtk-player-fallback">
          <p className="text-sm">
            {err} {outboundUrl && <>Try <a className="text-teal-300 underline" href={outboundUrl} target="_blank" rel="noreferrer">opening it directly</a>.</>}
          </p>
        </div>
      )}
    </div>
  );
}
