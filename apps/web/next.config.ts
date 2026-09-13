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
};

export default nextConfig;
