import type { AppProps } from 'next/app'
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import { ReactElement, useState } from 'react'
import Head from 'next/head'
import type { GetServerSideProps, NextPage } from 'next'
import MainLayout from '../lib/client/components/layouts/MainLayout'
import { NotificationsProvider } from '@mantine/notifications'
import { SWRConfig } from 'swr'
import { ModalsProvider } from '@mantine/modals'
import fetcher from '../lib/client/services/fetcher'
import { useLocalStorage } from '@mantine/hooks'
// import RouterTransition from '../lib/client/components/loaders/RouterTransition'

export type NextPageWithLayout = NextPage & {
  getLayout: (page: ReactElement) => ReactElement
}

type MyAppProps = AppProps & {
  Component: NextPageWithLayout
}

const getDefaultLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? getDefaultLayout
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = () => {
    setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            fontFamily: 'Mali',
            loader: 'dots',
            primaryColor: 'violet',

            headings: {
              fontFamily: 'Mali',
            },
          }}
        >
          {/* <RouterTransition /> */}
          <NotificationsProvider>
            <ModalsProvider>
              <SWRConfig
                value={{
                  fetcher: fetcher,
                }}
              >
                {getLayout(<Component {...pageProps} />)}
              </SWRConfig>
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

export default MyApp
