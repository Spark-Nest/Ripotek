
import Roadmap from "@/components/Roadmap";

export default function Training(){
  const courses = [
    {title:'Power BI Analyst', level:'Beginner → Advanced'},
    {title:'Azure Data Engineer', level:'Associate'},
    {title:'Databricks Engineer', level:'Associate / Pro'},
    {title:'Business Intelligence Analyst', level:'Job‑ready'},
    {title:'AI Engineer & Prompting', level:'Foundations'},
    {title:'Azure Data Factory Masterclass', level:'Advanced'},
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">Training & Talent</h1>
      <p className="mt-2 text-slate-700">Live online, in‑person Calgary, hybrid, or on‑site corporate.</p>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {courses.map((c,i)=> (
          <div key={i} className="card">
            <div className="h3">{c.title}</div>
            <div className="text-sm text-slate-600">{c.level}</div>
            <a href="/contact" className="mt-4 inline-block text-sm text-teal-700">Syllabus →</a>
          </div>
        ))}
      </div>

      <div className="mt-10 card bg-white">
        <div className="h3">Program Roadmap</div>
        <Roadmap steps={[
          {label:"Week 1–2", desc:"Foundations: Git, SQL, Python refresh"},
          {label:"Week 3–4", desc:"Azure + Databricks Lakehouse, Delta basics"},
          {label:"Week 5–6", desc:"Power BI semantic models, DAX patterns"},
          {label:"Week 7–8", desc:"Real projects: pipelines, dashboards, reviews"},
          {label:"Week 9+", desc:"Interview coaching, portfolio, training-to-hire"}
        ]} />
      </div>

      <div className="mt-8 card bg-slate-50">
        <div className="h3">Co‑op & Internship Pathways</div>
        <p className="text-sm text-slate-600 mt-2">Mentorship, one‑on‑one coaching, and training‑to‑hire model with partner employers.</p>
        <a href="/careers" className="mt-3 inline-block text-sm text-teal-700">Join our talent network →</a>
      </div>
    </div>
  );
}
