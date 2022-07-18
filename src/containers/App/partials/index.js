import dynamic from 'next/dynamic'

export const AppCookieBar = dynamic(
  () => import(/* webpackChunkName: "AppCookieBar" */ './AppCookieBar'),
  { ssr: false },
)

export { default as AppFooter } from './AppFooter'
export { default as AppHeader } from './AppHeader'
export { default as AppLoader } from './AppLoader'
export { default as AppNavDrawer } from './AppNavDrawer'
export { default as AppSkipLink } from './AppSkipLink'
export { default as AppExitPreview } from './AppExitPreview'
