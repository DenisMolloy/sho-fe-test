import * as React from 'react'
import { forwardRef } from '@chakra-ui/react'
import { ResponsiveBackgroundImage } from 'frontend-ui'

import Container from 'Components/Container'

/**
 *
 * @typedef { import('lib/types').PropsOf<Container> } ContainerProps
 * @typedef { import('lib/types').PropsOf<ResponsiveBackgroundImage> } ResponsiveBackgroundImageProps
 *
 * @typedef { ResponsiveBackgroundImageProps & ContainerProps } BackgroundImageProps
 *
 * @param { BackgroundImageProps } props
 */
const BackgroundImageWrapper = ({ src, children, ...rest }) => (
  <ResponsiveBackgroundImage src={src} {...rest}>
    {children}
  </ResponsiveBackgroundImage>
)

/**
 *
 * @param { BackgroundImageProps } props
 * @param { React.LegacyRef<HTMLDivElement> } ref
 */
const BackgroundImage = (props, ref) => (
  <Container ref={ref} as={BackgroundImageWrapper} {...props} />
)

export default forwardRef(BackgroundImage)
