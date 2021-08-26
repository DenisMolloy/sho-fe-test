/**
 *
 * MIT License
 *
 * Copyright 2021 Shogun, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import React from 'react'
import { useCustomerState } from 'frontend-customer'
import { useRouter } from 'frontend-router'
import Spinner from 'Components/Spinner'
import Text from 'Components/Text'

const REDIRECT_DELAY = 750

/**
 * @typedef {{
 *  allowedAuthStatus: 'authenticated' | 'unauthenticated'
 *  redirectUrl: string
 *  children: React.ReactNode
 * }} AppProps
 *
 * @param { AppProps } props
 */
const AuthGuard = ({ allowedAuthStatus, redirectUrl, children }) => {
  const { status, isLoggedIn } = useCustomerState()
  const router = useRouter()

  const [firstLoad, setFirstLoad] = React.useState(false)
  const authStatus = React.useMemo(() => {
    if (status === 'initial' || status === 'loading') {
      return status
    }
    return isLoggedIn ? 'authenticated' : 'unauthenticated'
  }, [status, isLoggedIn])
  const prevStatus = React.useRef(authStatus)

  const shouldRedirect = !['initial', 'loading', allowedAuthStatus].includes(authStatus)

  React.useEffect(() => {
    if (shouldRedirect) {
      const timerId = setTimeout(() => router.push(redirectUrl), REDIRECT_DELAY)

      return () => {
        clearTimeout(timerId)
      }
    }

    // https://github.com/vercel/next.js/issues/18127
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRedirect, redirectUrl])

  React.useEffect(() => {
    if (prevStatus.current === 'initial' && authStatus === 'loading') {
      setFirstLoad(true)

      return () => {
        setFirstLoad(false)
      }
    }

    prevStatus.current = authStatus
  }, [status])

  if (authStatus === 'initial') return null

  if (firstLoad) return <Spinner />

  if (shouldRedirect) {
    return (
      <Text>
        <Text as="span" textTransform="capitalize" mr="2">
          {authStatus}!
        </Text>
        Redirecting to <Text as="i">{redirectUrl}</Text>...
      </Text>
    )
  }

  return <React.Fragment>{children}</React.Fragment>
}

export default AuthGuard
