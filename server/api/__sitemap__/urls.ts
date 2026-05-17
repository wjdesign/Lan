import { portfolio } from '~/data/portfolio'

export default defineSitemapEventHandler(() => {
  // Portfolio works
  const workUrls = portfolio.map(p => ({
    loc: `/portfolio/${p.slug}`,
    changefreq: 'monthly',
    priority: 0.7,
  }))
  return workUrls
})
