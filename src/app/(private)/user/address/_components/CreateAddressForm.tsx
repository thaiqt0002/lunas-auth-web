'use client'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@customafk/lunas-ui/Atoms/Button'
import { Checkbox } from '@customafk/lunas-ui/Atoms/Checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@customafk/lunas-ui/Atoms/Form'
import Input from '@customafk/lunas-ui/Atoms/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@customafk/lunas-ui/Atoms/Select'

import { cn } from '@core/libs'

import { IUserAddress } from '@core/types/auth'

import authService from '@core/app/_services'
import publicClientService from '@core/app/_services/public'
import userService from '@core/app/_services/user'

import { zodResolver } from '@hookform/resolvers/zod'
import { Info, RotateCcw, Trash } from 'lucide-react'
import { z } from 'zod'

const formSchema = z.object({
  fullname: z.string({
    message: 'Vui lòng nhập họ và tên',
  }),
  phoneNumber: z.string({
    message: 'Vui lòng nhập số điện thoại',
  }),
  street: z.string({
    message: 'Vui lòng nhập địa chỉ',
  }),
  customerProvince: z.string(),
  customerDistrict: z.string(),
  customerWard: z.string(),
  isDefault: z.number(),
})

export const CreateAddressForm: FC<{
  type?: 'CREATE' | 'UPDATE'
  data: IUserAddress | null
  onBack?: () => void
  onSubmitted?: () => void
}> = ({ type = 'CREATE', data, onBack, onSubmitted }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(data
        ? {
            ...data,
            customerDistrict: data.district.id,
            customerProvince: data.province.id,
            customerWard: data.ward.id,
            isDefault: data.isDefault ? 1 : 0,
          }
        : {
            isDefault: 0,
          }),
    },
  })

  const customerProvince = form.watch('customerProvince')
  const customerDistrict = form.watch('customerDistrict')

  const { data: provinces } = publicClientService.useGetProvincesList()
  const { data: districts = [] } = publicClientService.useGetDistrictsList(customerProvince)
  const { data: wards = [] } = publicClientService.useGetWardsList(customerDistrict)

  const { data: user } = authService.useGetMe()

  const { mutateAsync: createAddress, isPending: isCreatePending } = userService.useCreateAddress()
  const { mutateAsync: updateAddress, isPending: isUpdatePending } = userService.useUpdateAddress()
  const { mutateAsync: deleteAddress, isPending: isDeletePending } = userService.useDeleteAddress()

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    if (!user?.email) return
    const payload = {
      fullname: formData.fullname,
      phoneNumber: formData.phoneNumber,
      email: user.email,
      street: formData.street,
      wardId: formData.customerWard,
      isDefault: formData.isDefault,
    }
    if (type === 'UPDATE' && !!data?.id) {
      await updateAddress({
        id: data.id,
        params: payload,
      })
    } else {
      await createAddress(payload)
    }
    onSubmitted?.()
  }

  return (
    <>
      <Form {...form}>
        <form
          className={cn(
            'flex flex-col gap-y-4',
            isDeletePending ? 'pointer-events-none opacity-50' : '',
          )}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Họ và tên" {...field} />
                </FormControl>
                <FormMessage className="!mt-1 !text-ui-small-note text-ui-destructive-500" />
              </FormItem>
            )}
          />
          <div className="flex gap-x-3">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="basis-1/3">
                  <FormControl>
                    <Input placeholder="Số điện thoại" {...field} />
                  </FormControl>
                  <FormMessage className="!mt-1 !text-ui-small-note text-ui-destructive-500" />
                </FormItem>
              )}
            />

            <div className="flex h-[34px] basis-2/3 items-center rounded bg-ui-surface-100 px-2 text-ui-note text-ui-text-800">
              <p>{user?.email}</p>
            </div>
          </div>

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Địa chỉ" {...field} />
                </FormControl>
                <FormMessage className="!mt-1 !text-ui-small-note text-ui-destructive-500" />
              </FormItem>
            )}
          />

          <div className="flex gap-x-3 *:basis-1/3">
            <FormField
              control={form.control}
              name="customerProvince"
              render={({ field }) => (
                <FormItem>
                  <Select defaultValue={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Tỉnh/Thành" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-64">
                      {provinces?.map((province) => (
                        <SelectItem key={province.id} value={province.id}>
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              key={customerProvince}
              control={form.control}
              name="customerDistrict"
              render={({ field }) => (
                <FormItem>
                  <Select defaultValue={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Quận/Huyện" defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-64">
                      {!!districts?.length ? (
                        districts?.map((district) => (
                          <SelectItem key={district.id} value={district.id}>
                            {district.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-y-2 py-4 text-ui-note text-ui-text-500">
                          <Info size={32} />
                          <p>Chọn Tỉnh/Thành trước</p>
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              key={`${customerProvince}-${customerDistrict}`}
              control={form.control}
              name="customerWard"
              render={({ field }) => (
                <FormItem>
                  <Select defaultValue={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Phường/Xã" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-64">
                      {!!wards?.length ? (
                        wards?.map((ward) => (
                          <SelectItem key={ward.id} value={ward.id}>
                            {ward.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-y-2 py-4 text-ui-note text-ui-text-500">
                          <Info size={32} />
                          <p>Chọn Quận/Huyện trước</p>
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="isDefault"
            render={({ field }) => (
              <FormItem className="flex !items-center gap-x-1">
                <FormControl>
                  <Checkbox
                    id="isDefaultAddress"
                    checked={field.value === 1}
                    value={1}
                    onCheckedChange={(value) => {
                      field.onChange(value ? 1 : 0)
                    }}
                  />
                </FormControl>
                <FormLabel
                  htmlFor="isDefaultAddress"
                  className="!mt-0 !h-fit cursor-pointer text-ui-small-note font-light text-ui-primary-500"
                >
                  Đặt làm địa chỉ mặc định
                </FormLabel>
              </FormItem>
            )}
          />

          <div className="flex w-full items-center justify-end gap-x-2">
            <Button
              type="button"
              variant={'normal'}
              disabled={isCreatePending || isUpdatePending}
              onClick={(e) => {
                e.preventDefault()
                form.reset({
                  fullname: '',
                  phoneNumber: '',
                  street: '',
                  customerDistrict: '',
                  customerProvince: '',
                  customerWard: '',
                  isDefault: 0,
                })
                form.clearErrors()
                onBack?.()
              }}
              className={cn('w-28 !text-ui-text-600')}
            >
              Quay lại
            </Button>
            <Button disabled={isCreatePending || isUpdatePending} type="submit" className="w-28">
              Xác nhận
            </Button>
          </div>
        </form>
      </Form>
      <div className="absolute right-8 flex gap-x-3 *:[&>button]:transition-colors *:[&>button]:duration-300">
        <button
          className="flex items-center gap-x-1 text-ui-small-note font-normal text-ui-text-500 hover:text-ui-text-800"
          onClick={(e) => {
            e.preventDefault()
            form.reset({
              ...(data
                ? {
                    ...data,
                    customerDistrict: data.district.id,
                    customerProvince: data.province.id,
                    customerWard: data.ward.id,
                  }
                : {
                    fullname: '',
                    phoneNumber: '',
                    street: '',
                    customerDistrict: '',
                    customerProvince: '',
                    customerWard: '',
                    isDefault: 0,
                  }),
            })
            form.clearErrors()
          }}
        >
          <RotateCcw size={12} />
          <p>Hoàn tác</p>
        </button>
        <button
          className="flex items-center gap-x-1 text-ui-small-note font-normal text-ui-destructive-400 hover:text-ui-destructive-500"
          onClick={async (e) => {
            e.preventDefault()
            if (!data?.id) return
            await deleteAddress(data.id)
            onSubmitted?.()
          }}
        >
          <Trash size={12} />
          <p>Xóa</p>
        </button>
      </div>
    </>
  )
}
