
function Icon({ label }: { label: string }){
  return (
    <div className="flex items-center justify-center gap-2 text-slate-700">
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee"/><stop offset="100%" stopColor="#2dd4bf"/>
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#grad)" opacity="0.25"/>
        <path d="M7 13l3 3 7-7" stroke="#0f766e" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{label}</span>
    </div>
  );
}
function TechIcons(){
  const items = ["Azure","Databricks","Microsoft Fabric","Snowflake","Power BI"];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 items-center text-center opacity-90">
      {items.map((i)=> <Icon key={i} label={i} />)}
    </div>
  );
}

export default function Page(){
  return (
    <div>
      <section className="hero-animated">
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-12 gap-8 items-center hero-content">
          <div className="md:col-span-7">
            <p className="uppercase text-xs tracking-widest text-teal-700 font-semibold">Calgary • Canada • Since 2023</p>
            <h1 className="mt-3 text-5xl font-extrabold leading-tight">Design. <span className="text-teal-700">Engineer.</span> Deliver.</h1>
            <p className="mt-5 text-lg text-slate-600 max-w-2xl">
              Enterprise‑polished consulting for Data Architecture, Engineering, Analytics, Power BI, and Generative AI.
              We build governed self‑service, modernize on Azure & Databricks, and upskill your teams with seasoned instructors.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/services" className="btn btn-primary">Explore services</a>
              <a href="/training" className="btn btn-ghost">View training catalog</a>
            </div>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-slate-600">
              <div><div className="text-2xl font-extrabold text-slate-900">1M+</div> Daily records orchestrated</div>
              <div><div className="text-2xl font-extrabold text-slate-900">12%</div> Energy savings unlocked</div>
              <div><div className="text-2xl font-extrabold text-slate-900">$110K</div> Annual cost reduction</div>
              <div><div className="text-2xl font-extrabold text-slate-900">99.9%</div> Managed BI uptime</div>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="card">
              <h3 className="h3">Demo: Fabric + Databricks Orchestration</h3>
              <p className="text-slate-600 text-sm">2‑minute walk‑through of ingest→transform→serve with Delta Lake and a Power BI semantic layer.</p>
              <div className="mt-4 aspect-video rounded-xl overflow-hidden">
  <iframe width="560" height="315" 
  src="https://www.youtube.com/embed/X_c7gLfJz_Q?si=gfFMbz0JSjSTyUIA" 
  title="Ripotek Demo Video" 
  frameBorder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerPolicy="strict-origin-when-cross-origin" 
  allowFullScreen></iframe>
  
</div>

              <a href="/contact#book" className="mt-4 inline-block text-sm text-teal-700">Book a discovery call →</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 border-y bg-slate-50"><div className="max-w-7xl mx-auto px-4"><TechIcons/></div></section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between">
          <h2 className="h2">What we offer</h2>
          <a href="/contact" className="">Download capabilities deck</a>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            {title:'Strategy',desc:'Architecture reviews, governance, roadmaps.'},
            {title:'Build',desc:'Azure / Databricks / Fabric lakehouse, ELT pipelines, semantic models.'},
            {title:'Analytics',desc:'Power BI dashboards, KPI frameworks, embedded analytics.'},
            {title:'MLOps & AI',desc:'GenAI POCs, feature stores, model serving.'},
            {title:'Managed services',desc:'Admin, monitoring, cost control for BI & data.'},
            {title:'Training',desc:'Power BI, Azure DE, Databricks, AI, ADF Masterclass.'},
          ].map((c,i)=> (
            <div key={i} className="card hover:shadow-sm transition">
              <h3 className="h3">{c.title}</h3>
              <p className="text-slate-600 text-sm mt-2">{c.desc}</p>
              <a href="/contact" className="mt-4 inline-block text-sm text-teal-700">Request proposal →</a>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="h2">Success stories</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              {title:'Pipeline Throughput Optimization', kpi:'15% reliability + 12% energy savings', link:'/case-studies/pipeline-throughput'},
              {title:'AML Integrity Compliance & Inspection', kpi:'40% fewer overdue tasks', link:'/case-studies/aml-integrity'},
              {title:'Environmental Monitoring BI', kpi:'40% faster reporting', link:'/case-studies/environmental-monitoring'},
            ].map((c,i)=> (
              <a key={i} href={c.link} className="rounded-2xl border border-slate-800 bg-slate-950 p-6 hover:border-teal-600 no-underline">
                <div className="h3">{c.title}</div>
                <div className="text-sm text-slate-300 mt-1">{c.kpi}</div>
                <div className="mt-4 text-sm text-teal-400">Read case study →</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
