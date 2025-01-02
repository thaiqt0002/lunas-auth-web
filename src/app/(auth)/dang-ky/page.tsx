'use client'
import { useRouter } from 'next/navigation'
import SignUp from '@customafk/lunas-ui/Authentication/SignUp'

import authService from '@core/app/_services'

import { HttpStatusCode } from 'axios'

export default function Page() {
  const router = useRouter()
  const { mutateAsync } = authService.useSignUp()
  return (
    <main className="flex size-full items-center justify-center bg-ui-surface-50">
      <div className="flex size-full items-center justify-center space-x-8 rounded-3xl shadow-xl">
        <SignUp
          onSubmit={async (data) => {
            const { statusCode } = await mutateAsync(data)
            if (statusCode < HttpStatusCode.BadRequest) {
              router.push('/thank-you')
            }
          }}
          onSignUp={() => router.push('/')}
        />
      </div>
    </main>
  )
}
