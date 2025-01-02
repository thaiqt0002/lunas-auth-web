import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Đăng ký',
  description: 'Authentication Page',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
