export default {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    { name: "title", type: "string", validation: (R:any)=>R.required() },
    { name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (R:any)=>R.required() },

    // New: hero image for the detail page
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }]
    },

    // New: small thumbnail for the list/cards
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }]
    },

    // New: industry tag(s)
    {
      name: "industry",
      title: "Industry",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "e.g., Energy, Public Sector, Financial Services"
    },

    // New: services used
    {
      name: "services",
      title: "Services Used",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "e.g., Fabric, Databricks, Power BI, AI/MLOps, Governance"
    },

    { name: "kpi", type: "string" },
    { name: "challenge", type: "text" },
    { name: "approach", type: "text" },
    { name: "architecture", type: "text" },
    { name: "stages", type: "array", of: [{ type: "string" }] },
    { name: "outcome", type: "text" },
    { name: "tech", type: "string" }
  ]
};
