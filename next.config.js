const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpackBaseConfig')

const nextConfig = {
  // For more on internalization see:
  // https://nextjs.org/docs/advanced-features/i18n-routing

  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    SANITY_API_VERSION: process.env.SANITY_API_VERSION,
    // SANITY_TOKEN: process.env.SANITY_TOKEN,
  },
  publicRuntimeConfig: {},

  poweredByHeader: false,

  rewrites: () => [
    {
      source: '/admin/:path*',
      destination:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3333/admin/:path*'
          : '/admin/index.html',
    },
  ],
  webpack: (config) => merge(config, webpackBaseConfig),
}

module.exports = withBundleAnalyzer(nextConfig)
