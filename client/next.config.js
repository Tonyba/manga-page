/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  images: {
    domains: ["picsum.photos", process.env.API_DOMAIN],
  },
};

module.exports = nextConfig;
