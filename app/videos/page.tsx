import { sanity } from "@/lib/sanity";
import VideoCard from "@/components/VideoCard";

export const revalidate = 60;

export default async function VideosPage() {
  const { featured, training, casestudies, webinars } = await sanity.fetch(`
  {
    "featured": *[_type=="video" && isFeatured==true]|order(date desc)[0...4]{
      title, "href": "/videos/"+slug.current, duration, category, thumbnail{asset, alt}
    },
    "training": *[_type=="video" && category=="Training Demos"]|order(date desc){
      title, "href": "/videos/"+slug.current, duration, category, thumbnail{asset, alt}
    },
    "casestudies": *[_type=="video" && category=="Case Studies"]|order(date desc){
      title, "href": "/videos/"+slug.current, duration, category, thumbnail{asset, alt}
    },
    "webinars": *[_type=="video" && category=="Webinars"]|order(date desc){
      title, "href": "/videos/"+slug.current, duration, category, thumbnail{asset, alt}
    }
  }`);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">Videos</h1>
      <p className="mt-2 text-slate-600">Training demos, case studies, and webinar replays.</p>

      {featured?.length > 0 && (
        <>
          <h2 className="h3 mt-8">Featured</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((v: any, i: number) => <VideoCard key={i} {...v} />)}
          </div>
        </>
      )}

      <h2 className="h3 mt-10">Training Demos</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {training.map((v: any, i: number) => <VideoCard key={i} {...v} />)}
      </div>

      <h2 className="h3 mt-10">Case Studies</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {casestudies.map((v: any, i: number) => <VideoCard key={i} {...v} />)}
      </div>

      <h2 className="h3 mt-10">Webinars</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {webinars.map((v: any, i: number) => <VideoCard key={i} {...v} />)}
      </div>
    </div>
  );
}
