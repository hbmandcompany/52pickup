import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@coinbase/onchainkit'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'wagmi/experimental': require.resolve('wagmi/experimental'),
    };
    return config;
  },
};

export default nextConfig;
