import { EffectCallback, useEffect, useRef } from 'react'

const useEffectOneItem = (effect: EffectCallback) => {
  const initialized = useRef(false)
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
export default useEffectOneItem
