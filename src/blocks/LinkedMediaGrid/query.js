import { formatMedia, formatLink } from '~/api/sanity/utils'

export default `{
  images[] {
   media ${formatMedia},
   "tag": tag.label,
   "link": ${formatLink('link')},
  },
}`
