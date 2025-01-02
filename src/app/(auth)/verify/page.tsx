'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useLayoutEffect } from 'react'

import { cn } from '@core/libs'
import { useToast } from '@core/libs/toaster/useToast'

import authService from '@core/app/_services'
import { useOnMountUnsafe } from '@core/hooks'

import { HttpStatusCode } from 'axios'

export default function Page() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { toast } = useToast()

  const handleVerifyEmail = useCallback(async () => {
    const token = searchParams.get('token')

    if (!token) return undefined

    const { statusCode, error } = await authService.verifyEmail({ token })

    if (statusCode < HttpStatusCode.BadRequest) {
      toast({
        variant: 'default',
        title: 'Tài khoản đã được kích hoạt',
      })
      router.push('/')
      return undefined
    }

    toast({
      variant: 'destructive',
      title: 'Xác thực tài khoản thất bại',
      description: error?.message,
    })

    router.push('/dang-ky')
    return undefined
  }, [router, searchParams, toast])

  useOnMountUnsafe(() => {
    handleVerifyEmail()
  })

  useLayoutEffect(() => {
    const token = searchParams.get('token')
    if (!token) {
      router.push('/')
    }
    return undefined
  }, [router, searchParams])

  return (
    <div
      className={cn({
        hidden: !searchParams.get('token'),
      })}
    >
      {searchParams.get('token')} | {pathname}
    </div>
  )
}
