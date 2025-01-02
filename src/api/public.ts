import { RestfulAPI } from '@core/libs/axios/restfulAPI'

import { IBaseRes } from '@core/types/base'
import { IBaseDistrict, IBaseProvince, IBaseWard, IPublicCategories } from '@core/types/public'

class PublicAPI extends RestfulAPI {
  private static instance: PublicAPI
  static readonly getInstance = (): PublicAPI => {
    return this.instance || (this.instance = new PublicAPI())
  }
  private readonly _path: string = '/public'

  private constructor() {
    super()
  }

  public getCategories = async (): Promise<IBaseRes<IPublicCategories[]>> => {
    const path = `${this._path}/category`
    return this.getRequest({}, { path })
  }

  public getProvincesList = (): Promise<IBaseRes<IBaseProvince[]>> => {
    const path = `${this._path}/provinces`
    return this.getRequest<IBaseRes<IBaseProvince[]>>({}, { path })
  }

  public getDistrictsList = (provinceId: string): Promise<IBaseRes<IBaseDistrict[]>> => {
    const path = `${this._path}/provinces/${provinceId}/districts`
    return this.getRequest<IBaseRes<IBaseDistrict[]>>({}, { path })
  }

  public getWardsList = (districtId: string): Promise<IBaseRes<IBaseWard[]>> => {
    const path = `${this._path}/districts/${districtId}/wards`
    return this.getRequest<IBaseRes<IBaseDistrict[]>>({}, { path })
  }
}
const publicAPI = PublicAPI.getInstance()
export default publicAPI
