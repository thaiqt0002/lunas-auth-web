import { JSX } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

import { HttpStatusCode } from 'axios'

export type METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type TSTATUS_PRODUCT = 'PRE_ORDER' | 'ORDER' | 'IN_STOCK' | 'OUT_OF_STOCK'

export type AnyEntity = any

export type AnyRecord = Record<string, unknown>

export interface IError {
  statusCode: number
  message: string
}

export interface IBaseRes<T> {
  statusCode: HttpStatusCode
  message: string | null
  data: T
  error: IError | null
}

export interface IMeta {
  page: number
  perPage: number
  total: number
  totalPages: number
}

export type TMessage =
  | string
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<AnyEntity>>
  | undefined

export interface IQueryKey<T extends AnyRecord | string> {
  queryKey: string[] | T[]
}

export type TFunComponent = () => JSX.Element

export type TBroadcastMessage =
  | {
      type: EBroadcastType.Auth
      action: 'LOGGED_IN' | 'LOGOUT'
      from: string
    }
  | {
      type: Exclude<EBroadcastType, EBroadcastType.Auth>
      action: string
      from: string
    }

export enum EBroadcastType {
  Auth = 'AUTH',
}

export enum EIframeType {
  Auth = 'AUTH',
}
export enum EIframeFrom {
  Auth = 'auth.lunas.vn',
  Store = 'store.lunas.vn',
  Payment = 'payment.lunas.vn',
}

export type TIframeMsg =
  | {
      type: EIframeType.Auth
      action: 'LOGGED_IN' | 'LOGOUT'
      from: EIframeFrom.Auth
    }
  | {
      type: EIframeType.Auth
      action: 'LOGGED_IN' | 'LOGOUT'
      from: EIframeFrom.Store
    }
  | {
      type: EIframeType.Auth
      action: 'LOGGED_IN' | 'LOGOUT'
      from: EIframeFrom.Payment
    }
  | {
      type: Exclude<EIframeType, EIframeType.Auth>
      action: string
      from: Exclude<EIframeFrom, EIframeFrom.Auth | EIframeFrom.Store>
    }
