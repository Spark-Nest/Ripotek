
export default function Resources(){
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">Resource Library</h1>
      <p className="text-slate-600 mt-2">Whitepapers, webinar replays, templates, and demo training videos.</p>
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {[1,2,3].map(i=> (
          <div key={i} className="card">
            <div className="h3">Coming Soon</div>
            <p className="text-sm text-slate-600">Microsoft Fabric, Databricks Orchestration, and Generative AI demos.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
