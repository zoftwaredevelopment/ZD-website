import { createRequire } from "module";
const require = createRequire(import.meta.url);
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Alias Node's deprecated punycode to the npm 'punycode' package.
    // Mutate in place so it works whether config.resolve.alias is an object
    // or array-form (spreading an array-form alias into an object breaks
    // webpack's alias resolution on some Next builds).
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias.punycode = require.resolve("punycode/");
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
