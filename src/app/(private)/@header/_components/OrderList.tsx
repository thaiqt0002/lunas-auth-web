import { FC } from 'react'

import { IBaseCart } from '@core/types/payment'

import CartLists from './CartLists'

interface IProps {
  data: IBaseCart[]
}
const OrderLists: FC<IProps> = ({ data }) => {
  const orders = data.filter(
    (cart) => cart.productStatus === 'ORDER' || cart.productStatus === 'PREORDER',
  )
  if (!orders.length) {
    return (
      <div className="flex size-full items-center justify-center">
        <p className="text-ui-text-500">Không có sản phẩm nào</p>
      </div>
    )
  }
  return (
    <>
      <CartLists data={orders} />
    </>
  )
}

export default OrderLists
