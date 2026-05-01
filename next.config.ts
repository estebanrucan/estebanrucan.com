import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  staticPageGenerationTimeout: 30,
  watchOptions: {
    pollIntervalMs: 1000,
  },
};

export default nextConfig;
