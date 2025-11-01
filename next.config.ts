// next.config.js
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // increase as needed
    },
      serverComponentsExternalPackages: ["pdf-parse"],
  },
};

module.exports = nextConfig;
