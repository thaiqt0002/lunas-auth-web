import useOnMountUnsafe from './useOnMountUnsafe'

const useWindowMsg = (callback: (event: MessageEvent) => void) => {
  useOnMountUnsafe(() => {
    window.addEventListener('message', callback)
    return () => window.removeEventListener('message', callback)
  })
}
export default useWindowMsg
