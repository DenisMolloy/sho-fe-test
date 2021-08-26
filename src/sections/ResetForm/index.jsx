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
import { useCustomerActions } from 'frontend-customer'
import { useRouter } from 'frontend-router'
import Button from 'Components/Button'
import Container from 'Components/Container'
import Divider from 'Components/Divider'
import Grid from 'Components/Grid'
import Heading from 'Components/Heading'
import Input from 'Components/Input'
import Link from 'Components/Link'
import Text from 'Components/Text'
import { useIsMounted } from 'Components/Hooks'

const ResetForm = () => {
  const [disabled, setDisabled] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  /**
   * @typedef { import("frontend-customer/dist/customer-sdk/platforms/big_commerce/rest/types/api").BigCommerceApiError } BigCommerceApiError
   * @typedef { import("frontend-customer/dist/customer-sdk/platforms/shopify/storefront-api/types/api").CustomerUserError } CustomerUserError
   * @typedef { ( BigCommerceApiError[] | CustomerUserError[] | null | undefined ) } FrontendErrors
   * @type { [FrontendErrors, React.Dispatch<React.SetStateAction<FrontendErrors>> ] }
   */
  const [formErrors, setFormErrors] = React.useState()
  const [formData, setFormData] = React.useState({
    password: '',
    confirmPassword: '',
  })
  const { resetPassword } = useCustomerActions()
  const router = useRouter()
  const isMounted = useIsMounted()

  React.useEffect(() => {
    setDisabled(formData.password === '' || formData.confirmPassword === '')
  }, [formData])

  /**
   * @param {React.KeyboardEvent<HTMLDivElement>} event
   */
  const handleSubmit = async event => {
    event.preventDefault()

    setFormErrors(null)
    setIsLoading(true)

    const { errors } = await resetPassword({
      resetUrl: window.location.href,
      password: formData.password,
    })

    if (!isMounted.current) return

    setIsLoading(false)

    if (errors) {
      setFormErrors(errors)

      return
    }

    router.push('/account/login')
  }

  return (
    <Container as="section" mx="auto" maxWidth="lg" p={6}>
      <Heading as="h1" mb={6}>
        Reset password
      </Heading>
      <Grid as="form" onSubmit={handleSubmit} rowGap={5}>
        <Container as="label">
          New password
          <Input
            placeholder="******"
            type="password"
            onChange={(/** @type { React.ChangeEvent<HTMLInputElement> } */ event) =>
              setFormData(previousData => ({
                ...previousData,
                password: event.target.value,
              }))
            }
            isInvalid={Boolean(formErrors)}
            isRequired
          />
        </Container>
        <Container as="label">
          Confirm new password
          <Input
            placeholder="******"
            type="password"
            onChange={(/** @type { React.ChangeEvent<HTMLInputElement> } */ event) =>
              setFormData(previousData => ({
                ...previousData,
                confirmPassword: event.target.value,
              }))
            }
            isInvalid={Boolean(formErrors)}
            isRequired
          />
        </Container>
        <Container>
          <Button
            disabled={disabled}
            isLoading={isLoading}
            loadingText="Submitting"
            type="submit"
            width={{ base: '100%', md: 48 }}
          >
            Reset
          </Button>
        </Container>
        {formErrors && (
          <Container>
            {formErrors.map((
              /** @type { BigCommerceApiError | CustomerUserError } */ { message },
              /** @type {number} */ index,
            ) => (
              <Text key={`error-message-${index}`} color="red.600">
                {message}
              </Text>
            ))}
          </Container>
        )}
        <Divider />
        <Text>
          Already have an account?{' '}
          <Link href="/account/login" color="black" ml="2" textDecoration="underline">
            Login
          </Link>
        </Text>
      </Grid>
    </Container>
  )
}

export default ResetForm
