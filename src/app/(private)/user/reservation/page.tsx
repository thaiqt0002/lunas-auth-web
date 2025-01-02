/* eslint-disable react/display-name */
'use client'
import { MouseEvent, useMemo, useState } from 'react'
import { Separator } from '@customafk/lunas-ui/Atoms/Separator'

import { cn } from '@core/libs'

import { EStatus } from '@core/constants'

import userService from '@core/app/_services/user'

import BillItem from './_components/BillItem'

export default function Page() {
  const { data: bills = [] } = userService.useGetBillsList()
  const [active, setActive] = useState<EStatus | 'ALL'>('ALL')
  const TabItem = useMemo(
    () =>
      ({
        isActive,
        title,
        onClick,
      }: {
        isActive: boolean
        title: string
        onClick: (event: MouseEvent<HTMLButtonElement>) => void
      }) => (
        <button
          className={cn(
            'text-lg font-semibold text-ui-text-800',
            isActive && 'text-ui-primary-500',
          )}
          onClick={onClick}
        >
          {title}
        </button>
      ),
    [],
  )
  return (
    <section className="container flex size-full flex-col items-center gap-y-8">
      <div className="flex w-full flex-col gap-2.5">
        <div className="flex gap-x-3 px-1 py-0.5">
          <TabItem
            isActive={active === 'ALL'}
            title="Tất cả đơn hàng"
            onClick={() => {
              setActive('ALL')
            }}
          />
          <Separator orientation="vertical" className="bg-ui-border-400" />
          <TabItem
            isActive={active === EStatus.PENDING_PAYMENT}
            title="Đang chờ thanh toán"
            onClick={() => {
              setActive(EStatus.PENDING_PAYMENT)
            }}
          />
          <Separator orientation="vertical" className="bg-ui-border-400" />

          <TabItem
            isActive={active === EStatus.PAID}
            title="Đã thanh toán"
            onClick={() => {
              setActive(EStatus.PAID)
            }}
          />
          <Separator orientation="vertical" className="bg-ui-border-400" />
          <TabItem
            isActive={active === EStatus.ON_DELIVERY}
            title="Đang giao hàng"
            onClick={() => {
              setActive(EStatus.ON_DELIVERY)
            }}
          />
          <Separator orientation="vertical" className="bg-ui-border-400" />
          <TabItem
            isActive={active === EStatus.FINISHED}
            title="Thành công"
            onClick={() => {
              setActive(EStatus.FINISHED)
            }}
          />
          <Separator orientation="vertical" className="bg-ui-border-400" />
          <TabItem
            isActive={active === EStatus.CANCELED}
            title="Đã hủy"
            onClick={() => {
              setActive(EStatus.CANCELED)
            }}
          />
        </div>
        <Separator className="bg-ui-border-400" />
      </div>
      <div className="flex w-full flex-col gap-y-5">
        {bills.map((bill) => (
          <BillItem key={bill.uuid} data={bill} />
        ))}
      </div>
    </section>
  )
}
