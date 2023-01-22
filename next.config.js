/** @type {import('next').NextConfig} */
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
		return [
			{
				source: '/6-types-of-developers-to-choose-your-learning-path/',
				destination:
					'/posts/6-types-of-developers-to-choose-your-learning-path/',
				permanent: true,
			},
			{
				source: '/5-easy-steps-to-become-a-self-taught-developer/',
				destination: '/posts/5-easy-steps-to-become-a-self-taught-developer/',
				permanent: true,
			},
			{
				source: '/4-common-struggles-of-developers-and-how-to-face-those/',
				destination:
					'/posts/4-common-struggles-of-developers-and-how-to-face-those/',
				permanent: true,
			},
			{
				source: '/5-common-mistakes-to-avoid-when-learning-to-code/',
				destination: '/posts/5-common-mistakes-to-avoid-when-learning-to-code/',
				permanent: true,
			},
			{
				source: '/dev-diary-1-journey-to-fullstack-development-pt-1/',
				destination:
					'/posts/dev-diary-1-journey-to-fullstack-development-pt-1/',
				permanent: true,
			},
		]
	},
	trailingSlash: true,
}

module.exports = nextConfig
