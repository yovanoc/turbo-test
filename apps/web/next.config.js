const WithTM = require("next-transpile-modules");
const { join } = require("path");

const withTM = WithTM(["ui"]);

/**
 * @type {import('next').NextConfig}
 */
const config  = {
	swcMinify: true,
	reactStrictMode: true,
  output: "standalone",
  experimental: {
    outputFileTracingRoot: join(__dirname, "../../"),
  },
};

module.exports = withTM(config);
