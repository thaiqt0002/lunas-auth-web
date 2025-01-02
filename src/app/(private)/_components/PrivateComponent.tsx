'use client'
import { FC, ReactNode } from 'react'

import { useStore } from '@core/libs/zustand'

const PrivateComponent: FC<{ children: ReactNode }> = ({ children }) => {
  const isFetching = useStore().use.isUserFetching()
  return (
    <>
      {children}
      <div
        data-show={isFetching}
        className="absolute top-0 z-[9999] hidden h-screen w-full animate-pulse items-center justify-center bg-ui-surface-400/30 data-[show=true]:flex"
      >
        Loading !
      </div>
    </>
  )
}

export default PrivateComponent
