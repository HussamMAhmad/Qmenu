import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // إذا كان لديك نطاق آخر مخصص لرفع صور الوجبات (مثل Cloudinary أو Supabase أو S3) أضفه هنا أيضاً:
      // {
      //   protocol: 'https',
      //   hostname: 'res.cloudinary.com',
      // },
    ],
  },
};

export default nextConfig;
