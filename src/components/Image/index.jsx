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
import { ResponsiveImage } from 'frontend-ui'
import { forwardRef, Img } from '@chakra-ui/react'

const CLOUDINARY_PROXY_URL = 'https://res.cloudinary.com/shogun-frontend/image/fetch/'
const shogunCDN = [
  'assets.frontend.shogun.dev',
  'frontend.shgcdn.com',
  'ucarecdn.com',
  'f.shgcdn.com',
]

/**
 * @param { string | undefined } src
 */
export const getFormattedImageSrc = (src = '') =>
  shogunCDN.some(url => src.includes(url)) ? src : `${CLOUDINARY_PROXY_URL}${src}`

/**
 * @typedef { import("frontend-ui").ResponsiveImageProps } ResponsiveImageProps
 * @typedef {{
 *  htmlWidth?: string
 *  htmlHeight?: string
 * }} ImageProps
 * @param { ImageProps & ResponsiveImageProps } props
 */
const ImageWrapper = ({ htmlWidth, htmlHeight, src, ...rest }) => (
  <ResponsiveImage
    width={htmlWidth}
    height={htmlHeight}
    src={getFormattedImageSrc(src)}
    {...rest}
  />
)

/**
 * @typedef { import("@chakra-ui/react").ImgProps } ChakraImageProps
 *
 * @param { ImageProps & Omit<ChakraImageProps, keyof Omit<ResponsiveImageProps, 'width' | 'height'>> & ResponsiveImageProps } props,
 * @param { React.LegacyRef<HTMLImageElement> }  ref,
 */
const Image = ({ loading, ...rest }, ref) => (
  <Img ref={ref} as={ImageWrapper} loading={/** @type { any } */ (loading)} {...rest} />
)

export default forwardRef(Image)
