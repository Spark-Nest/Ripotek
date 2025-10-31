import { defineField, defineType } from "sanity";

export default defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation:(r)=>r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation:(r)=>r.required() }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "date", type: "datetime" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "industry", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "services", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "images",
      type: "array",
      of: [{
        type: "image",
        options: { hotspot: true },
        fields: [
          { name: "alt", type: "string", title: "Alt text" },
          { name: "caption", type: "string" }
        ]
      }]
    })
  ],
  preview: {
    select: { title: "title", media: "images.0", subtitle: "description" }
  }
});
