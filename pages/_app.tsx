import '../styles/globals.css'
import 'bulma/css/bulma.css'

import {useEffect} from 'react'
import Script from 'next/script'
import {useRouter} from 'next/router'
import * as gtag from '../lib/gtag'
import type {AppProps} from 'next/app'

import podcastConfig from '../podcast.config'

const App = ({Component, pageProps}: AppProps) => {
  const router = useRouter()
  const googleAnalyticsId = podcastConfig.googleAnalyticsId
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url, googleAnalyticsId)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, googleAnalyticsId])

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${googleAnalyticsId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  )
}

export default App
