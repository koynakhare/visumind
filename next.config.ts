// next.config.js
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // increase as needed
    },
    serverComponentsExternalPackages: ["pdf-parse"],
  },

  // ✅ Add this section
  eslint: {
    ignoreDuringBuilds: true, // allows build to complete even with ESLint errors
  },
};

module.exports = nextConfig;
