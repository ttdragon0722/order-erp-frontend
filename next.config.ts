/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/:path*", // 轉發所有 API 請求
				destination: "http://localhost:5000/api/:path*", // 指向 ASP.NET API
			},
		];
	},
};

module.exports = nextConfig;
