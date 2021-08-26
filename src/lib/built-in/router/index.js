import * as React from 'react'
export { default } from 'next/router'
export { RouterContext } from 'next/dist/next-server/lib/router-context'

import { useRouter as useNextRouter } from 'next/router'

const isBrowser = typeof window !== 'undefined'

export function useRouter() {
  const router = useNextRouter()

  const search = React.useMemo(() => {
    const queryKeys = Object.keys(router.query)
    if (queryKeys.length === 0) return ''
    return '?' + queryKeys.map((key) => `${key}=${router.query[key]}`).join('&')
  }, [router.query])

  /**
   * @typedef {{
   *  pathname: string
   *  search: string
   *  hash: string
   *  state?: string
   * }} Location
   * @type { [Location, React.Dispatch<React.SetStateAction<Location>> ] }
   */
  const [location, setLocation] = React.useState({
    pathname: router.pathname,
    search,
    hash: '',
  })

  React.useEffect(() => {
    if (isBrowser) setLocation(/** @type {Location} */ window.location)
  }, [])

  return {
    location,
    pathname: router.pathname,
    query: router.query,
    push: router.push,
    replace: router.replace,
    reload: router.reload,
    back: router.back,
    events: router.events,
  }
}
