import type { Metadata, Viewport } from 'next'
import { Mulish } from 'next/font/google'
import { Suspense } from 'react'

import QueryProvider from '@core/libs/react-query/Provider'
import { Toaster } from '@core/libs/toaster/ToasterProvider'
import StoreProvider from '@core/libs/zustand/Provider'

import BroadcastComponent from '@core/components/BroadcastComponent'

import '@core/styles/globals.css'

const mulish = Mulish({
  subsets: ['vietnamese', 'latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: {
    template: ' %s | Lunas VN',
    default: 'Đăng Nhập | Lunas VN',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={mulish.className}>
        <QueryProvider>
          <StoreProvider>
            <Suspense fallback={null}>
              {children}
              <BroadcastComponent />
            </Suspense>
          </StoreProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  )
}
