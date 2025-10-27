import ArchitectureDiagram from "../../../components/ArchitectureDiagram";

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">AML Integrity Compliance &amp; Inspection Tracker</h1>

      <h2 className="h3 mt-6">Challenge</h2>
      <p className="mt-2 text-slate-700">
        Compliance teams lacked a unified view of hydrotesting, cathodic protection, and coating programs; overdue inspections made audits risky.
      </p>

      <h2 className="h3 mt-6">Approach</h2>
      <p className="mt-2 text-slate-700">
        We consolidated SAP and field logs, standardized task statuses, and automated exportable reports for audits with interactive filters.
      </p>

      <h2 className="h3 mt-6">Architecture</h2>
      <p className="mt-2 text-slate-700">
        SAP OData &rarr; ADF pipelines &rarr; SQL Lakehouse &rarr; Power BI model with role-based access &rarr; Self-service dashboards.
      </p>
      <div className="mt-4">
        <ArchitectureDiagram
          title="Solution Flow"
          stages={["SAP OData", "ADF", "SQL Lakehouse", "Power BI RLS"]}
        />
      </div>

      <h2 className="h3 mt-6">KPIs</h2>
      <ul className="list-disc pl-6 mt-2 text-slate-700 space-y-1">
        <li>Overdue tasks by region/asset</li>
        <li>Task aging buckets</li>
        <li>Next due date coverage</li>
        <li>Audit-ready export volume</li>
      </ul>

      <h2 className="h3 mt-6">Outcome</h2>
      <p className="mt-2 text-slate-700">
        40% reduction in overdue inspection tasks and faster audit cycles with CER/PHMSA reporting.
      </p>

      <h2 className="h3 mt-6">Tech</h2>
      <p className="mt-2 text-slate-700">Azure Data Factory, SQL, Power BI, Purview</p>
    </div>
  );
}

