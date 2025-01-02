import React from 'react'

import { channels } from '@core/constants'

import authService from '@core/app/_services'

import { helper } from '../helper'

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

const GoogleOAuth = () => {
  const { mutateAsync } = authService.useGoogle()
  return (
    <GoogleOAuthProvider clientId="891151639714-mlirt06engupkrgjonsc9qlv0eifmbno.apps.googleusercontent.com">
      <GoogleLogin
        size="large"
        locale="vi_VN"
        onSuccess={(response) => {
          mutateAsync(response as any).then(() => {
            const authChannel = new BroadcastChannel(channels.auth)
            const msg = {
              type: 'AUTH',
              action: 'LOGGED_IN',
            }
            authChannel.postMessage(msg)
            authChannel.close()
            helper.sleep(500).finally(() => window.close())
          })
        }}
      />
    </GoogleOAuthProvider>
  )
}

export default GoogleOAuth
