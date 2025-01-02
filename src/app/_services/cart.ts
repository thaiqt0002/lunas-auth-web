import { useToast } from '@core/libs/toaster/useToast'
import { useStore } from '@core/libs/zustand'

import { ICreateCartParams } from '@core/types/payment'

import paymentAPI from '@core/api/payment'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { HttpStatusCode } from 'axios'

class CartClientService {
  private static instance: CartClientService
  static readonly getInstance = () => {
    return CartClientService.instance || (CartClientService.instance = new CartClientService())
  }

  public useGetCarts = () => {
    const isLogged = useStore().use.isLogged()
    const handleGetCarts = async () => {
      const { data } = await paymentAPI.getCarts()
      return data
    }
    return useQuery({
      queryKey: ['GET_CARTS'],
      queryFn: handleGetCarts,
      enabled: isLogged,
    })
  }

  public useCreateCart = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const handleCreateCart = async (params: ICreateCartParams) => {
      const res = await paymentAPI.createCart(params)
      return res
    }
    return useMutation({
      mutationKey: ['CREATE_CART'],
      mutationFn: handleCreateCart,
      onSuccess: ({ statusCode }) => {
        if (statusCode < HttpStatusCode.BadRequest) {
          toast({
            variant: 'default',
            title: 'Giỏ hàng đã được sửa đổi',
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Có lỗi xảy ra, vui lòng thử lại',
          })
        }
        queryClient.invalidateQueries({ queryKey: ['GET_CARTS'] })
      },
    })
  }

  public deleteCart = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const handleDeleteCart = async (uuid: string) => {
      const res = await paymentAPI.deleteByUuid(uuid)
      return res
    }
    return useMutation({
      mutationKey: ['DELETE_CART'],
      mutationFn: handleDeleteCart,
      onSuccess: ({ statusCode }) => {
        if (statusCode < HttpStatusCode.BadRequest) {
          toast({
            variant: 'default',
            title: 'Cart deleted',
          })
        }
        queryClient.invalidateQueries({ queryKey: ['GET_CARTS'] })
      },
    })
  }
}
const cartClientService = CartClientService.getInstance()
export default cartClientService
