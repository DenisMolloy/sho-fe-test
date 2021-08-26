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
import Button from 'Components/Button'
import CartItem from 'Components/CartItem'
import Container from 'Components/Container'
import Divider from 'Components/Divider'
import Flex from 'Components/Flex'
import Link from 'Components/Link'
import Spinner from 'Components/Spinner'
import Text from 'Components/Text'

/**
 * @typedef {{
 * inDrawer?: boolean
 * }} CartItemsProps
 *
 * @param {CartItemsProps} props
 */
const CartItems = ({ inDrawer }) => {
  const { hideCart } = useCartActions()
  const { checkoutUrl, items, inventory, subtotalPrice } = useCartState()
  const loading = inventory.status === 'loading'

  const allItemsSoldOut = items.every(product => product.variant.available === false)

  return (
    <Container w="95%" minW="2xs" maxW="5xl" mx="auto">
      {loading ? (
        <Flex justifyContent="center" p="20">
          <Spinner />
        </Flex>
      ) : (
        <React.Fragment>
          <Text fontSize="lg" fontWeight="semibold" my="4">
            Shopping cart ({items.length})
          </Text>
          {items.length ? (
            <React.Fragment>
              {items.map(product => (
                <Container key={product.id}>
                  <CartItem inDrawer={inDrawer} product={product} />
                  <Divider my="4" borderBottomWidth="1px" />
                </Container>
              ))}
              <Container maxW={{ base: 'full', lg: 'md' }} m="0 auto" mr={{ lg: '0' }}>
                <Flex justifyContent="space-between" my="4">
                  <Text fontWeight="semibold">Subtotal:</Text>
                  <Text>{formatMoney({ money: subtotalPrice })}</Text>
                </Flex>
                <Flex flexDirection={{ base: 'column', lg: 'row' }} justifyContent="space-between">
                  <Button
                    onClick={hideCart}
                    variant="outline"
                    size="md"
                    borderRadius="0"
                    my={{ base: '4', lg: '0' }}
                  >
                    Continue shopping
                  </Button>
                  <Link
                    href={checkoutUrl}
                    size="md"
                    variant="primary"
                    target="_self"
                    style={{
                      pointerEvents: allItemsSoldOut ? 'none' : 'initial',
                    }}
                  >
                    Checkout
                  </Link>
                </Flex>
                {allItemsSoldOut && (
                  <Text>Sorry, all the products in your cart are unavailable.</Text>
                )}
              </Container>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text>Your cart is currently empty.</Text>
              <Link href="/" variant="primary" size="md">
                Start shopping
              </Link>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </Container>
  )
}

export default CartItems
