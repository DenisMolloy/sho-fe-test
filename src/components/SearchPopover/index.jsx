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
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Portal,
  PopoverBody,
  Popover,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'
import Icon from 'Components/Icon'
import SearchQueryInput from 'Components/SearchQueryInput'
import { normalizePropValue } from 'Components/Utils'
import IconButton from 'Components/IconButton'

/**
 * @typedef { import("Components/SearchQueryInput").SearchQueryInputProps } SearchQueryInputProps
 * @param { SearchQueryInputProps } props
 */
const SearchPopover = props => {
  let { size, variant, icon = <Icon as={BiSearch} size="md" />, ...rest } = props

  /**
   * @typedef { import("Components/Theme/types").ComponentSize<'SearchPopover'> } SearchPopoverComponentSize
   * @type { SearchPopoverComponentSize }
   */
  size = normalizePropValue(size)
  /**
   * @typedef { import("Components/Theme/types").ComponentVariant<'SearchPopover'> } SearchPopoverComponentVariant
   * @type { SearchPopoverComponentVariant }
   */
  variant = normalizePropValue(variant)

  const styles = useMultiStyleConfig('SearchPopover', { size, variant })

  /** @type { React.MutableRefObject<HTMLInputElement | null> } */
  const inputRef = React.useRef(null)
  /** @type { React.MutableRefObject<HTMLButtonElement | null> } */
  const buttonRef = React.useRef(null)

  return (
    <Popover initialFocusRef={inputRef} placement="bottom" gutter={10} flip={false}>
      <PopoverTrigger>
        <IconButton
          variant="iconWrapper"
          ref={buttonRef}
          aria-label="Open search input"
          icon={icon}
          size={8}
        />
      </PopoverTrigger>

      <Portal>
        <PopoverContent sx={styles.popoverContent}>
          <PopoverArrow />
          <PopoverBody sx={styles.popoverBody}>
            <SearchQueryInput ref={inputRef} size={size} variant={variant} icon={icon} {...rest} />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default SearchPopover
