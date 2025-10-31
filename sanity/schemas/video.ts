import { defineField, defineType } from "sanity";

export default defineType({
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r)=>r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation:(r)=>r.required() }),
    defineField({
      name: "provider",
      title: "Provider",
      type: "string",
      description: "youtube | vimeo | loom | selfhosted",
      options: { list: ["youtube","vimeo","loom","selfhosted"], layout: "radio" },
      initialValue: "youtube",
      validation: (r)=>r.required()
    }),
    defineField({
      name: "videoIdOrUrl",
      title: "Video ID or URL",
      type: "string",
      description: "For YouTube/Vimeo/Loom: ID or full URL. For self-hosted: direct .mp4 URL.",
      validation: (r)=>r.required()
    }),
    defineField({
      name: "thumbnail",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }]
    }),
    defineField({ name: "teaser", type: "text", rows: 3 }),
    defineField({
      name: "category",
      type: "string",
      options: { list: ["Training Demos","Case Studies","Webinars"] },
      validation: (r)=>r.required()
    }),
    defineField({ name: "isFeatured", type: "boolean", initialValue: false }),
    defineField({ name: "duration", type: "string", description: "e.g., 02:13" }),
    defineField({ name: "date", type: "datetime" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "industry", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "services", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "transcript", type: "text", rows: 10 }),
    defineField({ name: "ctaLabel", type: "string", description: "Custom CTA label" }),
    defineField({ name: "ctaHref", type: "string", description: "CTA link (e.g., /contact?type=Training)" }),
  ],
  preview: {
    select: { title: "title", media: "thumbnail", subtitle: "category" }
  }
});
