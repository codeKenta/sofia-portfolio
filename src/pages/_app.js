// Based on https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js

import '../../scripts/polyfills'
import * as React from 'react'
import Script from 'next/script'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { GlobalProvider, I18nProvider, RemoteConfigProvider } from '~/context'
import createEmotionCache from '~/utils/createEmotionCache'
import theme from '~/utils/theme.light'
import AppBase from '~/containers/App'
import { getGlobal } from '~/api/sanity'
import * as gtag from '~/utils/gtag'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function App(props) {
  const {
    cmsProps,
    Component,
    defaultLocale,
    emotionCache = clientSideEmotionCache,
    locale,
    pageProps,
  } = props

  const { preview } = pageProps

  const router = useRouter()

  React.useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />

        <I18nProvider defaultLocale={defaultLocale} locale={locale}>
          <RemoteConfigProvider {...cmsProps}>
            <GlobalProvider>
              <AppBase
                disableFooter={pageProps?.disableFooter}
                disableHeader={pageProps?.disableHeader}
                headerColor={pageProps?.headerColor}
                headerMode={pageProps?.headerMode}
                preview={preview}
              >
                <Component {...pageProps} />
              </AppBase>
            </GlobalProvider>
          </RemoteConfigProvider>
        </I18nProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

App.getInitialProps = async (props) => {
  const { Component, ctx } = props

  let cmsProps = {}
  if (ctx.req) {
    cmsProps = await getGlobal()
  }

  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return {
    cmsProps,
    defaultLocale: ctx.defaultLocale,
    locale: ctx.locale,
    pageProps,
  }
}

App.propTypes = {
  cmsProps: PropTypes.object.isRequired,
  Component: PropTypes.elementType.isRequired,
  defaultLocale: PropTypes.string.isRequired,
  emotionCache: PropTypes.object,
  locale: PropTypes.string.isRequired,
  pageProps: PropTypes.object.isRequired,
  preview: PropTypes.bool,
}

export default App
