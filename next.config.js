
/** @type {import('next').NextConfig} */
const nextConfig = {
        images: {
          remotePatterns: [
            { protocol: "https", hostname: "cdn.sanity.io" },
            { protocol: "https", hostname: "i.ytimg.com" },      // YouTube thumbs
            { protocol: "https", hostname: "image.vimeo.com" },  // Vimeo thumbs (optional)
            { protocol: "https", hostname: "cdn.loom.com" },     // Loom thumbs (optional)
          ],
        },
      };

module.exports = nextConfig;

