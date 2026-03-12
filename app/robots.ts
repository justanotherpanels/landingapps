import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/user/', '/api/', '/_next/'], // Cegah Google index halaman dashboard user
        },
        sitemap: 'https://paylaterku.net/sitemap.xml',
    }
}
