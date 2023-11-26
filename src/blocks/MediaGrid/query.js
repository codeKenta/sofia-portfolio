import { formatMedia } from '~/api/sanity/utils'

export default `{
  rows[] {
      images[] ${formatMedia},
      orientation,
      customRatio {
        width,
        height,
      },
      minColumns
  },
  "backgroundColor": backgroundColor.bg,
  "containerSize": containerSize.size,
  topPadding,
  bottomPadding,
}`
