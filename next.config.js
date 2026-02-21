/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/"
      }
    ];
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'exif-component': false,
      'use-hot-module-reload': false,
      'rxjs/_esm5': 'rxjs',
      'rxjs/_esm5/index.js': 'rxjs',
      'sha256-uint8array': path.resolve(__dirname, 'node_modules/sha256-uint8array/lib/sha256-uint8array.js')
    };
    return config;
  }
};

module.exports = nextConfig;
