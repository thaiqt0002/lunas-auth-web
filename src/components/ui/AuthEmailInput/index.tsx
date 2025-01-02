import { useId, useMemo } from 'react'

import { cn } from '@core/libs'

import { CircleAlert, Mail } from 'lucide-react'

interface IProps {
  errorMsg?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AuthEmailInput: React.FC<IProps> = ({ errorMsg = '', onChange }) => {
  const inputId = useId()
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
        <Mail strokeWidth={1} size={24} className="font-light" />
        <input
          id={inputId}
          name="email"
          placeholder="Email"
          className={cn('grow bg-transparent text-sm font-light outline-none placeholder:text-sm')}
          onChange={onChange}
        />
      </label>
      {renderError}
    </div>
  )
}
export default AuthEmailInput
