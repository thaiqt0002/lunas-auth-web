'use client'
import Image from 'next/image'
import { FC } from 'react'
import Button from '@customafk/lunas-ui/Atoms/Button'

import { PAYMENT_URL } from '@core/constants'

import { IBillListData } from '@core/types/payment'

import dayjs from 'dayjs'

interface IProps {
  data: IBillListData
}
const BillItem: FC<IProps> = ({ data }) => {
  const { createdAt, billStatuses, billDetails } = data
  const amountItem = billDetails.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const amountServiceFee = (data.serviceFee.fee / 100) * amountItem
  const amountAdditionFee = data.additionFees.reduce((acc, item) => acc + item.value, 0)
  const amountSubTotal = amountItem + amountServiceFee + amountAdditionFee
  return (
    <div className="flex w-full flex-col gap-y-2 rounded-xl bg-ui-surface-50 px-5 pb-3.5 pt-3 shadow-ui-flat">
      <div className="flex justify-between">
        <p className="text-ui-note font-medium text-ui-text-700">
          Đơn hàng mua ngày {dayjs(createdAt).format('DD/MM/YYYY')}
        </p>
        <p className="rounded bg-ui-text-100 px-3 py-1 text-ui-note font-semibold text-ui-text-800">
          {billStatuses[billStatuses.length - 1].status.name}
        </p>
      </div>
      <div className="flex flex-col gap-y-4">
        {billDetails.map((variant) => (
          <div key={variant.variantUuid} className="flex items-start gap-x-3">
            <Image
              alt={variant.metadata.productName}
              src={variant.metadata.variantImage}
              loader={({ src }) => `${src}?w=64&h=64`}
              width={64}
              height={64}
              className="size-16 rounded-lg bg-ui-surface-50 object-contain shadow-ui-flat"
            />
            <div className="flex size-full flex-col justify-around">
              <div className="flex w-full justify-between">
                <p className="text-ui-note text-ui-text-800">{variant.metadata.productName}</p>
                <p className="text-ui-800 text-ui-p">
                  {variant.price.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </p>
              </div>
              <div className="flex w-full justify-between">
                <p className="text-ui-note text-ui-text-500">{variant.metadata.variantName}</p>
                <p className="text-ui-800 text-ui-small-note">x{variant.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="pt-3 text-sm font-semibold text-ui-text-500">
        Chưa sản xuất / Dự kiến giao hàng vào tháng 8
      </p>

      <div className="mt-1 flex">
        <div className="flex grow gap-x-3">
          <Button disabled>Mua lại</Button>
          <Button
            variant="outline"
            onClick={() => {
              window.open(PAYMENT_URL + '/don-hang?orderCode=' + data.orderCode, '_blank')
            }}
          >
            Xem chi tiết
          </Button>
          <Button variant="outline" disabled>
            Đánh giá
          </Button>
          <Button variant="outline">Khiếu nại</Button>
        </div>
        <div className="flex items-center gap-x-2">
          <p className="text-ui-small-note text-ui-text-500">Giá trị đơn hàng</p>
          <p className="text-ui-h3 font-bold text-ui-text-800">
            {amountSubTotal.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
        </div>
      </div>
    </div>
  )
}

export default BillItem
