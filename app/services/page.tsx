
export default function Services(){
  const services = [
    {title:'Strategy', bullets:['Architecture reviews','Governance frameworks','Roadmaps','Data catalog']},
    {title:'Build', bullets:['Azure/Databricks/Fabric lakehouse','Delta Lake','ELT pipelines','Semantic models']},
    {title:'Analytics', bullets:['Executive dashboards','KPI frameworks','Embedded analytics','Adoption playbooks']},
    {title:'MLOps & AI', bullets:['GenAI POCs','Feature stores','Model serving','RAG blueprints']},
    {title:'Managed Services', bullets:['Admin & SLAs','Observability','Cost control','Security updates']},
    {title:'Training', bullets:['Power BI Analyst','Azure Data Engineer','Databricks Engineer','AI & Prompting','ADF Masterclass']},
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">Services</h1>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {services.map((s,i)=> (
          <div key={i} className="card">
            <div className="h3">{s.title}</div>
            <ul className="list-disc pl-5 mt-3 text-sm text-slate-700 space-y-1">
              {s.bullets.map((b,bi)=> <li key={bi}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
