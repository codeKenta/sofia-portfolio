import { formatCtaLink, formatMedia } from '~/api/sanity/utils'

export default `{
  heading,
  text,
  images[] ${formatMedia},
  ${formatCtaLink('cta', 'ctaLabel', 'ctaUrl')},
  placeContent,
}`
