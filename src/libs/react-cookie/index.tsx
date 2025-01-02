'use client'
import { CookiesProvider } from 'react-cookie'

interface IProps {
  children: React.ReactNode
}
export default function NextCookieProvider({ children }: IProps) {
  return (
    <CookiesProvider
      defaultSetOptions={{
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'lax',
        domain: 'lunas.vn',
        path: '/',
      }}
    >
      {children}
    </CookiesProvider>
  )
}
