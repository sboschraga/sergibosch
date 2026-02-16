/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignora els errors de linter durant el build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignora els errors de TypeScript durant el build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;