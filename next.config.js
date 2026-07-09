/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    distDir: 'build',
  reactCompiler: true,
    cacheComponents: true,
};

module.exports = nextConfig;
