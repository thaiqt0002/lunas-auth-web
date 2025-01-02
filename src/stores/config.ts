import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { createAuthSlice, TCreateAuthSlice } from './auth'

export const createStore = create<TCreateAuthSlice>()(
  devtools((...args) => ({
    ...createAuthSlice(...args),
  })),
)

export type TCreateStore = typeof createStore
