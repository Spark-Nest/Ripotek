
export default function ArchitectureDiagram({ title, stages }: { title: string; stages: string[] }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="font-bold mb-3">{title}</div>
      <svg viewBox="0 0 800 180" className="w-full h-auto">
        {stages.map((s, i) => {
          const x = 40 + i * 150;
          return (
            <g key={i} transform={`translate(${x}, 60)`}>
              <rect width="130" height="60" rx="12" fill="#ffffff" stroke="#0f766e" />
              <text x="65" y="35" textAnchor="middle" fontSize="12" fill="#0b2a4a">{s}</text>
              {i < stages.length - 1 && (
                <g transform="translate(130, 30)">
                  <line x1="0" y1="0" x2="20" y2="0" stroke="#64748b" strokeWidth="2" />
                  <polygon points="20,0 14,-5 14,5" fill="#64748b"/>
                </g>
              )}
            </g>
          );
        })}
      </svg>
      <p className="text-xs text-slate-500 mt-2">Illustrative only. Exact topology tailored per engagement.</p>
    </div>
  );
}
