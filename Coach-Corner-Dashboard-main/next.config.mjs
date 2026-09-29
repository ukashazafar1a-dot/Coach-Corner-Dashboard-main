import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
/** @type {import('next').NextConfig} */

const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "0c6adf48-36ce-41e6-bb38-1e9c2f0b3505.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "coachcorner-dev.s3.amazonaws.com"
      },
      // A dummy
      {
        protocol: "https",
        hostname: "fdpb-3-plays.s3.amazonaws.com"
      }
    ],
  }
};

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export default nextConfig;
