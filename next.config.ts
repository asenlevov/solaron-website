import path from "node:path";
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  serverExternalPackages: ["jspdf", "fflate"],
  // The OG card renderer reads these from disk at request time, so they have to
  // be traced into the server bundle — `public/` alone is only served statically.
  outputFileTracingIncludes: {
    "/og": ["./public/fonts/Inter-Regular.ttf", "./public/fonts/Inter-Bold.ttf", "./public/logo-solaron.png"],
  },
};

export default withNextIntl(nextConfig);
