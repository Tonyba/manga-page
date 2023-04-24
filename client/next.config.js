/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  images: {
    domains: ["picsum.photos", "localhost"],
    remotePatterns: [
      /* para que sirva cuando uno anda desarrollando */
      {
        hostname: "localhost",
      },
    ],
  },
};

module.exports = nextConfig;
