'use client'

import { useId, useMemo, useState } from 'react'

import { cn } from '@core/libs'

import { CircleAlert, Eye, EyeOff, LockKeyhole } from 'lucide-react'

interface IProps {
  errorMsg?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AuthPasswordInput: React.FC<IProps> = ({ errorMsg = '', onChange }) => {
  const inputId = useId()
  const [enableSeePassword, setEnableSeePassword] = useState(false)
  const toggleSeePassword = () => setEnableSeePassword(!enableSeePassword)
  const renderError = useMemo(() => {
    if (!errorMsg) return null
    return (
      <div className="flex flex-row items-center gap-x-1 text-ui-destructive-500">
        <CircleAlert size={12} />
        <span className="text-xs">{errorMsg}</span>
      </div>
    )
  }, [errorMsg])
  return (
    <div className="flex h-fit w-full flex-col gap-y-2 p-0">
      <label
        htmlFor={inputId}
        className={cn(
          'flex w-full flex-row items-center gap-x-2 rounded-lg bg-neutral-50 px-4 py-3 text-ui-text-500 opacity-40',
          'cursor-text focus-within:text-ui-text-900 focus-within:opacity-60',
          {
            'border-spacing-0.5 border border-ui-destructive-500 bg-ui-destructive-100': errorMsg,
          },
        )}
      >
        <LockKeyhole strokeWidth={1} size={24} className="font-light" />
        <input
          id={inputId}
          name="password"
          placeholder="Mật khẩu"
          type={enableSeePassword ? 'text' : 'password'}
          className={cn('grow bg-transparent text-sm font-light outline-none placeholder:text-sm')}
          onChange={onChange}
        />
        <button onClick={toggleSeePassword} className="cursor-pointer" type="button">
          {enableSeePassword ? (
            <EyeOff size={24} className="font-light" strokeWidth={1} />
          ) : (
            <Eye size={24} className="font-light" strokeWidth={1} />
          )}
        </button>
      </label>
      {renderError}
    </div>
  )
}
export default AuthPasswordInput
