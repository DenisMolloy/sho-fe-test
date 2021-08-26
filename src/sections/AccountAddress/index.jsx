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
import React from 'react'
import { useCustomerActions, useCustomerState } from 'frontend-customer'
import { useRouter } from 'frontend-router'
import { useIsMounted } from 'Components/Hooks'
import { isShopifyAccount, isShopifyAccountAddress } from 'Components/Utils'
import AuthGuard from 'Components/AuthGuard'
import Breadcrumb from 'Components/Breadcrumb'
import Button from 'Components/Button'
import Container from 'Components/Container'
import Grid from 'Components/Grid'
import Heading from 'Components/Heading'
import HStack from 'Components/HStack'
import Input from 'Components/Input'
import Link from 'Components/Link'
import Text from 'Components/Text'

const ACCOUNT_URL = '/account'
const ACCOUNT_ADDRESS_URL = '/account/address'
const ACCOUNT_LOGIN_URL = '/account/login'
const CREATE_TITLE = 'Create address'
const EDIT_TITLE = 'Edit address'

const AccountAddress = () => {
  const { getAllAddresses, createAddress, deleteAddress, updateAddress } = useCustomerActions()
  const customerState = useCustomerState()
  const isMounted = useIsMounted()
  const router = useRouter()

  /** @type { { id?: string } } */
  const { id: addressId } = router.query

  /**
   * @typedef { import("frontend-customer/dist/customer-sdk/platforms/shopify/storefront-api/types/api").MailingAddressInput } MailingAddressInput
   * @type { [MailingAddressInput | Array<any>, React.Dispatch<React.SetStateAction<MailingAddressInput | Array<any>>>] }
   */
  const [formData, setFormData] = React.useState({})

  /**
   * @typedef { import("frontend-customer/dist/customer-sdk/platforms/big_commerce/rest/types/api").BigCommerceApiError } BigCommerceApiError
   * @typedef { import("frontend-customer/dist/customer-sdk/platforms/shopify/storefront-api/types/api").CustomerUserError } CustomerUserError
   * @typedef { BigCommerceApiError[] | CustomerUserError[] | null | undefined } FormErrors
   * @type { [FormErrors, React.Dispatch<React.SetStateAction<FormErrors>>] }
   */
  const [formErrors, setFormErrors] = React.useState()

  if (!isShopifyAccount(customerState)) {
    throw new Error('Expected defaultAddress property to exist in customerState. Only Shopify API is supported.')
  }

  const { addresses, isLoggedIn, status } = customerState

  if (!isShopifyAccountAddress(addresses)) {
    throw new Error('Expected zip property to exist in address. Only Shopify API is supported.')
  }

  React.useEffect(() => {
    if (isLoggedIn) getAllAddresses()
  }, [isLoggedIn, getAllAddresses])

  React.useEffect(() => {
    if (!addresses) return

    const address = addresses.find(address => address.id === addressId)

    if (!address) return

    const { id, ...data } = address

    setFormData(data)
  }, [addresses])

  if (!isShopifyAccountAddress(addresses)) {
    throw new Error('Expected zip property to exist in address. Only Shopify API is supported.')
  }

  /** @param { React.ChangeEvent<HTMLInputElement> } event */
  const handleOnChange = event => {
    const { name, value } = event.target

    setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
  }

  /** @type { React.FormEventHandler<HTMLDivElement> } */
  const handleSubmit = async event => {
    event.preventDefault()

    setFormErrors(null)

    const { errors } = addressId ? (
      await updateAddress({
        id: String(addressId),
        address: formData,
      })
    ) : (
      await createAddress(formData)
    )

    if (!isMounted.current) return

    if (errors) {
      setFormErrors(errors)
    } else {
      router.push(ACCOUNT_URL)
    }
  }

  const handleDelete = async () => {
    const { errors } = await deleteAddress(String(addressId))

    if (!isMounted.current) return

    if (errors) {
      setFormErrors(errors)
    } else {
      router.push(ACCOUNT_URL)
    }
  }

  const submissionEnabled = Boolean(Object.keys(formData).length)
  const { address1, address2, city, company, country, firstName, lastName, phone, province, zip } = formData

  return (
    <Container as="section" variant="section-wrapper">
      <HStack justify="space-between" mb={6}>
        <Breadcrumb
          items={[
            { label: 'Account', url: ACCOUNT_URL },
            { label: 'Address', url: ACCOUNT_ADDRESS_URL, isCurrentPage: true },
          ]}
        />
        {addressId && (
          <Button variant="outline" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </HStack>

      <Heading as="h1" mb={6}>
        {addressId ? EDIT_TITLE : CREATE_TITLE}
      </Heading>

      <AuthGuard allowedAuthStatus="authenticated" redirectUrl={ACCOUNT_LOGIN_URL}>
        <Grid as="form" onSubmit={handleSubmit} rowGap={5}>
          <HStack>
            <Container as="label" w="50%">
              First name
              <Input name="firstName" value={firstName} onChange={handleOnChange} />
            </Container>
            <Container as="label" w="50%">
              Last name
              <Input name="lastName" value={lastName} onChange={handleOnChange} />
            </Container>
          </HStack>
          <Container as="label">
            Company
            <Input  name="company" value={company} onChange={handleOnChange} />
          </Container>
          <Container as="label">
            Address
            <Input name="address1" value={address1} onChange={handleOnChange} />
          </Container>
          <Container as="label">
            Apartment, suite, etc.
            <Input name="address2" value={address2} onChange={handleOnChange} />
          </Container>
          <Container as="label">
            City
            <Input name="city" value={city} onChange={handleOnChange} />
          </Container>
          <HStack>
            <Container as="label">
              Country/Region
              <Input name="country" value={country} onChange={handleOnChange} />
            </Container>
            <Container as="label">
              State
              <Input name="province" value={province} onChange={handleOnChange} />
            </Container>
            <Container as="label">
              ZIP code
              <Input name="zip" value={zip} onChange={handleOnChange} />
            </Container>
          </HStack>
          <Container as="label">
            Phone
            <Input name="phone" value={phone} onChange={handleOnChange} />
          </Container>
          {formErrors && (
            <Container>
              {formErrors.map((
                /** @type { BigCommerceApiError | CustomerUserError } */ { message },
                /** @type { number } */ index,
              ) => (
                <Text key={index} color="red.600">
                  {message}
                </Text>
              ))}
            </Container>
          )}
          <HStack justify="space-between" my="8">
            <Link href={ACCOUNT_URL}>
              Cancel
            </Link>
            <Button
              isDisabled={!submissionEnabled}
              isLoading={status === 'loading'}
              loadingText="Saving..."
              type="submit"
              width="48"
            >
              Save
            </Button>
          </HStack>
        </Grid>
      </AuthGuard>
    </Container>
  )
}

export default AccountAddress
