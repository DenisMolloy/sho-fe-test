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
import { forwardRef, HStack, Input, useMultiStyleConfig, useNumberInput } from '@chakra-ui/react'

import Icon from 'Components/Icon'
import IconButton from 'Components/IconButton'

/**
 * @typedef { import("@chakra-ui/react").UseNumberInputProps } UseNumberInputProps
 * @typedef { import("@chakra-ui/react").StackProps } StackProps
 * @typedef { import("@chakra-ui/react").IconButtonProps } IconButtonProps
 * @typedef { import("@chakra-ui/react").InputProps } InputProps
 * @typedef {{
 *  containerProps?: StackProps
 *  inputProps?: InputProps
 *  buttonProps?: Omit<IconButtonProps, 'aria-label'>
 * }} NumberInputProps
 */

/**
 *
 * @param { NumberInputProps & UseNumberInputProps } props
 * @param { React.LegacyRef<HTMLDivElement> } ref
 */
const NumberInput = (props, ref) => {
  const {
    defaultValue = 1,
    step = 1,
    min = 1,
    max = 100,
    allowMouseWheel = true,
    containerProps,
    inputProps,
    buttonProps,
    ...rest
  } = props

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    defaultValue,
    step,
    min,
    max,
    allowMouseWheel,
    ...rest,
  })

  const dec = getDecrementButtonProps(buttonProps)
  const inc = getIncrementButtonProps(buttonProps)
  const input = getInputProps(inputProps)

  const styles = useMultiStyleConfig('NumberInput', {})

  return (
    <HStack ref={ref} sx={styles.Stack} {...containerProps}>
      <IconButton
        aria-label={`Decrement by ${step}`}
        icon={<Icon icon="MinusIcon" />}
        variant="outline"
        {...dec}
      />
      <Input sx={styles.Input} {...input} />
      <IconButton
        aria-label={`Increment by ${step}`}
        icon={<Icon icon="AddIcon" />}
        variant="outline"
        {...inc}
      />
    </HStack>
  )
}

export default forwardRef(NumberInput)
