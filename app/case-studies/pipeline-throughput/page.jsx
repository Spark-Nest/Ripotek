import ArchitectureDiagram from "../../../components/ArchitectureDiagram";

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">Pipeline Throughput &amp; Performance Optimization</h1>

      <h2 className="h3 mt-6">Challenge</h2>
      <p className="mt-2 text-slate-700">
        An energy operator needed real-time visibility into flow rate, pressure, and compressor efficiency across segments
        to cut energy waste and hit throughput targets.
      </p>

      <h2 className="h3 mt-6">Approach</h2>
      <p className="mt-2 text-slate-700">
        We integrated SCADA streams into a Delta Lake, applied anomaly detection for pressure drops, and built KPI dashboards
        for daily variance tracking.
      </p>

      <h2 className="h3 mt-6">Architecture</h2>
      <p className="mt-2 text-slate-700">
        Azure Event Hub &rarr; Databricks (Delta Live Tables) &rarr; Feature tables &rarr; Power BI semantic model &rarr; Executive and operations dashboards.
      </p>
      <div className="mt-4">
        <ArchitectureDiagram
          title="Solution Flow"
          stages={["Event Hub", "Databricks DLT", "Feature Tables", "Power BI"]}
        />
      </div>

      <h2 className="h3 mt-6">KPIs</h2>
      <ul className="list-disc pl-6 mt-2 text-slate-700 space-y-1">
        <li>Throughput variance vs target</li>
        <li>Compressor station efficiency %</li>
        <li>Pressure drop alerts</li>
        <li>Energy cost per delivered volume</li>
      </ul>

      <h2 className="h3 mt-6">Outcome</h2>
      <p className="mt-2 text-slate-700">
        15% increase in throughput reliability and 12% energy savings at compressor stations within 90 days of go-live.
      </p>

      <h2 className="h3 mt-6">Tech</h2>
      <p className="mt-2 text-slate-700">Azure, Databricks, Delta Lake, Power BI, Fabric</p>
    </div>
  );
}

