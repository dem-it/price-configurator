/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    AZURE_STORAGE_CONNECTION_STRING: process.env.AZURE_STORAGE_CONNECTION_STRING,
    SENDGRID_KEY: process.env.SENDGRID_KEY,
    BREVO_KEY: process.env.BREVO_KEY,
  },
}

module.exports = nextConfig
