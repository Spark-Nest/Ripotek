
export default function Industries(){
  const items = [
    {title:'Energy', points:['Pipeline integrity dashboards','SCADA telemetry','Compressor analytics','Environmental reporting']},
    {title:'Public Sector', points:['Open‑data portals','Regulatory reporting','Accessibility','Privacy & residency']},
    {title:'Financial Services', points:['AML analytics','Risk dashboards','Customer insights','Cost optimization']},
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">Industries</h1>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {items.map((c,i)=> (
          <div key={i} className="card bg-white">
            <div className="h3">{c.title}</div>
            <ul className="list-disc pl-5 mt-3 text-sm text-slate-700 space-y-1">
              {c.points.map((p,pi)=> <li key={pi}>{p}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
