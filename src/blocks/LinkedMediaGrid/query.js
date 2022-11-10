import { formatMedia } from '~/api/sanity/utils'

export default `{
  images[] {
    media ${formatMedia},
    "tag": tag.label,
    "link":  coalesce('/' + pageAndSectionLink.link.reference->slug.current + coalesce('#' + pageAndSectionLink.sectionLink.section, '') , pageAndSectionLink.link.url, '')
  },
}`
