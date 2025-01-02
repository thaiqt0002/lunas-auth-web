import { RestfulAPI } from '@core/libs/axios/restfulAPI'

import {
  IGetMeRes,
  IGoogleParams,
  ISignInParams,
  ISignUpParams,
  IVerifyEmailParams,
} from '@core/types/auth'
import { IBaseRes } from '@core/types/base'

import { AUTH_PATH } from './path'

class AuthAPI extends RestfulAPI {
  private readonly _path: string = AUTH_PATH

  private static instance: AuthAPI

  static readonly getInstance = (): AuthAPI => {
    if (!this.instance) {
      this.instance = new AuthAPI()
    }
    return AuthAPI.instance
  }

  private constructor() {
    super()
  }

  public getMe = async (): Promise<IBaseRes<IGetMeRes>> => {
    const path = `${this._path}/me`
    return this.getRequest({}, { path })
  }

  public signIn = async (params: ISignInParams): Promise<IBaseRes<null>> => {
    const path = `${this._path}/sign-in`
    return this.postRequest(params, { path })
  }

  public signUp = async (body: ISignUpParams): Promise<IBaseRes<null>> => {
    const path = `${this._path}/sign-up`
    return this.postRequest(body, { path })
  }

  public signOut = async (): Promise<IBaseRes<null>> => {
    const path = `${this._path}/sign-out`
    return this.deleteRequest(null, { path })
  }

  public verifyEmail = async (params: IVerifyEmailParams): Promise<IBaseRes<null>> => {
    const path = `${this._path}/verify`
    return this.getRequest(params, { path })
  }

  public google = async (params: IGoogleParams): Promise<IBaseRes<null>> => {
    const path = `${this._path}/google`
    return this.postRequest(params, { path })
  }
}

export const authAPI = AuthAPI.getInstance()
