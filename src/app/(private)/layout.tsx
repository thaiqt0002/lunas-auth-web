import { ScrollArea, ScrollBar } from '@customafk/lunas-ui/Atoms/ScrollBar'

import PrivateComponent from './_components/PrivateComponent'

export default function Layout({
  children,
  header,
  breadcrumb,
}: {
  children: React.ReactNode
  header: React.ReactNode
  breadcrumb: React.ReactNode
}) {
  return (
    <main className="relative z-0 grid h-screen grid-rows-[auto_auto_1fr]">
      <PrivateComponent>
        {header}
        <ScrollArea className="relative">
          {breadcrumb}
          {children}
          <ScrollBar />
        </ScrollArea>
      </PrivateComponent>
    </main>
  )
}
