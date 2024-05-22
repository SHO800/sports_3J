/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return [
            {
                source: '/api/:path*',
                destination: 'http://sho800.xsrv.jp/sports_3J/:path*',
            },
        ];
    }
};

export default nextConfig;
