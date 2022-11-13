import { formatMedia } from '~/api/sanity/utils'

export default `{
  images[] {
    media ${formatMedia},
    caption,
    heading,
    "link":  coalesce('/' + pageAndSectionLink.link.reference->slug.current + coalesce('#' + pageAndSectionLink.sectionLink.section, '') , pageAndSectionLink.link.url, '')
  },
}`
