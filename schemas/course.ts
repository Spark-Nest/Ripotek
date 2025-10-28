export default {
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "level", type: "string" },
    { name: "summary", type: "text" },
    { name: "syllabus", type: "array", of: [{ type: "string" }] }
  ]
};
