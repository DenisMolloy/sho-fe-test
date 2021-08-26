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
import { useCartActions, useCartState } from 'frontend-checkout'
import { formatMoney } from 'Components/Utils'
import Image from 'Components/Image'
import Heading from 'Components/Heading'
import Icon from 'Components/Icon'
import Link from 'Components/Link'
import NumberInput from 'Components/NumberInput'
import Text from 'Components/Text'
import IconButton from 'Components/IconButton'
import Grid from 'Components/Grid'
import GridItem from 'Components/GridItem'
import Flex from 'Components/Flex'

/**
 * @typedef { import('lib/types').CheckoutProduct } CheckoutProduct
 * @typedef {{
 *  product: CheckoutProduct
 * inDrawer?: boolean
 * }} CartItemProps
 *
 * @param {CartItemProps} props
 */
const CartItem = ({ product, inDrawer }) => {
  const { id, quantity, title: name, variant } = product
  const { id: variantId, image, price, product: variantProduct, title: variantTitle } = variant
  const { src } = image
  const { handle: slug } = variantProduct
  const productUrl = `/products/${slug}`

  const { removeItems, updateItems } = useCartActions()
  const { inventory } = useCartState()
  const inventoryVariant =
    inventory.status === 'loaded' &&
    inventory.productVariants &&
    inventory.productVariants[variantId]
      ? inventory.productVariants[variantId]
      : undefined

  const soldOut = inventoryVariant && !inventoryVariant.availableForSale
  const maxQuantity = inventoryVariant && inventoryVariant.quantity

  /**
   *
   * @param {string} _
   * @param {number} quantityAsNumber
   */
  const onChangeItemQuantity = (_, quantityAsNumber) => {
    updateItems({ id, quantity: quantityAsNumber })
  }

  return (
    <Grid
      p={1}
      minWidth="2xs"
      bg={soldOut ? 'gray.100' : 'transparent'}
      templateAreas={{
        base: "'thumbnail name remove-button' 'thumbnail price price'",
        md: inDrawer ? undefined : "'thumbnail name price remove-button'",
      }}
      templateColumns={{
        base: '5rem 1fr 2rem',
        md: '7.5rem 6fr 3fr 1fr',
      }}
      gap={4}
      alignItems="center"
    >
      <GridItem gridArea="thumbnail">
        <Link href={productUrl}>
          <Image src={src} alt="" htmlWidth="180" htmlHeight="120" />
        </Link>
      </GridItem>

      <GridItem gridArea="name">
        <Link href={productUrl}>
          <Heading as="h3" color="black" fontWeight="semibold" size="sm">
            {name}
          </Heading>
          {variantTitle && (
            <Text fontSize="sm" noOfLines={1}>
              {variantTitle}
            </Text>
          )}
        </Link>
        {soldOut && (
          <Text fontSize="sm" color="red.600">
            Sold Out
          </Text>
        )}
      </GridItem>

      <GridItem gridArea="price" pr={1}>
        <Flex flexWrap={{ base: 'wrap', sm: 'nowrap' }} mb={-2} ml={-10}>
          <Text
            display={inDrawer ? { base: 'none', xl: 'unset' } : undefined}
            mb={2}
            ml={10}
            fontWeight="semibold"
          >
            {formatMoney({ money: price })}
          </Text>
          <NumberInput
            value={quantity}
            isDisabled={!!soldOut}
            max={maxQuantity}
            onChange={onChangeItemQuantity}
            containerProps={{
              maxW: 80,
              minW: 28,
              mb: 2,
              ml: 10,
            }}
            inputProps={{
              'aria-label': 'Product quantity',
              size: 'xs',
            }}
            buttonProps={{
              size: 'xs',
              height: 'full',
            }}
          />
          <Text mb={2} ml={10} fontWeight="semibold">
            {formatMoney({ money: Number(price) * quantity })}
          </Text>
        </Flex>
      </GridItem>

      <GridItem
        pr={1}
        gridArea="remove-button"
        alignSelf={{ base: 'start', md: 'center' }}
        justifySelf="end"
      >
        <IconButton
          icon={<Icon icon="CloseIcon" />}
          aria-label={`Remove ${name} from cart`}
          size="xs"
          border="0"
          variant="outline"
          height="full"
          p="1"
          _hover={{ color: 'gray.700' }}
          onClick={() => removeItems(id)}
        />
      </GridItem>
    </Grid>
  )
}

export default CartItem
