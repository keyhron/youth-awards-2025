import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "vlvaaubljizdexkcyygp.supabase.co",
      },
    ],
  },
};

export default nextConfig;
