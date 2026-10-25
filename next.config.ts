import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
            {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
          {
            // تنطبق هذه الترويسات على جميع مسارات الموقع
            source: '/(.*)',
            headers: [
              {
                // تحمي من هجمات Clickjacking وتمنع فتح موقعك داخل إطار في موقع آخر
                key: 'X-Frame-Options',
                value: 'DENY',
              },
              {
                // تمنع المتصفح من تخمين نوع الملفات وتجبره على الالتزام بالأنواع الآمنة
                key: 'X-Content-Type-Options',
                value: 'nosniff',
              },
              {
                // تجبر المتصفح على الاتصال بموقعك حصرياً عبر بروتوكول HTTPS المشفر
                key: 'Strict-Transport-Security',
                value: 'max-age=63072000; includeSubDomains; preload',
              },
              {
                // تتحكم في البيانات المرسلة عند انتقال المستخدم لمواقع خارجية
                key: 'Referrer-Policy',
                value: 'origin-when-cross-origin',
              },
              {
                // تقييد صلاحيات المتصفح الحساسة (مثل الكاميرا والميكروفون والموقع) لعدم استخدامها عبثاً
                key: 'Permissions-Policy',
                value: 'camera=(), microphone=(), geolocation=()',
              },
            ],
          },
    ];
  },
};

export default nextConfig;
