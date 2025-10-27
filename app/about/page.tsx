
export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">About Ripotek</h1>
      <p className="mt-4 text-slate-600">Calgary-based consulting and training company, founded March 2023.</p>

      <h2 id="mission" className="h2 mt-10">Mission</h2>
      <p className="mt-2 text-slate-700">Help organizations convert data into decisive action by designing future-proof architectures, engineering reliable pipelines, and upskilling teams.</p>

      <h2 className="h2 mt-10">Vision</h2>
      <p className="mt-2 text-slate-700">Become Canada’s most trusted partner for governed analytics and modern data platforms, from Azure lakehouse to Generative AI.</p>

      <h2 className="h2 mt-10">Purpose & Core Values</h2>
      <ul className="list-disc pl-6 mt-2 text-slate-700 space-y-2">
        <li>Integrity first</li>
        <li>Design with intent</li>
        <li>Ship value early</li>
        <li>Teach what we build</li>
        <li>Security and governance by default</li>
      </ul>
    </div>
  );
}
