import { FC } from 'react'

import { cn } from '@core/libs'

import { IUserAddress } from '@core/types/auth'

import { ChevronRightIcon, Mail, MapPinHouse, Phone } from 'lucide-react'

interface IProps {
  isSelected?: boolean
  data: IUserAddress
  onEdit?: () => void
}
export const AddressItem: FC<IProps> = ({ isSelected, data, onEdit }) => {
  const { id, fullname, email, phoneNumber, ward, district, province, street } = data
  return (
    <div className="group relative flex w-full items-center gap-x-3">
      <label
        htmlFor={id.toString()}
        className={cn(
          'flex grow flex-col gap-y-2 rounded-md border border-ui-border-400 p-4',
          'cursor-pointer hover:border-ui-border-500',
          'transition-all duration-300',
          isSelected
            ? '!border-ui-primary-500 bg-ui-tertiary-50/20'
            : 'border-ui-border-400 opacity-80 hover:opacity-100',
        )}
      >
        <h4 className="text-ui-note font-bold">{fullname}</h4>

        <div className="flex flex-col gap-y-1 px-4 text-ui-small-note text-ui-text-600">
          <div className="flex items-center gap-x-1">
            <div className="flex items-center gap-x-1">
              <Mail size={16} />
              <p>{email.email}</p>
            </div>

            <div className="flex items-center gap-x-1">
              <Phone size={16} />
              <p>{phoneNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-x-1">
            <MapPinHouse size={16} />
            <p>{`${street}, ${ward.name} ${district.name}, ${province.name}`}</p>
          </div>
        </div>
      </label>
      <button
        className={cn(
          'absolute',
          'hidden',
          'right-4',
          'rounded-full',
          'px-3 py-1',
          'font-medium',
          'items-center',
          'top-1/2',
          '-translate-y-1/2',
          '!text-ui-small-note text-ui-text-600',
          'shadow-ui-flat',
          'group-hover:flex',
          'bg-ui-surface-100',
          'hover:bg-ui-surface-200',
          'hover:text-ui-text-800',
          'transition-colors duration-300',
        )}
        onClick={(e) => {
          e.preventDefault()
          onEdit?.()
        }}
      >
        <p>Chỉnh sửa</p>
        <ChevronRightIcon size={16} />
      </button>
    </div>
  )
}
