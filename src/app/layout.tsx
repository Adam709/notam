import type { Metadata } from 'next'
import Head from 'next/head'
import { PropsWithChildren } from 'react'

import './globals.css'
import { Header } from '@/components/header'
import { TanstackQueryProvider } from '@/providers/tanstack-query-provider'

export const metadata: Metadata = {
  title: 'NavCanadaWatch',
  description: 'Welcome to NavCanadaWatch.ca',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg'
  }
}

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang='en'>
      <Head>
        <meta
          name='google-site-verification'
          content='5VY9hWRwoGpSLOX0zphzWqx8d4267wpqZT0Nw4I3YmI'
        />
      </Head>
      <body className='antialiased'>
        <Header />
        <main className='pb-20'>
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
        </main>
      </body>
    </html>
  )
}

export default RootLayout
