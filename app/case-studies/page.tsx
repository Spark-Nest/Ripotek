import { sanity } from "@/lib/sanity";
import { urlFor } from "@/lib/image";
import Image from "next/image";
import Link from "next/link";

export default async function CaseStudies() {
  const items = await sanity.fetch(
    `*[_type=="caseStudy"]|order(_createdAt desc){
      title,
      "href": "/case-studies/"+slug.current,
      kpi,
      industry,
      services,
      thumbnail{asset, alt}
    }`
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">Success Stories</h1>

      <p className="mt-3 text-slate-600">
        Real projects across Energy, Public Sector, and Financial Services using Azure, Fabric, Databricks, Power BI, and AI.
      </p>

      <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c: any, i: number) => {
          const thumbUrl = c.thumbnail?.asset
            ? urlFor(c.thumbnail)
                .width(900)            // sharp & consistent
                .height(600)           // 3:2 ratio
                .fit("crop")           // respect hotspot
                .auto("format")
                .quality(80)
                .url()
            : null;

          return (
                  <Link
                    key={i}
                    href={c.href}
                    className="card block no-underline rounded-2xl border transition-shadow"
                  >
                    {thumbUrl && (
                      <div className="relative w-full aspect-[3/2]">
                        <Image
                          src={thumbUrl}
                          alt={c.thumbnail?.alt || c.title}
                          fill
                          className="object-cover fade-in"   // 👈 note: fade-in class added here
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    <div className="p-5">
                      <div className="text-lg font-semibold">{c.title}</div>
                      {c.kpi && <div className="mt-1 text-sm text-slate-600">{c.kpi}</div>}

                      <div className="mt-3 flex flex-wrap gap-2">
                        {(c.industry || []).map((tag: string, idx: number) => (
                          <span key={`i-${idx}`} className="px-2 py-0.5 text-xs bg-teal-50 text-teal-700 rounded-full">
                            {tag}
                          </span>
                        ))}
                        {(c.services || []).map((tag: string, idx: number) => (
                          <span key={`s-${idx}`} className="px-2 py-0.5 text-xs bg-slate-100 text-slate-700 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 text-teal-700">Read case study →</div>
                    </div>
                  </Link>
                );

        })}
      </div>
    </div>
  );
}
