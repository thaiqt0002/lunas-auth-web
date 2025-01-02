export interface IGetCartsRes {
  uuid: string
  name: string
  slug: string
  salePrice: number
  thumbnail: string
  status: string
  variants: {
    uuid: string
    name: string
    price: number
    cart: {
      uuid: string
      quantity: number
      createdAt: Date
    }
  }[]
}
export interface ICreateCartParams {
  variantUuid: string
  quantity: number
}
export interface IBaseCart {
  uuid: string
  quantity: number
  salePrice: number
  productUuid: string
  productName: string
  productThumbnail: string
  productStatus: string
  productSlug: string
  variantUuid: string
  varianName: string
}

export interface IBillVariant {
  variantUuid: string
  quantity: number
  price: 77000
  metadata: {
    productName: string
    variantName: string
    variantImage: string
  }
}

export interface IBillAdditionFee {
  id: number
  description: string
  value: number
  isPaid: number
}

export interface IServiceFee {
  id: number
  type: string
  name: string
  description: string
  fee: number
}

export interface IBillStatus {
  statusId: number
  createdAt: Date
  status: {
    type: string
    name: string
  }
}

export interface IBillListData {
  uuid: string
  orderCode: string
  amountTotal: number
  estimatedDelivery: Date
  createdAt: Date
  billDetails: IBillVariant[]
  additionFees: IBillAdditionFee[]
  serviceFee: IServiceFee
  billStatuses: IBillStatus[]
}
