import { sanity } from "@/lib/sanity";
import { urlFor } from "@/lib/image";
import Image from "next/image";
import VideoPlayer from "@/components/VideoPlayer";
import Link from "next/link";

export const revalidate = 60;

export default async function VideoDetail({ params }: { params: { slug: string } }) {
  const doc = await sanity.fetch(
    `*[_type=="video" && slug.current==$slug][0]{
      title, provider, videoIdOrUrl, teaser, duration, date, tags, industry, services,
      transcript, ctaLabel, ctaHref, category, thumbnail{asset, alt}
    }`, { slug: params.slug }
  );

  if (!doc) return <div className="max-w-3xl mx-auto px-4 py-16">Not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow">
        {/* Autoplay muted inside player */}
        <VideoPlayer provider={doc.provider} videoIdOrUrl={doc.videoIdOrUrl} title={doc.title}/>
      </div>

      <h1 className="text-3xl font-extrabold mt-6">{doc.title}</h1>
      {doc.teaser && <p className="mt-2 text-slate-700">{doc.teaser}</p>}

      {doc.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {doc.tags.map((t: string, i: number) => (
            <span key={i} className="px-2 py-0.5 text-xs bg-slate-100 text-slate-700 rounded-full">{t}</span>
          ))}
        </div>
      )}

      {(doc.ctaLabel && doc.ctaHref) && (
        <Link href={doc.ctaHref} className="mt-5 inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold text-white bg-gradient-to-br from-[#7b34ff] to-[#142a66]">
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
