'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { useToast } from '@core/libs/toaster/useToast'

import { createStore } from '@core/stores'

import { channels } from '@core/constants'

import { IGoogleParams, ISignInParams, ISignUpParams, IVerifyEmailParams } from '@core/types/auth'

import { authAPI } from '@core/api'

import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { HttpStatusCode } from 'axios'

export class AuthService {
  private static instance: AuthService
  private readonly store
  private readonly api
  private readonly getMeKey = 'GET_ME'
  private readonly signInKey = 'SIGN_IN'
  private readonly signUpKey = 'SIGN_UP'
  private readonly signOutKey = 'SIGN_OUT'
  private constructor() {
    this.api = authAPI
    this.store = createStore.getState()
  }
  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new AuthService()
    return this.instance
  }

  public useSignIn = () => {
    const handleSignIn = useCallback(async (params: ISignInParams) => {
      const { statusCode, error } = await this.api.signIn(params)
      return { statusCode, error, data: null }
    }, [])

    return useMutation({
      mutationKey: [this.signInKey],
      mutationFn: handleSignIn,
    })
  }

  public useSignUp = () => {
    const { toast } = useToast()
    const handleSignUp = useCallback(
      async (params: ISignUpParams) => {
        const { statusCode, error } = await this.api.signUp(params)
        if (statusCode < HttpStatusCode.BadRequest) {
          toast({
            variant: 'default',
            title: 'Đăng ký thành công',
            description: 'Vui lòng kiểm tra email để xác thực tài khoản',
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Đăng ký không thành công',
            description: error?.message || '',
          })
        }
        return { statusCode, error, data: null }
      },
      [toast],
    )
    return useMutation({
      mutationKey: [this.signUpKey],
      mutationFn: handleSignUp,
    })
  }

  public useGetMe = (enabled: boolean = true) => {
    const router = useRouter()
    const pathname = usePathname()

    const setIsLogged = this.store.setIsLogged
    const setUser = this.store.setUser
    const setIsUserFetching = this.store.setIsUserFetching
    const { toast } = useToast()

    const onGetMe = async () => {
      setUser(undefined)
      setIsUserFetching(true)
      const { data, statusCode, message, error } = await this.api.getMe()

      if (statusCode >= HttpStatusCode.BadRequest) {
        router.push('/')
        if (statusCode === HttpStatusCode.Unauthorized) {
          toast({
            title: 'Đăng nhập không thành công',
            description: error?.message || '',
            variant: 'destructive',
          })
        }
        setUser(undefined)
        return null
      }

      toast({
        title: 'Đăng nhập thành công',
        description: message,
        variant: 'default',
      })

      setUser(data)
      setIsLogged(true)
      setIsUserFetching(false)
      if (pathname === '/') {
        router.push('/user')
      }
      return data
    }

    return useQuery({
      queryKey: [this.getMeKey],
      queryFn: onGetMe,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      enabled: enabled && pathname !== '/verify' && pathname !== '/thank-you',
    })
  }

  public useSignOut = () => {
    const router = useRouter()
    const setUser = this.store.setUser
    const { toast } = useToast()
    const handleSignOut = useCallback(async () => {
      const { statusCode, error } = await this.api.signOut()
      if (statusCode < HttpStatusCode.BadRequest) {
        toast({
          variant: 'default',
          title: 'Đăng xuất thành công',
          description: 'Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi',
        })
        const authChannel = new BroadcastChannel(channels.auth)
        authChannel.postMessage({ action: 'LOGOUT', type: 'AUTH' })
        authChannel.close()
        setUser(undefined)
        router.push('/')
      } else {
        toast({
          variant: 'destructive',
          title: 'Đăng xuất không thành công',
          description: error?.message || '',
        })
      }
      return { statusCode, error }
    }, [router, setUser, toast])
    return useMutation({
      mutationKey: [this.signOutKey],
      mutationFn: handleSignOut,
      onSuccess: ({ statusCode }) => {
        if (statusCode < HttpStatusCode.BadRequest) {
          const queryClient = new QueryClient()
          queryClient.setQueryData([this.getMeKey], null)
        }
      },
    })
  }

  public verifyEmail = async (params: IVerifyEmailParams) => {
    const { statusCode, error } = await this.api.verifyEmail(params)
    return { statusCode, error }
  }

  public useGoogle = () => {
    const handleGoogle = useCallback(async (params: IGoogleParams) => {
      const { statusCode, error } = await this.api.google(params)
      return { statusCode, error }
    }, [])
    return useMutation({
      mutationKey: ['GOOGLE'],
      mutationFn: handleGoogle,
    })
  }
}

const authService = AuthService.getInstance()
export default authService
