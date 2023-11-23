import {
  // formatMedia,
  formatPageAndSectionLink,
} from '~/api/sanity/utils'

export default `{
  numberOfCases,
  tags[],
  selectedCases[]-> {
    "title": seo.title,
    "description": seo.description,
    "image": seo.image.asset->url,
    "link": ${formatPageAndSectionLink()}
  },
}`

// media ${formatMedia},
// caption,
// heading,
// "link": ${formatPageAndSectionLink()}
