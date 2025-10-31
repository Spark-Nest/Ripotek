import { sanity } from "@/lib/sanity";
import { urlFor } from "@/lib/image";
import VideoPlayer from "@/components/VideoPlayer";
import Link from "next/link";

export const revalidate = 60;

export default async function VideoDetail({ params }: { params: { slug: string } }) {
  const doc = await sanity.fetch(
    `*[_type=="video" && slug.current==$slug][0]{
      title, provider, videoIdOrUrl, teaser, duration, date, tags, industry, services,
      transcript, ctaLabel, ctaHref, category, thumbnail{asset, alt}
    }`,
    { slug: params.slug }
  );

  if (!doc) return <div className="max-w-3xl mx-auto px-4 py-16">Not found</div>;

  // ----- JSON-LD helpers -----
  const siteUrl = "https://www.ripotek.com";
  const pageUrl = `${siteUrl}/videos/${params.slug}`;

  // duration like "02:13" -> "PT2M13S"
  const isoDur = (() => {
    if (!doc.duration) return undefined;
    const parts = doc.duration.split(":").map((n: string) => parseInt(n, 10));
    if (parts.length === 2 && parts.every(Number.isFinite)) {
      const [m, s] = parts;
      return `PT${m}M${s}S`;
    }
    return undefined;
  })();

  // Build an embed URL (used for embedUrl/contentUrl in JSON-LD)
  const embedUrl = (() => {
    if (doc.provider === "youtube") {
      const raw = doc.videoIdOrUrl;
      const id =
        raw.includes("youtube") || raw.includes("youtu.be")
          ? (new URL(raw)).searchParams.get("v") || raw.split("/").pop()
          : raw;
      return id ? `https://www.youtube.com/embed/${id}` : undefined;
    }
    if (doc.provider === "vimeo") {
      const id = doc.videoIdOrUrl.split("/").pop();
      return id ? `https://player.vimeo.com/video/${id}` : undefined;
    }
    if (doc.provider === "loom") {
      // Loom share link is already embeddable
      return doc.videoIdOrUrl;
    }
    if (doc.provider === "selfhosted") {
      // direct mp4 URL
      return doc.videoIdOrUrl;
    }
    return undefined;
  })();

  // Social/thumbnail image (1200x675 recommended)
  const thumbUrl = doc.thumbnail?.asset
    ? urlFor(doc.thumbnail).width(1200).height(675).fit("crop").auto("format").url()
    : undefined;

  const jsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: doc.title,
    description: doc.teaser || doc.title,
    uploadDate: doc.date ? new Date(doc.date).toISOString() : undefined,
    duration: isoDur,
    thumbnailUrl: thumbUrl ? [thumbUrl] : undefined,
    embedUrl: embedUrl,
    contentUrl: embedUrl,
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      name: "Ripotek",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        // Replace with your real public logo path or absolute URL
        url: `${siteUrl}/logo-512.png`
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* SEO: Video JSON-LD */}
      <script
        type="application/ld+json"
        // stringify with no undefineds
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, (_k, v) => (v === undefined ? undefined : v)) }}
      />

      <div className="relative w-full">
  <VideoPlayer
    provider={doc.provider}
    videoIdOrUrl={doc.videoIdOrUrl}
    title={doc.title}
    poster={
      doc.thumbnail?.asset
        ? urlFor(doc.thumbnail).width(1200).height(675).fit("crop").auto("format").url()
        : undefined
    }
  />
</div>

      )

      {doc.ctaLabel && doc.ctaHref && (
        <Link
          href={doc.ctaHref}
          className="mt-5 inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold text-white bg-gradient-to-br from-[#7b34ff] to-[#142a66]"
        >
          {doc.ctaLabel}
        </Link>
      )}

      {/* Transcript accordion */}
      {doc.transcript && (
        <details className="mt-8 rounded-xl border bg-white">
          <summary className="cursor-pointer list-none p-4 font-semibold">Show transcript</summary>
          <div className="px-4 pb-4 text-slate-700 whitespace-pre-wrap">{doc.transcript}</div>
        </details>
      )}
    </div>
  );
}
