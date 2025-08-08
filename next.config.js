module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['api.mapbox.com'],
  },
  env: {
    MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  }
};
