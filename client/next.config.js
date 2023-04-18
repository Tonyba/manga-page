/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  distDir: "build",
  images: {
    domains: ["picsum.photos"],
    remotePatterns: [
      /* para que sirva cuando uno anda desarrollando */
    ],
  },
};

module.exports = nextConfig;
