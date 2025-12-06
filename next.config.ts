/** @type {import('next').NextConfig} */
const nextConfig = {
  // Any other configuration you may have goes here (e.g., image domains, redirects)
  // If your existing file was empty, leave this object empty.
};

// --- FIX: Force Next.js to use Webpack by setting skipBundler ---
// This disables the persistent source map warnings caused by Turbopack in dev mode.
if (process.env.NEXT_TEST_MODE === 'skipBundler') {
  module.exports = {
    ...nextConfig,
    experimental: {
      skipBundler: true,
    },
  };
} else {
  module.exports = nextConfig;
}