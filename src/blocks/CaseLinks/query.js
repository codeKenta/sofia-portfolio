import { formatCtaLink } from '~/api/sanity/utils'

export default `{
  ${formatCtaLink('cta', 'ctaLabel', 'ctaUrl')},
  numberOfCases,
  tags[],
  cases[]-> {
    "title": seo.title,
    "description": seo.description,
    "image":{
      "component": "picture",
      "src": seo.image.asset->url + "?dl="
    },
    "link": slug.current,
    tags[],
  },

  "allCases": *[_type == "casePage" && !(_id in path('drafts.**'))] {
    "title": seo.title,
    "description": seo.description,
    "image":{
      "component": "picture",
      "src": seo.image.asset->url + "?dl="
    },
    "link": slug.current,
    tags[],
  } | order(title asc)
}`
