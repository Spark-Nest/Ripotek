
export default function Careers(){
  const roles = [
    {title:'Consultant (Data/BI)', type:'Full-time', location:'Calgary or Remote (Canada)'},
    {title:'Data Engineer', type:'Full-time', location:'Calgary or Remote (Canada)'},
    {title:'Power BI Developer / Instructor', type:'Contract', location:'Calgary or Remote (Canada)'},
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">Careers</h1>
      <p className="mt-2 text-slate-700">Join our talent network for consulting and instruction roles.</p>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {roles.map((r,i)=> (
          <div key={i} className="card"><div className="h3">{r.title}</div>
            <div className="text-sm text-slate-600">{r.type} • {r.location}</div>
            <a href="/contact?type=careers" className="mt-3 inline-block text-teal-700">Apply →</a>
          </div>
        ))}
      </div>
    </div>
  );
}
