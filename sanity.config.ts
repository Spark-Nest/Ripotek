import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import caseStudy from "./schemas/caseStudy";
import course from "./schemas/course";
import job from "./schemas/job";
import resource from "./schemas/resource";

export default defineConfig({
  name: "ripotek",
  title: "Ripotek CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [deskTool(), visionTool()],
  schema: { types: [caseStudy, course, job, resource] }
});
