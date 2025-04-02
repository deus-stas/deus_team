export default async function sitemap() {
  const projects = await fetch('https://deus.team/api/projects').then(res => res.json())
  const blogs = await fetch('https://deus.team/api/news').then(res => res.json())
  const awards = await fetch('https://deus.team/api/awards').then(res => res.json())

  const projectUrls = projects.map(project => ({
    url: `https://deus.team/projects/${project.nameInEng}`,
    lastModified: new Date(),
  }))

  const blogUrls = blogs.map(blog => ({
    url: `https://deus.team/news/${blog.urlName}`,
    lastModified: new Date(),
  }))

  const awardUrls = awards.map(award => ({
    url: `https://deus.team/awards/${award.blogUrl}`,
    lastModified: new Date(),
  }))

  return [
    {
      url: 'https://deus.team',
      lastModified: new Date(),
    },
    {
      url: 'https://deus.team/projects',
      lastModified: new Date(),
    },
    {
      url: 'https://deus.team/agency',
      lastModified: new Date(),
    },
    {
      url: 'https://deus.team/services',
      lastModified: new Date(),
    },
    {
      url: 'https://deus.team/news',
      lastModified: new Date(),
    },
    {
      url: 'https://deus.team/contacts',
      lastModified: new Date(),
    },
    ...projectUrls,
    ...blogUrls,
    ...awardUrls
  ]
}