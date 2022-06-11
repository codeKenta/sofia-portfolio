import { formatCtaLink, formatAdvancedMedia } from '~/api/sanity/utils'

export default `{
  heading,
  excerpt,
  mediaProps ${formatAdvancedMedia},
  ${formatCtaLink('ctaPrimary', 'ctaLabelPrimary', 'ctaUrlPrimary')},
  ${formatCtaLink('ctaSecondary', 'ctaLabelSecondary', 'ctaUrlSecondary')}
}`
