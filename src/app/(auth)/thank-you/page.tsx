'use client'
import Thankyou from '@customafk/lunas-ui/Authentication/ThankYou'
export default function Page() {
  return (
    <section className="flex size-full items-center justify-center bg-ui-surface-100">
      <div className="w-[30rem] rounded-2xl bg-ui-surface-50 p-0 shadow-ui-dialog">
        <Thankyou />
      </div>
    </section>
  )
}
