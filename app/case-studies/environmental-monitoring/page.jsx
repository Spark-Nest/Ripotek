import ArchitectureDiagram from "../../../components/ArchitectureDiagram";

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">Environmental Monitoring BI Modernization</h1>

      <h2 className="h3 mt-6">Challenge</h2>
      <p className="mt-2 text-slate-700">
        Legacy SSRS reports were slow and siloed; environmental thresholds were not visible to decision makers.
      </p>

      <h2 className="h3 mt-6">Approach</h2>
      <p className="mt-2 text-slate-700">
        We built SSIS/ADF ELT into SQL, created SSAS/Fabric semantic models, and migrated reports to interactive Power BI with alerting.
      </p>

      <h2 className="h3 mt-6">Architecture</h2>
      <p className="mt-2 text-slate-700">
        Oracle + CSV + Access &rarr; SSIS/ADF &rarr; SQL &rarr; SSAS/Fabric &rarr; Power BI dashboards.
      </p>
      <div className="mt-4">
        <ArchitectureDiagram
          title="Solution Flow"
          stages={["Sources", "SSIS/ADF", "SQL/SSAS", "Power BI"]}
        />
      </div>

      <h2 className="h3 mt-6">KPIs</h2>
      <ul className="list-disc pl-6 mt-2 text-slate-700 space-y-1">
        <li>Chemical exceedances by site</li>
        <li>Time-to-report</li>
        <li>Remediation SLA compliance</li>
        <li>Cost per remediation</li>
      </ul>

      <h2 className="h3 mt-6">Outcome</h2>
      <p className="mt-2 text-slate-700">
        40% faster reporting and improved compliance posture with automated KPIs and alerts.
      </p>

      <h2 className="h3 mt-6">Tech</h2>
      <p className="mt-2 text-slate-700">SQL Server, SSIS/ADF, Fabric, Power BI</p>
    </div>
  );
}

