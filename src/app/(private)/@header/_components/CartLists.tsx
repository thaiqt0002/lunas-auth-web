'use client'
import { FC } from 'react'

import { IBaseCart } from '@core/types/payment'

import CartItem from './CartItem'

interface IProps {
  data: IBaseCart[]
}
const CartLists: FC<IProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-y-2 px-3">
      {data.map((cart) => (
        <CartItem key={cart.uuid} data={cart} />
      ))}
    </div>
  )
}

export default CartLists
