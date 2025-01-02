import { FC } from 'react'

import { CircleAlert } from 'lucide-react'
interface IProps {
  message: string
}
const ErrorRender: FC<IProps> = ({ message }) => {
  return (
    <div className="flex h-4 items-center gap-1 text-xs text-ui-destruction-flat">
      <CircleAlert size={12} />
      <p>{message}</p>
    </div>
  )
}
export default ErrorRender
