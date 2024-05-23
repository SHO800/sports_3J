/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return [
            {
                source: '/api/:path*',
                destination: 'https://sho800.xsrv.jp/sports_3J/api/:path*',
                // destination: 'http://localhost:5000/:path*',
            },
        ];
    }
};

export default nextConfig;
