/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qnn6oebf1azqwryc.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
