'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { MSG_URL } from '@core/constants'

import {
  EBroadcastType,
  EIframeFrom,
  EIframeType,
  TBroadcastMessage,
  TIframeMsg,
} from '@core/types/base'

import authService from '@core/app/_services'

export default function BroadcastComponent() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const search = useSearchParams()
  authService.useGetMe(!search.get('open'))
  const { refetch: getMeForNoSendMsg } = authService.useGetMe(false)

  // TO lISTEN FROM BROADCAST CHANNEL
  useEffect(() => {
    const authChannel = new BroadcastChannel(EBroadcastType.Auth)
    authChannel.onmessage = ({ data: { type, action } }: MessageEvent<TBroadcastMessage>) => {
      if (!iframeRef.current || type !== EBroadcastType.Auth) return
      const iframeEl = iframeRef.current as HTMLIFrameElement

      switch (action) {
        case 'LOGGED_IN': {
          const msg: TIframeMsg = {
            type: EIframeType.Auth,
            action: 'LOGGED_IN',
            from: EIframeFrom.Auth,
          }
          iframeEl.contentWindow?.postMessage(msg, MSG_URL)
          getMeForNoSendMsg()
          break
        }
        case 'LOGOUT': {
          const msg: TIframeMsg = {
            type: EIframeType.Auth,
            action: 'LOGOUT',
            from: EIframeFrom.Auth,
          }
          iframeEl.contentWindow?.postMessage(msg, MSG_URL)
          break
        }
        default:
          break
      }
    }
    return () => authChannel.close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // LISTEN FROM IFRAME
  useEffect(() => {
    const msgListener = ({ data }: MessageEvent<TIframeMsg>) => {
      if (data.from === EIframeFrom.Store) {
        const { action } = data
        switch (action) {
          case 'LOGOUT': {
            getMeForNoSendMsg()
            break
          }
          default:
            break
        }
      }
      if (data.from === EIframeFrom.Payment) {
        const { action } = data
        switch (action) {
          case 'LOGOUT': {
            getMeForNoSendMsg()
            break
          }
          default:
            break
        }
      }
    }
    window.addEventListener('message', msgListener)
    return () => window.removeEventListener('message', msgListener)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <iframe ref={iframeRef} src={MSG_URL} style={{ display: 'none' }} />
}
