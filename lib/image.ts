import imageUrlBuilder from "@sanity/image-url";
import { sanity } from "./sanity";

const builder = imageUrlBuilder({
  projectId: (sanity as any).config().projectId,
  dataset: (sanity as any).config().dataset,
});

export function urlFor(source: any) {
  return builder.image(source);
}
