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
import Container from 'Components/Container'
import Flex from 'Components/Flex'
import Image from 'Components/Image'
import List from 'Components/List'
import ListItem from 'Components/ListItem'
import Text from 'Components/Text'
import { formatMoney } from 'Components/Utils'
import Link from 'Components/Link'

const ORDERS_URL = '/account/orders'

/**
 * @typedef { import("frontend-customer/dist/customer-sdk/platforms/shopify/storefront-api/types/api").Order } Order
 *
 * @param {{ ordersUrl: string, orders: Order[] | null }} props
 */

const OrderHistory = props => {
  const ordersUrl = props.ordersUrl || ORDERS_URL
  const orders = props.orders || []

  if (orders.length === 0) {
    return (
      <Container>
        You don't have any orders yet. <Link href="/">Start Shopping!</Link>
      </Container>
    )
  }

  return (
    <List>
      {orders.map(({ id, financialStatus, lineItems, name, totalPriceV2 }) => (
        <ListItem key={id} mb="12">
          <Flex alignItems="center" bg="gray.200" justifyContent="space-between" p="4">
            <Link href={`${ordersUrl}?order-id=${id}`} fontSize="lg">
              Order {name}
            </Link>

            <Container>
              <Text fontWeight="semibold">
                {formatMoney({
                  money: totalPriceV2.amount,
                  options: { currency: totalPriceV2.currencyCode },
                })}
              </Text>
              <Text>{financialStatus}</Text>
            </Container>
          </Flex>

          <List
            mt="4"
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(120px, 1fr))"
            gridGap="4"
          >
            {lineItems.edges.map(({ node: { title, variant } }) => (
              <ListItem
                key={variant.id}
                alignItems="center"
                display="flex"
                flexDirection="column"
                textAlign="center"
              >
                <Image
                  src={variant.image.originalSrc}
                  htmlHeight={variant.image.height.toString()}
                  htmlWidth={variant.image.width.toString()}
                  sizes="100px"
                />
                <Text fontSize="sm" noOfLines={3}>
                  {title}
                </Text>
              </ListItem>
            ))}
          </List>
        </ListItem>
      ))}
    </List>
  )
}

export default OrderHistory
