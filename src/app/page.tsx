'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import SignIn from '@customafk/lunas-ui/Authentication/SignIn'

import { helper } from '@core/libs'
import GoogleOAuth from '@core/libs/react-oauth'
import { useToast } from '@core/libs/toaster/useToast'

import { channels } from '@core/constants'

import { ISignInParams } from '@core/types/auth'

import authService from './_services'

import { HttpStatusCode } from 'axios'

export default function Page() {
  const { toast } = useToast()
  const router = useRouter()
  const search = useSearchParams()
  const { mutateAsync } = authService.useSignIn()

  const handleSubmit = useCallback(
    async (params: ISignInParams) => {
      const { statusCode, error } = await mutateAsync(params)
      if (statusCode >= HttpStatusCode.BadRequest) {
        toast({
          variant: 'destructive',
          title: 'Đăng nhập thất bại',
          description: error?.message || '',
        })
        return
      }
      const authChannel = new BroadcastChannel(channels.auth)
      const msg = {
        type: 'AUTH',
        action: 'LOGGED_IN',
      }
      authChannel.postMessage(msg)
      authChannel.close()

      if (search.get('open')) {
        helper.sleep(500).finally(() => window.close())
      }
      router.push('/user')
    },
    [mutateAsync, router, search, toast],
  )

  const handleChangeToSignUp = useCallback(() => {
    router.push('/dang-ky')
  }, [router])

  return (
    <main className="flex size-full items-center justify-center bg-ui-surface-50">
      <div className="flex size-full flex-col items-center justify-center gap-y-2 rounded-3xl pb-12 shadow-xl">
        <SignIn onSubmit={handleSubmit} onSignUp={handleChangeToSignUp} />
        <div className="mx-0 flex w-full items-center justify-between gap-x-2 px-12">
          <div className="h-px grow bg-ui-border-400"></div>
          <p className="text-ui-note font-medium">Đăng nhập bằng</p>
          <div className="h-px grow bg-ui-border-400"></div>
        </div>
        <GoogleOAuth />
      </div>
    </main>
  )
}
