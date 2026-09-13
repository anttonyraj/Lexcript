import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@lexcript/shared',
    '@lexcript/stt',
    '@lexcript/transcript',
    '@lexcript/billing',
    '@lexcript/pm',
    '@lexcript/intelligence',
  ],
  webpack: (config, { isServer }) => {
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
      '.cjs': ['.cts', '.cjs'],
    };
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        'node:crypto': false,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;
