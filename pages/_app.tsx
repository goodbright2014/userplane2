import {AppProps} from 'next/app'
import Head from 'next/head'
import React from 'react'

import { BigCommerceContextProvider } from '../contexts/bigcommerce-context'
import {sanityTheme} from '$theme'
import {ThemeProvider, Box} from '@sanity/ui'
import {GlobalStyle, Cart} from '$components'

function App({Component, pageProps, router}: AppProps) {

  return (
    
      <ThemeProvider theme={sanityTheme}>
        <GlobalStyle />
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Anton&family=Gowun+Batang&family=Poppins:wght@900&family=Righteous&display=swap" rel="stylesheet" />
          </Head>
          <Box>
            <Component {...pageProps} />
          </Box>
          <Cart />

      </ThemeProvider>
    
  )
}

export default App
