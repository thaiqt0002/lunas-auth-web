'use client'

import authService from '@core/app/_services'

import AvatarSection from './_components/AvatarSection'

import { DiamondIcon, MailIcon, PhoneIcon, SquarePenIcon, UserIcon } from 'lucide-react'

export default function Page() {
  const { data: user } = authService.useGetMe()
  return (
    <section className="container mb-12 flex h-fit flex-col items-center justify-start gap-y-8 rounded-xl bg-ui-surface-50 px-6 py-12 shadow-ui-flat">
      <AvatarSection />
      <div className="flex w-full flex-col gap-y-6">
        <div className="flex gap-x-4 px-3 py-2">
          <div className="flex w-40 items-center gap-x-2 text-ui-p font-semibold text-ui-text-500">
            <DiamondIcon size={20} />
            <p>Họ tên</p>
          </div>

          <div className="flex grow gap-x-2.5">
            <p className="text-ui-800 grow text-ui-p font-semibold">{user?.fullname}</p>
            <SquarePenIcon size={24} color="#6C70F0" />
          </div>
        </div>

        <div className="flex gap-x-4 px-3 py-2">
          <div className="flex w-40 items-center gap-x-2 text-ui-p font-semibold text-ui-text-500">
            <UserIcon size={20} />
            <p>Tên tài khoản</p>
          </div>

          <div className="flex grow gap-x-2.5">
            <p className="text-ui-800 grow text-ui-p font-semibold">{user?.username}</p>
            <SquarePenIcon size={24} color="#6C70F0" />
          </div>
        </div>
        <div className="flex gap-x-4 px-3 py-2">
          <div className="flex w-40 items-center gap-x-2 text-ui-p font-semibold text-ui-text-500">
            <MailIcon size={20} />
            <p>Email</p>
          </div>

          <div className="flex grow gap-x-2.5">
            <p className="text-ui-800 grow text-ui-p font-semibold">{user?.email}</p>
            <p className="text-ui-note text-ui-primary-500">Đổi email liên kết</p>
          </div>
        </div>

        <div className="flex gap-x-4 px-3 py-2">
          <div className="flex w-40 items-center gap-x-2 text-ui-p font-semibold text-ui-text-500">
            <PhoneIcon size={20} />
            <p>Số điện thoại</p>
          </div>

          <div className="flex grow gap-x-2.5">
            <p className="text-ui-800 grow text-ui-p font-semibold">----------------</p>
            <p className="text-ui-note text-ui-primary-500">Đổi số điện thoại liên kết</p>
          </div>
        </div>
      </div>
    </section>
  )
}
