import { sanity } from "@/lib/sanity";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";

export default async function Page({ params }: { params: { slug: string } }){
  const doc = await sanity.fetch(
    `*[_type=="caseStudy" && slug.current==$slug][0]{
      title, kpi, challenge, approach, architecture, stages, outcome, tech
    }`,
    { slug: params.slug }
  );

  if(!doc){ return <div className="max-w-3xl mx-auto px-4 py-16">Not found</div>; }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">{doc.title}</h1>
      <h2 className="h3 mt-6">Challenge</h2><p className="mt-2 text-slate-700">{doc.challenge}</p>
      <h2 className="h3 mt-6">Approach</h2><p className="mt-2 text-slate-700">{doc.approach}</p>
      <h2 className="h3 mt-6">Architecture</h2><p className="mt-2 text-slate-700">{doc.architecture}</p>
      {Array.isArray(doc.stages) && doc.stages.length > 0 && (
        <div className="mt-4"><ArchitectureDiagram title="Solution Flow" stages={doc.stages} /></div>
      )}
      <h2 className="h3 mt-6">Outcome</h2><p className="mt-2 text-slate-700">{doc.outcome}</p>
      <h2 className="h3 mt-6">Tech</h2><p className="mt-2 text-slate-700">{doc.tech}</p>
    </div>
  );
}
