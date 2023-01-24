/** @type {import('next').NextConfig} */
const redirections = require('./redirections')

const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
				port: '',
				pathname: '/**/*',
			},
		],
	},
	async redirects() {
		return redirections
	},
	trailingSlash: true,
}

module.exports = nextConfig
