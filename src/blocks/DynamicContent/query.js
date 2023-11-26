import { formatCtaLink, formatMedia } from '~/api/sanity/utils'

export default `{
  heading,
  caption,
  text,
  id,
  images[] ${formatMedia},
  ${formatCtaLink('cta', 'ctaLabel', 'ctaUrl')},
  placeContent,
  excludeBottomPadding,
  "backgroundColor": backgroundColor.bg,
}`
