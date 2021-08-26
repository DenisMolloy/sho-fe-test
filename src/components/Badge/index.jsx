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
import { Badge as ChakraBadge } from '@chakra-ui/react'
import Container from 'Components/Container'
import { normalizePropValue } from 'Components/Utils'

/**
 * @typedef { import("@chakra-ui/react").BadgeProps } ChakraBadgeProps
 * @typedef { import("@chakra-ui/react").SpaceProps } SpaceProps
 * @typedef { import("Components/Container").ContainerProps } ContainerProps
 * @typedef { import("Components/Theme/types").ComponentVariant<'Badge'> } BadgeComponentVariant
 *
 * @typedef {{
 *  containerProps?: ContainerProps
 *  badgeContent: React.ReactChild
 *  badgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
 *  xOverhang?: SpaceProps['margin']
 *  yOverhang?: SpaceProps['margin']
 *  variant?: ChakraBadgeProps['variant'] | BadgeComponentVariant | 'undefined'
 * }} BadgeProps
 *
 * @param { BadgeProps & ChakraBadgeProps } props
 */
const Badge = ({
  containerProps,
  badgeContent,
  badgePosition,
  xOverhang = 4,
  yOverhang = 4,
  variant,
  children,
  ...rest
}) => {
  const normalizedBadgePosition = normalizePropValue(badgePosition, 'top-right')
  const normalizedVariant = normalizePropValue(variant)

  if (!normalizedBadgePosition) {
    return null
  }

  return (
    <Container position="relative" display="inline-block" {...containerProps}>
      <ChakraBadge
        {...rest}
        variant={normalizedVariant}
        position="absolute"
        top={normalizedBadgePosition.startsWith('top') ? `-${yOverhang}` : undefined}
        left={normalizedBadgePosition.endsWith('left') ? `-${xOverhang}` : undefined}
        bottom={normalizedBadgePosition.startsWith('bottom') ? `-${yOverhang}` : undefined}
        right={normalizedBadgePosition.endsWith('right') ? `-${xOverhang}` : undefined}
      >
        {badgeContent}
      </ChakraBadge>
      {children}
    </Container>
  )
}

export default Badge
