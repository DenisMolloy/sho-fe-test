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
import { Item, useCartActions, useCartState } from 'frontend-checkout'
import { forwardRef } from '@chakra-ui/react'
import Button from 'Components/Button'

const AVAILABLE_FOR_SALE_TEXT_DEFAULT = 'Add to Cart'
const OUT_OF_STOCK_TEXT_DEFAULT = 'Sold out'

/**
 * @typedef { import("Components/Button").ButtonProps } ButtonProps
 * @typedef {{
 *  productId?: Item['id']
 *  quantity: number
 *  isFullWidth?: boolean
 *  availableForSaleText?: string
 *  outOfStockText?: string
 * }} AddToCartButtonProps
 */
const AddToCartButton = forwardRef(
  (
    /** @type { AddToCartButtonProps & Omit<ButtonProps, 'children'> } */
    props,
    /** @type { React.LegacyRef<HTMLButtonElement>} */
    ref,
  ) => {
    const { availableForSaleText, outOfStockText, productId, quantity, ...rest } = props
    const { addItems, showCart } = useCartActions()
    const { inventory } = useCartState()

    const [isLoading, setLoading] = React.useState(true)
    const [isDisabled, setDisabled] = React.useState(false)

    const buttonEnabledText = availableForSaleText || AVAILABLE_FOR_SALE_TEXT_DEFAULT
    const buttonDisabledText = outOfStockText || OUT_OF_STOCK_TEXT_DEFAULT

    React.useEffect(() => {
      setLoading(inventory.status === 'loading')

      if (inventory.productVariants && productId) {
        setDisabled(!inventory.productVariants[productId].availableForSale)
      }
    }, [inventory, productId])

    const clickHandler = () => {
      if (!productId) {
        throw new Error('The productId variable is required but was not specified.')
      }

      addItems({ id: productId, quantity })
      showCart()
    }

    return (
      <Button
        ref={ref}
        disabled={isDisabled}
        onClick={clickHandler}
        isFullWidth={true}
        isLoading={isLoading}
        {...rest}
      >
        {isDisabled ? buttonDisabledText : buttonEnabledText}
      </Button>
    )
  },
)

export default AddToCartButton
