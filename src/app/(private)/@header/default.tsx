'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import Header from '@customafk/lunas-ui/Organisms/Header'

import { helper } from '@core/libs'
import { useStore } from '@core/libs/zustand'

import authService from '@core/app/_services'
import cartClientService from '@core/app/_services/cart'
import publicClientService from '@core/app/_services/public'

import InStockLists from './_components/InStockLists'
import OrderLists from './_components/OrderList'
import useFormatCart from './_hooks/useFormatCart'

export default function Page() {
  const router = useRouter()
  const { mutateAsync } = authService.useSignOut()
  const { data: categories } = publicClientService.useGetCategories()
  const { data: Carts } = cartClientService.useGetCarts()

  const carts = useFormatCart({ data: Carts })

  const data = useStore().use.user?.()
  const isFetching = useStore().use.isUserFetching()

  const pathname = usePathname()

  const isActiveNav = useMemo(() => {
    if (!data) return undefined
    switch (pathname) {
      case '/user/security':
        return 'SECURITY'
      case '/user/notification':
        return 'NOTIFICATION'
      case '/user/reservation':
        return 'RESERVATION'
      case '/user/address':
        return 'ADDRESS'
    }
    return 'PROFILE'
  }, [pathname, data])

  return (
    <Header
      user={
        data
          ? {
              ...data,
              avatar: data?.avatar ? helper.convertImageUrl(data.avatar) : null,
            }
          : undefined
      }
      isLoading={isFetching}
      categories={categories ?? []}
      cartOrder={<OrderLists data={carts} />}
      cartInStock={<InStockLists data={carts} />}
      className="h-fit"
      onSettingSelected={(selected) => {
        if (selected === 'LOGOUT') {
          mutateAsync()
        }
        if (selected === 'PROFILE') {
          router.replace('/user')
        }
        if (selected === 'SECURITY') {
          router.replace('/user/security')
        }
        if (selected === 'NOTIFICATION') {
          router.replace('/user/notification')
        }
        if (selected === 'RESERVATION') {
          router.replace('/user/reservation')
        }
        if (selected === 'ADDRESS') {
          router.replace('/user/address')
        }
      }}
      activeUserNav={isActiveNav}
      onShowAllProduct={() => window.open('https://dev.store.lunas.vn/danh-muc', '_blank')}
      onCartShowAll={() => window.open('https://dev.store.lunas.vn/gio-hang', '_blank')}
      onCategorySelected={(category) =>
        window.open(`https://dev.store.lunas.vn/danh-muc/${category}`, '_blank')
      }
      onSignIn={() => {
        router.replace('/')
      }}
      onSignUp={() => {
        router.replace('/dang-ky')
      }}
      onContactUs={() => {
        window.open('https://dev.store.lunas.vn/lien-he', '_blank')
      }}
    />
  )
}
