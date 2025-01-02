import { useMemo } from 'react'

interface IChannel {
  channelName: string
}
const useChannel = <T>(props: IChannel) => {
  const { channelName } = props
  const channel = useMemo(() => new BroadcastChannel(channelName), [channelName])

  const broadcast = (msg: T) => {
    channel.postMessage(msg)
  }

  return { broadcast, channel }
}
export default useChannel
