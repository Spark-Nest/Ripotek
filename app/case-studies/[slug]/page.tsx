import { sanity } from "@/lib/sanity";
import { urlFor } from "@/lib/image";
import Image from "next/image";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";

export default async function Page({ params }: { params: { slug: string } }) {
  const doc = await sanity.fetch(
    `*[_type=="caseStudy" && slug.current==$slug][0]{
      title, kpi, challenge, approach, architecture, stages, outcome, tech,
      industry, services,
      heroImage{asset, alt}
    }`,
    { slug: params.slug }
  );

  if (!doc) {
    return <div className="max-w-3xl mx-auto px-4 py-16">Not found</div>;
  }

  const heroUrl = doc.heroImage?.asset
  ? urlFor(doc.heroImage)
      .width(1920)       // desktop crisp
      .height(1080)      // 16:9
      .fit("crop")       // respects hotspot set in Studio
      .auto("format")
      .quality(80)
      .url()
  : null;


  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {heroUrl && (
  // 16:9 ratio box prevents distortion on all screens
  <div
    className="relative w-full rounded-2xl overflow-hidden mb-8"
    style={{ aspectRatio: "16 / 9" }}
  >
    <Image
      src={heroUrl}
      alt={doc.heroImage?.alt || doc.title}
      fill
      sizes="100vw"
      className="object-cover"
      priority
    />
  </div>
)}


      <h1 className="text-4xl font-extrabold">{doc.title}</h1>

      {(doc.industry?.length || doc.services?.length) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {(doc.industry || []).map((t: string, i: number) => (
            <span key={`i-${i}`} className="px-2 py-0.5 text-xs bg-teal-50 text-teal-700 rounded-full">
              {t}
            </span>
          ))}
          {(doc.services || []).map((t: string, i: number) => (
            <span key={`s-${i}`} className="px-2 py-0.5 text-xs bg-slate-100 text-slate-700 rounded-full">
              {t}
            </span>
          ))}
        </div>
      )}

      {doc.kpi && <p className="mt-3 text-slate-600">{doc.kpi}</p>}

      <h2 className="h3 mt-6">Challenge</h2>
      <p className="mt-2 text-slate-700">{doc.challenge}</p>

      <h2 className="h3 mt-6">Approach</h2>
      <p className="mt-2 text-slate-700">{doc.approach}</p>

      <h2 className="h3 mt-6">Architecture</h2>
      <p className="mt-2 text-slate-700">{doc.architecture}</p>

      {Array.isArray(doc.stages) && doc.stages.length > 0 && (
        <div className="mt-4">
          <ArchitectureDiagram title="Solution Flow" stages={doc.stages} />
        </div>
      )}

      <h2 className="h3 mt-6">Outcome</h2>
      <p className="mt-2 text-slate-700">{doc.outcome}</p>

      <h2 className="h3 mt-6">Tech</h2>
      <p className="mt-2 text-slate-700">{doc.tech}</p>
    </div>
  );
}
