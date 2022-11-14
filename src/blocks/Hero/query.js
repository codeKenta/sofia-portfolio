import { formatCtaLink, formatAdvancedMedia } from '~/api/sanity/utils'

export default `{
  heading,
  excerpt,
  mediaProps ${formatAdvancedMedia},
  ${formatCtaLink('ctaPrimary', 'ctaLabelPrimary', 'ctaUrlPrimary', true)},
  ${formatCtaLink('ctaSecondary', 'ctaLabelSecondary', 'ctaUrlSecondary', true)}
}`
