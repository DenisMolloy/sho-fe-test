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
import * as React from 'react'
import {
  forwardRef,
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem as ChakraBreadcrumbItem,
  BreadcrumbLink as ChakraBreadcrumbLink,
} from '@chakra-ui/react'
import Link from 'Components/Link'

/**
 * @typedef { Omit<import('@chakra-ui/react').BreadcrumbProps, 'variant'> } ChakraBreadcrumbProps
 * @typedef {{
 *   label: string,
 *   url: string,
 *   isCurrentPage?: boolean
 * }} BreadcrumbItem
 * @typedef { import('lib/types').PropsOf<typeof Link>['variant'] } LinkVariant
 * @typedef {{
 *   items: BreadcrumbItem[],
 *   variant?: LinkVariant
 * }} BreadcrumbProps
 */
const Breadcrumb = forwardRef(
  (
    /** @type {BreadcrumbProps & ChakraBreadcrumbProps} */
    props,
    /** @type {React.LegacyRef<HTMLDivElement>} */
    ref,
  ) => {
    const { items, variant, ...rest } = props

    return (
      <ChakraBreadcrumb ref={ref} {...rest}>
        {items.map(({ label, url, isCurrentPage }) => (
          <ChakraBreadcrumbItem key={label} isCurrentPage={isCurrentPage}>
            <ChakraBreadcrumbLink href={url} as={Link} variant={variant}>
              {label}
            </ChakraBreadcrumbLink>
          </ChakraBreadcrumbItem>
        ))}
      </ChakraBreadcrumb>
    )
  },
)

export default Breadcrumb
