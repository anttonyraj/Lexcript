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
  webpack: (config) => {
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
      '.cjs': ['.cts', '.cjs'],
    };
    return config;
  },
};

export default nextConfig;
