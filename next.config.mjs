/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Somente aplica a configuração em builds do lado do cliente
    if (!isServer) {
      config.optimization.minimize = false;
    }

    return config;
  },
};

export default nextConfig;