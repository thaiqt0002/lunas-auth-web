import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cảm ơn',
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
