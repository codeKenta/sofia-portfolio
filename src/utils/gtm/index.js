export { default as GtmBody } from './GtmBody'
export { default as GtmHead } from './GtmHead'

export default function gtm(event) {
  // eslint-disable-next-line no-console
  console.log('GTM', event)

  if (typeof window !== 'undefined' && event) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(event)
  }
}

export const trackPageview = () => gtm({ event: 'page_view' })

export const trackBookingCompleted = (parameters) =>
  gtm({ region: 'other', ...parameters, event: 'booking' })
