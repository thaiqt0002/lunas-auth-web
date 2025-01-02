import { StateCreator } from 'zustand'

import { IUser } from '@core/types/auth'

interface IState {
  isLogged: boolean

  isUserFetching: boolean
  user?: IUser
}

interface IActions {
  setIsLogged: (state: IState['isLogged']) => void

  setUser: (user: IState['user']) => void
  setIsUserFetching: (state: IState['isUserFetching']) => void
}

export type TCreateAuthSlice = IState & IActions

export const createAuthSlice: StateCreator<TCreateAuthSlice, [['zustand/devtools', never]], []> = (
  set,
) => ({
  isLogged: false,
  setIsLogged: (isLogged) => set({ isLogged }),

  user: undefined,
  setUser: (user) => set({ user }),

  isUserFetching: false,
  setIsUserFetching: (isUserFetching) => set({ isUserFetching }),
})
