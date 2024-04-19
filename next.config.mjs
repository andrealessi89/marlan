/** @type {import('next').NextConfig} */
const nextConfig = {

    eslint: {
        // Ignora os erros do ESLint durante a build de produção
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;
