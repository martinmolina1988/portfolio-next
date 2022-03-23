/** @type {import('next').NextConfig} */
const { patchWebpackConfig } = require("next-global-css");
const nextConfig = {
  reactStrictMode: true,

  publicRuntimeConfig: {
    demo_public_api_url: process.env.NEXT_PUBLIC_API_URL,
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINATY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINATY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINATY_API_SECRET,
    name_id: process.env.NEXT_PUBLIC_NAME_ID,
  },
  future: {
    webpack5: true,
  },
  webpack(config, options) {
    patchWebpackConfig(config, options);
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
};

module.exports = nextConfig;
