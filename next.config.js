/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
<<<<<<< HEAD
const config = {
  images: {
    domains: [],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  // Keep custom output directory for development
  distDir: process.env.NODE_ENV === 'development' ? '.next-local' : '.next',
  // Add any other configuration options here
};
=======
const config = {};
>>>>>>> 5af29285aac4e7d151f054d48591d05624f3fa77

export default config;
