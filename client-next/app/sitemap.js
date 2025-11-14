export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dev.deus.team';

  try {
    const [projectsResponse, blogsResponse, awardsResponse] = await Promise.all([
      fetch(`${baseUrl}/api/projects`),
      fetch(`${baseUrl}/api/news`),
      fetch(`${baseUrl}/api/awards`)
    ]);

    if (!projectsResponse.ok || !blogsResponse.ok || !awardsResponse.ok) {
      throw new Error('Failed to fetch sitemap data');
    }

    const projects = await projectsResponse.json();
    const blogs = await blogsResponse.json();
    const awards = await awardsResponse.json();

    const projectUrls = Array.isArray(projects) ? projects.map(project => ({
      url: `${baseUrl}/projects/${project.nameInEng}`,
      lastModified: new Date(),
    })) : [];

    const blogUrls = Array.isArray(blogs) ? blogs.map(blog => ({
      url: `${baseUrl}/blog/${blog.urlName}`,
      lastModified: new Date(),
    })) : [];

    const awardUrls = Array.isArray(awards) ? awards.map(award => ({
      url: `${baseUrl}/awards/${award.blogUrl}`,
      lastModified: new Date(),
    })) : [];

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/projects`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/agency`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/services`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/contacts`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
      },
      ...projectUrls,
      ...blogUrls,
      ...awardUrls
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return getBasicSitemap(baseUrl);
  }
}

function getBasicSitemap(baseUrl) {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/agency`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}