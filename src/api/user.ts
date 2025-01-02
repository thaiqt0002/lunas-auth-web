import { RestfulAPI } from '@core/libs/axios/restfulAPI'

import { ICreateAddressParams, IUpdateAddressParams, IUserAddress } from '@core/types/auth'
import { IBaseRes } from '@core/types/base'

class UserAPI extends RestfulAPI {
  private static instance: UserAPI
  static readonly getInstance = (): UserAPI => {
    return this.instance || (this.instance = new UserAPI())
  }
  private readonly _path: string = '/auth/users'

  private constructor() {
    super()
  }

  public uploadAvatar = async (): Promise<IBaseRes<null>> => {
    const path = `${this._path}/avatar`
    return this.getRequest({}, { path })
  }
  public getAddressList = (): Promise<IBaseRes<IUserAddress[]>> => {
    const path = `${this._path}/addresses`
    return this.getRequest({}, { path })
  }

  public createAddress = (params: ICreateAddressParams): Promise<IBaseRes<null>> => {
    const path = `${this._path}/addresses`
    return this.postRequest(params, { path })
  }

  public updateAddress = (id: number, params: IUpdateAddressParams): Promise<IBaseRes<null>> => {
    const path = `${this._path}/addresses`
    return this.patchRequest(id, params, { path })
  }

  public deleteAddress = (id: number): Promise<IBaseRes<null>> => {
    const path = `${this._path}/addresses`
    return this.deleteRequest(id, { path })
  }
}

const userAPI = UserAPI.getInstance()
export default userAPI
