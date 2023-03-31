/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos"],
    remotePatterns: [
      /* para que sirve cuando uno anda desarrollando */
    ],
  },
};

module.exports = nextConfig;
