import { sanity } from "@/lib/sanity";
import Link from "next/link";

export default async function CaseStudies(){
  const items = await sanity.fetch(
    `*[_type=="caseStudy"]|order(_createdAt desc){
      title, "href": "/case-studies/"+slug.current, kpi
    }`
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">Success Stories</h1>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {items.map((c:any, i:number)=> (
          <Link key={i} className="card no-underline" href={c.href}>
            <div className="h3">{c.title}</div>
            <div className="text-sm text-slate-600">{c.kpi}</div>
            <div className="mt-3 text-teal-700">Read case study →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
