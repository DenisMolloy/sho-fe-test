import { action } from '@storybook/addon-actions'
import { forceReRender } from '@storybook/react'

export const Router = { router: {} }

const ALLOWED_PATHS = ['/search', '/account/orders']

Router.router = {
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',

  push(url, as, options) {
    action('frontendRouter.push')(url, as, options)

    const { pathname, searchParams } = new URL(url, 'http://dummy.url')

    if (ALLOWED_PATHS.includes(pathname)) {
      const query = {}

      searchParams.forEach((value, key) => {
        if (typeof query[key] === 'undefined') {
          query[key] = value
        } else if (Array.isArray(query[key])) {
          query[key].push(value)
        } else {
          query[key] = [query[key], value]
        }
      })

      Router.router = {
        ...Router.router,
        route: pathname,
        pathname,
        asPath: as,
        query,
      }

      forceReRender()
    }

    return Promise.resolve(true)
  },

  replace(...args) {
    action('frontendRouter.replace')(...args)

    return Promise.resolve(true)
  },

  reload(...args) {
    action('frontendRouter.reload')(...args)
  },

  back(...args) {
    action('frontendRouter.back')(...args)
  },

  prefetch(...args) {
    action('frontendRouter.prefetch')(...args)

    return Promise.resolve()
  },

  beforePopState(...args) {
    action('frontendRouter.beforePopState')(...args)
  },

  events: {
    on(...args) {
      action('frontendRouter.events.on')(...args)
    },
    off(...args) {
      action('frontendRouter.events.off')(...args)
    },
    emit(...args) {
      action('frontendRouter.events.emit')(...args)
    },
  },

  isFallback: false,
}
