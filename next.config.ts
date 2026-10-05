import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Genera un servidor autónomo para autoalojar con Docker o con `node server.js`.
  output: "standalone",
};

export default nextConfig;
