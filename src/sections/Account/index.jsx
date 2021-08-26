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
import { useCustomerActions, useCustomerState } from 'frontend-customer'
import { FaBoxes } from 'react-icons/fa'
import AuthGuard from 'Components/AuthGuard'
import Button from 'Components/Button'
import Container from 'Components/Container'
import Grid from 'Components/Grid'
import GridItem from 'Components/GridItem'
import Heading from 'Components/Heading'
import HStack from 'Components/HStack'
import Icon from 'Components/Icon'
import Link from 'Components/Link'
import Text from 'Components/Text'
import { isShopifyAccount, isShopifyAccountAddress } from 'Components/Utils'

const HEADER_TEXT = 'Your account'
const LOGIN_URL = '/account/login'
const RESET_PASSWORD_URL = '/account/reset-password'
const ORDERS_URL = '/account/orders'
const ADDRESS_URL = '/account/address'

/**
 * @typedef {{
 *  headerText: string
 *  loginUrl: string
 *  resetPasswordUrl: string
 *  ordersUrl: string
 *  addressUrl: string
 * }} AccountProps
 *
 * @param props {AccountProps}
 */
const Account = props => {
  const headerText = props.headerText || HEADER_TEXT
  const loginUrl = props.loginUrl || LOGIN_URL
  const resetPasswordUrl = props.resetPasswordUrl || RESET_PASSWORD_URL
  const ordersUrl = props.ordersUrl || ORDERS_URL
  const addressUrl = props.addressUrl || ADDRESS_URL

  const { getAllAddresses, logout, updateDefaultAddress } = useCustomerActions()
  const customerState = useCustomerState()

  if (!isShopifyAccount(customerState)) {
    throw new Error(
      'Expected defaultAddress property to exist in customerState. Only Shopify API is supported.',
    )
  }

  const { addresses, defaultAddress, displayName, email, firstName, isLoggedIn, lastName, status } =
    customerState

  if (!isShopifyAccountAddress(addresses)) {
    throw new Error('Expected zip property to exist in address. Only Shopify API is supported.')
  }

  React.useEffect(() => {
    if (isLoggedIn) getAllAddresses()
  }, [isLoggedIn, getAllAddresses])

  return (
    <Container as="section" variant="section-wrapper">
      <HStack justify="space-between" mb={12}>
        <Heading as="h1">{headerText}</Heading>
        {isLoggedIn && (
          <Button variant="outline" size="sm" onClick={logout}>
            Sign Out
          </Button>
        )}
      </HStack>

      <AuthGuard allowedAuthStatus="authenticated" redirectUrl={loginUrl}>
        <HStack mb={12}>
          <Link href={ordersUrl} variant="secondary" minW="auto" size="md">
            <HStack>
              <Icon size="lg" as={FaBoxes} mr={4} />
              <Text as="span">Orders</Text>
            </HStack>
          </Link>
        </HStack>

        <Grid gridRowGap={8}>
          <GridItem>
            <Text as="strong">Name:</Text>
            <Text wordBreak="break-word">{displayName || [firstName, lastName].join(' ')}</Text>
          </GridItem>

          <GridItem>
            <Text as="strong">Email:</Text>
            <Text wordBreak="break-word">{email}</Text>
          </GridItem>

          <GridItem display={{ md: 'flex' }}>
            <Container flexGrow={1} alignItems="start">
              <Text as="strong">Password:</Text>
              <Text aria-hidden="true">********</Text>
            </Container>

            <Link
              href={resetPasswordUrl}
              color="black"
              mt={{ base: 2, md: 3 }}
              minW="40"
              textDecoration="underline"
            >
              Change password
            </Link>
          </GridItem>

          {addresses && (
            <GridItem display={{ md: 'flex' }}>
              <Container flex={1} mb={{ base: 3, md: 0 }}>
                <Text as="strong">Addresses:</Text>
                {addresses.map(
                  ({ address1, address2, city, country, id, phone, province, zip }) => (
                    <Container key={id} mt={2} mb={8}>
                      <Container as="address">
                        <Text>{address1}</Text>
                        {address2 && <Text>{address2}</Text>}
                        <Text>
                          {city}, {province}, {zip}
                        </Text>
                        <Text>{country}</Text>
                        {phone && <a href={`tel:${phone}`}>{phone}</a>}
                      </Container>
                      <HStack h={8} justify="space-between" mt={2} maxW="400px">
                        <Link
                          href={`${addressUrl}?id=${id}`}
                          color="black"
                          textDecoration="underline"
                        >
                          Edit address
                        </Link>
                        {defaultAddress && defaultAddress.id === id ? (
                          <Text as="strong">Default</Text>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            isLoading={status === 'loading'}
                            loadingText="Updating..."
                            onClick={() => updateDefaultAddress(id)}
                          >
                            Make default
                          </Button>
                        )}
                      </HStack>
                    </Container>
                  ),
                )}
                <Container mt={8}>
                  <Link href={addressUrl} color="black" textDecoration="underline">
                    <Icon icon="AddIcon" mb={1} mr={1} size="sm" />
                    Add new address
                  </Link>
                </Container>
              </Container>
            </GridItem>
          )}
        </Grid>
      </AuthGuard>
    </Container>
  )
}

export default Account
