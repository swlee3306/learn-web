/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./next-intl.config.mjs');

const nextConfig = {
  output: 'standalone',
  basePath: '/learn',
  // When served behind a reverse proxy/ingress at /learn
  assetPrefix: '/learn',
  poweredByHeader: false,
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
