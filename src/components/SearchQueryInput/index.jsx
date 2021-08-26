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
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  VisuallyHidden,
  forwardRef,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import Icon from 'Components/Icon'
import IconButton from 'Components/IconButton'
import { normalizePropValue } from 'Components/Utils'
import { nanoid } from 'nanoid'

/**
 * @typedef { import("Components/Theme/types").ComponentSize<'SearchQueryInput'> } SearchQueryInputComponentSize
 * @typedef { import("Components/Theme/types").ComponentVariant<'SearchQueryInput'> } SearchQueryInputComponentVariant
 * @typedef {{
 *  size?: SearchQueryInputComponentSize | 'undefined'
 *  variant?: SearchQueryInputComponentVariant | 'undefined'
 *  initialValue?: string
 *  disabled?: boolean
 *  placeholder?: string
 *  icon?: React.ReactElement
 *  onClick?: React.MouseEventHandler<HTMLInputElement>
 *  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
 *  onSearchSubmit: (query: string) => void
 * }} SearchQueryInputProps
 */
const SearchQueryInput = forwardRef(
  (
    /** @type { SearchQueryInputProps } */
    props,
    /** @type { React.LegacyRef<HTMLInputElement>} */
    ref,
  ) => {
    const {
      initialValue = '',
      disabled,
      placeholder = 'Search',
      icon = <Icon icon="SearchIcon" />,
      onClick,
      onKeyDown,
      onSearchSubmit,
    } = props
    /** @type { SearchQueryInputComponentSize | undefined } */
    const size = normalizePropValue(props.size)
    /** @type { SearchQueryInputComponentVariant | undefined } */
    const variant = normalizePropValue(props.variant)

    const styles = useMultiStyleConfig('SearchQueryInput', { size, variant })

    const [query, setQuery] = React.useState(initialValue)
    const uniqueId = React.useMemo(() => `search-store-${nanoid()}`, [])

    return (
      <form
        onSubmit={e => {
          e.preventDefault()
          onSearchSubmit(query)
        }}
      >
        <FormControl>
          <InputGroup sx={styles.inputGroup} size={size}>
            <VisuallyHidden as="label" htmlFor={uniqueId}>
              Search
            </VisuallyHidden>
            <Input
              id={uniqueId}
              sx={styles.input}
              ref={ref}
              size={size}
              name="query"
              value={query}
              disabled={disabled}
              placeholder={placeholder}
              required
              onChange={e => setQuery(e.target.value)}
              onClick={onClick}
              onKeyDown={onKeyDown}
            />
            <InputRightElement sx={styles.inputRightElement} size={size}>
              <IconButton
                sx={styles.iconButton}
                size="full"
                type="submit"
                aria-label="Submit search query"
                disabled={query.length === 0 || disabled}
                icon={icon}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </form>
    )
  },
)

export default SearchQueryInput
