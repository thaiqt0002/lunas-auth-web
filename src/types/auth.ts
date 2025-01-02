import { SignUpModel } from '@core/models'

import { z } from 'zod'

export type TUserStatus = 'IS_LOGGED' | 'IS_NOT_LOGGED' | 'LOGOUT'
export interface IUser {
  uuid: string
  role: 'USER' | 'ADMIN'
  email: string
  fullname: string
  username: string
  avatar: string | null
}

export interface IBaseRole {
  id: string
  name: string
}

export interface IBaseBio {
  id: string
  username: string
  fullname: string
  phoneNumber: string
}

export interface IBaseUser {
  id: string
  name: string
  bio: IBaseBio
  role: IBaseRole
}

export interface IGetMeRes extends IUser {}

export type TResGetMe = {
  id: string
  role_id: string
  email: string
  is_active: boolean
}

export interface ISignInParams {
  email: string
  password: string
}

export interface ISignUpParams {
  email: string
  password: string
  fullname: string
}

export interface ISignUpModel extends z.infer<typeof SignUpModel> {}

export interface IVerifyEmailParams {
  token: string
}

export interface IGoogleParams {
  clientId: string
  credential: string
  select_by: string
}
export interface IUserAddress {
  id: number
  fullname: string
  phoneNumber: string
  street: string
  isDefault: number
  email: {
    id: number
    email: string
  }
  ward: {
    id: string
    name: string
    type: string
  }
  district: {
    id: string
    name: string
    type: string
  }
  province: {
    id: string
    name: string
    type: string
  }
}
export interface ICreateAddressParams {
  fullname: string
  phoneNumber: string
  email: string
  street: string
  wardId: string
  isDefault?: number
}

export type IUpdateAddressParams = Partial<ICreateAddressParams>
