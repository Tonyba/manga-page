/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["picsum.photos"],
    remotePatterns: [
      /* para que sirve cuando uno anda desarrollando */
    ],
  },
};

module.exports = nextConfig;
