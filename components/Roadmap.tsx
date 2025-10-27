
export default function Roadmap({ steps }: { steps: { label: string; desc: string; }[] }){
  return (
    <div className="relative pl-6">
      <div className="absolute left-2 top-0 bottom-0 w-px bg-slate-200" />
      <ul className="space-y-4">
        {steps.map((s, i)=> (
          <li key={i} className="relative">
            <div className="absolute -left-2 top-1 w-3 h-3 rounded-full bg-teal-600" />
            <div className="font-semibold">{s.label}</div>
            <div className="text-sm text-slate-600">{s.desc}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
