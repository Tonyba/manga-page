/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["picsum.photos", process.env.API_DOMAIN],
  },
};

module.exports = nextConfig;
