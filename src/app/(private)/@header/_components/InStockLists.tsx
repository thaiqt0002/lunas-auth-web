import { FC } from 'react'

import { IBaseCart } from '@core/types/payment'

import CartLists from './CartLists'

interface IProps {
  data: IBaseCart[]
}
const InStockLists: FC<IProps> = ({ data }) => {
  const inStock = data.filter((cart) => cart.productStatus === 'IN-STOCK')
  if (!inStock.length) {
    return (
      <div className="flex size-full items-center justify-center">
        <p className="text-ui-text-500">Không có sản phẩm nào</p>
      </div>
    )
  }
  return (
    <>
      <CartLists data={inStock} />
    </>
  )
}

export default InStockLists
