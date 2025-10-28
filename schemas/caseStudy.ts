export default {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "kpi", type: "string" },
    { name: "challenge", type: "text" },
    { name: "approach", type: "text" },
    { name: "architecture", type: "text" },
    { name: "stages", type: "array", of: [{ type: "string" }] },
    { name: "outcome", type: "text" },
    { name: "tech", type: "string" }
  ]
};
