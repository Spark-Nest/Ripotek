export default {
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "type", type: "string" },
    { name: "summary", type: "text" },
    { name: "url", type: "url" }
  ]
};
