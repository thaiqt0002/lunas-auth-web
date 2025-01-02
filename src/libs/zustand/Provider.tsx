'use client'

import { createContext, FC, useContext, useRef } from 'react'

import { createSelectors } from '@core/libs/zustand'

import { createStore, TCreateStore } from '@core/stores/config'

export const StoreContext = createContext<TCreateStore | null>(null)

interface IProps {
  children: React.ReactNode
}

const StoreProvider: FC<IProps> = ({ children }) => {
  const storeRef = useRef<TCreateStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = createStore
  }
  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>
}
export const useStore = () => {
  const storeContext = useContext(StoreContext)
  if (!storeContext) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return createSelectors(storeContext)
}
export default StoreProvider
