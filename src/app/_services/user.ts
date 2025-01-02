import { useCallback } from 'react'

import { ICreateAddressParams, IUpdateAddressParams } from '@core/types/auth'

import paymentAPI from '@core/api/payment'
import userAPI from '@core/api/user'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

class UserService {
  private static instance: UserService
  static getInstance() {
    return this.instance || (this.instance = new UserService())
  }
  private readonly api
  private readonly paymentAPI

  private constructor() {
    this.api = userAPI
    this.paymentAPI = paymentAPI
  }

  public useUpdateAvatar = () => {
    const handleGetPresignedUrl = useCallback(async () => {
      const { statusCode, message } = await this.api.uploadAvatar()
      return {
        statusCode,
        preSignedUrl: message,
      }
    }, [])
    return useQuery({
      queryKey: ['GET_PRE_SIGNED_URL_AVATAR'],
      queryFn: handleGetPresignedUrl,
      enabled: false,
    })
  }

  public useGetAddressList = () => {
    const handleGetAddressList = async () => {
      const { data } = await this.api.getAddressList()
      return data
    }

    return useQuery({
      queryKey: ['GET_ADDRESS_LIST'],
      queryFn: handleGetAddressList,
    })
  }

  public useCreateAddress = () => {
    const queryClient = useQueryClient()
    const handleCreateAddress = async (params: ICreateAddressParams) => {
      const res = await this.api.createAddress(params)
      return res
    }

    return useMutation({
      mutationKey: ['CREATE_ADDRESS'],
      mutationFn: handleCreateAddress,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['GET_ADDRESS_LIST'] })
      },
    })
  }

  public useUpdateAddress = () => {
    const queryClient = useQueryClient()
    const handleUpdateAddress = async (data: { id: number; params: IUpdateAddressParams }) => {
      const res = await this.api.updateAddress(data.id, data.params)
      return res
    }

    return useMutation({
      mutationKey: ['UPDATE_ADDRESS'],
      mutationFn: handleUpdateAddress,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['GET_ADDRESS_LIST'] })
      },
    })
  }

  public useDeleteAddress = () => {
    const queryClient = useQueryClient()
    const handleDeleteAddress = async (id: number) => {
      const res = await this.api.deleteAddress(id)
      return res
    }

    return useMutation({
      mutationKey: ['DELETE_ADDRESS'],
      mutationFn: handleDeleteAddress,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['GET_ADDRESS_LIST'] })
      },
    })
  }

  public useGetBillsList = () => {
    const handleGetBillsList = async () => {
      const { data } = await this.paymentAPI.getBillList()
      return data
    }

    return useQuery({
      queryKey: ['GET_BILLS_LIST'],
      queryFn: handleGetBillsList,
      staleTime: Infinity,
    })
  }
}

const userService = UserService.getInstance()
export default userService
