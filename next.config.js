/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
<<<<<<< HEAD
        formats: ['image/webp'],
        qualities: [75, 90],
=======
        unoptimized: true,
>>>>>>> 30cf315 (feat: website color overhaul (Burnished Amber), font restoration (Outfit 900), and UI density optimizations across dashboard sections)
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '4mb',
        },
    },
};

module.exports = nextConfig;
