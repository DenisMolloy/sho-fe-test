import React from 'react'
import { default as RouterLink } from 'next/link'

/**
 * You can pass any prop you'd pass to <a> tag to Link component
 * also additionally next link props: https://nextjs.org/docs/api-reference/next/link
 *
 * @typedef {{
 *  to?: string
 *  href: string
 *  as?: string
 *  children: React.ReactNode
 *  className?: string
 *  replace?: boolean
 *  scroll?: boolean
 *  shallow?: boolean
 *  target?: string
 *  passHref?: boolean
 *  prefetch?: boolean
 *  locale?: string | false
 *  onBeforePageChange?: (to: string) => void
 *  onClick?: React.MouseEventHandler<HTMLAnchorElement>
 * }} LinkProps
 */
const Link = React.forwardRef((
  /** @type {LinkProps} */ {
    to,
    href,
    as,
    children,
    className,
    replace,
    scroll,
    shallow,
    target,
    passHref,
    prefetch,
    locale,
    onBeforePageChange,
    onClick,
    ...rest
  },
  /** @type { React.ForwardedRef<HTMLAnchorElement> } */ ref,
) => {
  prefetch = false // we don't want prefetch turned on while developing

  return (
    <RouterLink
      href={to || href}
      replace={replace}
      scroll={scroll}
      as={as}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
      locale={locale}
    >
      <a ref={ref} className={className} target={target} {...rest}>
        {children}
      </a>
    </RouterLink>
  )
})

export default Link
