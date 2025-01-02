'use client'
import { useState } from 'react'

import { IUserAddress } from '@core/types/auth'

import userService from '@core/app/_services/user'

import { AddressItem } from './_components/AddressItem'
import { CreateAddressForm } from './_components/CreateAddressForm'

import { Plus } from 'lucide-react'

export default function Page() {
  const { data: addresses } = userService.useGetAddressList()
  const [status, setStatus] = useState<'LIST' | 'CREATE' | 'UPDATE'>('LIST')
  const [updateAddress, setUpdateAddress] = useState<IUserAddress | null>(null)
  return (
    <section className="container relative mb-12 flex h-fit flex-col gap-y-6 rounded-xl bg-ui-surface-50 p-8 shadow-ui-flat">
      {status === 'LIST' && (
        <>
          <div className="flex flex-col gap-y-2 px-2">
            <h3 className="text-ui-p font-semibold">Địa chỉ mặc định</h3>
            {addresses?.map(
              (address) =>
                !!address.isDefault && (
                  <AddressItem
                    key={address.id}
                    data={address}
                    onEdit={() => {
                      setUpdateAddress(address)
                      setStatus('UPDATE')
                    }}
                  />
                ),
            )}
          </div>

          <div className="flex flex-col gap-y-2 px-2">
            <h3 className="text-ui-p font-semibold">Địa chỉ mặc định</h3>
            {addresses?.map(
              (address) =>
                !address.isDefault && (
                  <AddressItem
                    key={address.id}
                    data={address}
                    onEdit={() => {
                      setUpdateAddress(address)
                      setStatus('UPDATE')
                    }}
                  />
                ),
            )}
          </div>
        </>
      )}
      {status === 'CREATE' && (
        <>
          <h3 className="items-center text-ui-h3 font-extrabold text-ui-text-700">
            Thông tin giao hàng
          </h3>
          <CreateAddressForm
            data={null}
            onBack={() => setStatus('LIST')}
            onSubmitted={() => setStatus('LIST')}
          />
        </>
      )}
      {status === 'UPDATE' && (
        <>
          <h3 className="items-center text-ui-h3 font-extrabold text-ui-text-700">
            Thông tin giao hàng
          </h3>
          <CreateAddressForm
            type="UPDATE"
            data={updateAddress}
            onBack={() => setStatus('LIST')}
            onSubmitted={() => setStatus('LIST')}
          />
        </>
      )}

      {status === 'LIST' && (
        <div className="flex w-full items-center justify-center">
          <button
            className="rounded-full border border-ui-primary-500 p-1"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setStatus('CREATE')
            }}
          >
            <Plus size={20} color="#6c70f0" />
          </button>
        </div>
      )}
    </section>
  )
}
