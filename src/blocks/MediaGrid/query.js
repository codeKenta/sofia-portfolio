import { formatMedia } from '~/api/sanity/utils'

export default `{
  rows[] {
      images[] ${formatMedia},
      orientation,
  },
  "hej" : rows[],
  images[] ${formatMedia},
  orientation,
}`
