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
import Grid from 'Components/Grid'
import GridItem from 'Components/GridItem'
import Heading from 'Components/Heading'
import Image from 'Components/Image'
import Flex from 'Components/Flex'
import Text from 'Components/Text'
import { formatMoney } from 'Components/Utils'
import Container from 'Components/Container'

/**
 * @typedef { import("frontend-customer/dist/customer-sdk/platforms/shopify/storefront-api/types/api").Order['lineItems']['edges'][0]['node'] } Item
 *
 * @param {{item: Item}} props
 */
function OrderDetailsItem({ item }) {
  const { title, variant, quantity, discountedTotalPrice, originalTotalPrice } = item
  const { title: variantTitle, image } = variant

  const hasDiscount = Number(discountedTotalPrice.amount) < Number(originalTotalPrice.amount)

  return (
    <Grid
      p={1}
      minWidth="2xs"
      templateAreas={{
        base: "'thumbnail name' 'thumbnail price'",
        md: "'thumbnail name price'",
      }}
      templateColumns={{
        base: '5rem 1fr',
        md: '7.5rem 2fr 1fr',
      }}
      gap={4}
      alignItems="center"
    >
      <GridItem gridArea="thumbnail">
        <Image
          src={image.originalSrc}
          alt={image.altText}
          htmlWidth={image.width.toString()}
          htmlHeight={image.width.toString()}
        />
      </GridItem>

      <GridItem gridArea="name">
        <Heading as="h3" color="black" fontWeight="semibold" size="sm">
          {title}
        </Heading>
        {variantTitle && (
          <Text fontSize="sm" noOfLines={1}>
            {variantTitle}
          </Text>
        )}
      </GridItem>

      <GridItem gridArea="price" pr={1} justifySelf={{ sm: 'self-end' }}>
        <Flex fontWeight="semibold">
          <Text>{quantity}</Text>
          <Container as="span" ml={32}>
            {hasDiscount ? (
              <React.Fragment>
                <Text as="del" mr={2}>
                  {formatMoney({ money: originalTotalPrice.amount })}
                </Text>
                <Text>{formatMoney({ money: discountedTotalPrice.amount })}</Text>
              </React.Fragment>
            ) : (
              <Text>{formatMoney({ money: originalTotalPrice.amount })}</Text>
            )}
          </Container>
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default OrderDetailsItem
