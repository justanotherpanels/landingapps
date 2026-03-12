import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://paylaterku.net'
    const lastModified = new Date()

    const cities = [
        'bandung',
        'bangko',
        'jakarta',
        'jambi',
        'medan',
        'pontianak',
        'singkawang'
    ]

    const infoPages = [
        'about-us',
        'privacy',
        'term'
    ]

    const cityRoutes = cities.map((city) => ({
        url: `${baseUrl}/page/${city}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    const infoRoutes = infoPages.map((page) => ({
        url: `${baseUrl}/page/${page}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }))

    return [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/auth/login`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/auth/register`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/auth/forget`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...cityRoutes,
        ...infoRoutes,
    ]
}
