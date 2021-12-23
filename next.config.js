/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  transpileModules: ["react-bulma-components"],
  sassLoaderOptions: {
    includePaths: ["./src/components"]
  },
  cssModules: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  }
}
