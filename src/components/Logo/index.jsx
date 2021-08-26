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
import Image from 'Components/Image'
import Link from 'Components/Link'

const LINK_DEFAULT = '/'

/**
 * @typedef { import("lib/types").Media } Media
 * @type { Media }
 */
const defaultImage = {
  name: 'Default Image',
  src: 'https://f.shgcdn.com/4f1c2c48-c495-40f7-830b-ccaa81ddf204/',
  alt: 'Shogun Logo',
  height: 1440,
  width: 2850,
}

/**
 * @typedef {{
 *  image?: Media
 *  link?: string
 * }} LogoProps
 * @param {LogoProps} props
 */
const Logo = ({ image, link }) => {
  const imageDetails = image || defaultImage
  const { src, alt = '', height = '', width = '' } = imageDetails

  return (
    <Link href={link || LINK_DEFAULT}>
      <Image
        src={src}
        alt={alt}
        htmlHeight={height.toString()}
        htmlWidth={width.toString()}
        sizes="150px"
      />
    </Link>
  )
}

export default Logo
