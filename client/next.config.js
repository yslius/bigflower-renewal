const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	sassOptions: {
		includePaths: [
			path.join(__dirname, 'styles')
		]
	},
	distDir: 'production',
	images: {
		domains: [`${process.env.NEXT_PUBLIC_TEST}`],
	},
}

module.exports = nextConfig
