export default {
  name: "job",
  title: "Job",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "type", type: "string" },
    { name: "location", type: "string" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "description", type: "array", of: [{ type: "string" }] }
  ]
};
