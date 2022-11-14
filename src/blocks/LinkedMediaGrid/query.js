import { formatMedia, formatPageAndSectionLink } from '~/api/sanity/utils'

export default `{
  images[] {
    media ${formatMedia},
    caption,
    heading,
    "link": ${formatPageAndSectionLink()}
  },
}`
