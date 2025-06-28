/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Enable static exports for GitHub Pages
  images: {
    unoptimized: true, // Required for static export
  },
  // Configure basePath if your site is not hosted at the root of the domain
  // basePath: '/SurpriseMe',
};

module.exports = nextConfig;
