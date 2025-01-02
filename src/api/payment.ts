import { RestfulAPI } from '@core/libs/axios/restfulAPI'

import { IBaseRes } from '@core/types/base'
import { IBillListData, ICreateCartParams, IGetCartsRes } from '@core/types/payment'

class PaymentAPI extends RestfulAPI {
  private readonly prefix = '/payment'

  private static instance: PaymentAPI
  static readonly getInstance = () => {
    return PaymentAPI.instance || (PaymentAPI.instance = new PaymentAPI())
  }

  public getBillList = (): Promise<IBaseRes<IBillListData[]>> => {
    const path = `${this.prefix}/users/bills`
    return this.getRequest({}, { path })
  }

  public getCarts = (): Promise<IBaseRes<IGetCartsRes[]>> => {
    return this.getRequest(
      {},
      {
        path: `${this.prefix}/cart`,
      },
    )
  }

  public createCart = (params: ICreateCartParams): Promise<IBaseRes<null>> => {
    return this.postRequest(params, {
      path: `${this.prefix}/cart`,
    })
  }

  public deleteByUuid = (uuid: string): Promise<IBaseRes<null>> => {
    return this.deleteRequest(uuid, { path: `${this.prefix}/cart` })
  }
}
const paymentAPI = PaymentAPI.getInstance()
export default paymentAPI
