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
import AuthGuard from 'Components/AuthGuard'
import { useIsMounted } from 'Components/Hooks'

const RegisterForm = () => {
  const [disabled, setDisabled] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  /**
   * @typedef { import("frontend-customer/dist/customer-sdk/platforms/big_commerce/rest/types/api").BigCommerceApiError } BigCommerceApiError
   * @typedef { import("frontend-customer/dist/customer-sdk/platforms/shopify/storefront-api/types/api").CustomerUserError } CustomerUserError
   * @typedef { ( BigCommerceApiError[] | CustomerUserError[] | null | undefined ) } FrontendErrors
   * @type { [FrontendErrors, React.Dispatch<React.SetStateAction<FrontendErrors>> ] }
   */
  const [registerErrors, setRegisterErrors] = React.useState()
  const [registerData, setRegisterData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const { register } = useCustomerActions()
  const router = useRouter()
  const isMounted = useIsMounted()

  React.useEffect(() => {
    setDisabled(registerData.email === '' || registerData.password === '')
  }, [registerData.email, registerData.password])

  /** @type { React.FormEventHandler<HTMLDivElement> } */
  const handleSubmit = async event => {
    event.preventDefault()

    setRegisterErrors(null)
    setIsLoading(true)

    const { errors } = await register(registerData)

    if (!isMounted.current) return

    setIsLoading(false)

    if (errors) {
      setRegisterErrors(errors)

      return
    }

    router.push('/account/login')
  }

  return (
    <Container as="section" mx="auto" maxWidth="lg" p={6}>
      <Heading as="h1" mb={6}>
        Register
      </Heading>

      <AuthGuard allowedAuthStatus="unauthenticated" redirectUrl="/account">
        <Grid as="form" onSubmit={handleSubmit} rowGap={5}>
          <Container as="label">
            First name{' '}
            <Container as="span" color="gray.400" fontSizes="xs">
              (optional)
            </Container>
            <Input
              value={registerData.firstName}
              onChange={(/** @type { React.ChangeEvent<HTMLInputElement> } */ event) =>
                setRegisterData(currentData => ({
                  ...currentData,
                  firstName: event.target.value,
                }))
              }
            />
          </Container>
          <Container as="label">
            Last name{' '}
            <Container as="span" color="gray.400" fontSizes="xs">
              (optional)
            </Container>
            <Input
              value={registerData.lastName}
              onChange={(/** @type { React.ChangeEvent<HTMLInputElement> } */ event) =>
                setRegisterData(currentData => ({
                  ...currentData,
                  lastName: event.target.value,
                }))
              }
            />
          </Container>
          <Container as="label">
            Email
            <Input
              placeholder="email@example.com"
              type="email"
              value={registerData.email}
              onChange={(/** @type { React.ChangeEvent<HTMLInputElement> } */ event) =>
                setRegisterData(currentData => ({
                  ...currentData,
                  email: event.target.value,
                }))
              }
              isInvalid={Array.isArray(registerErrors) && registerErrors.length > 0}
              isRequired
            />
          </Container>
          <Container as="label">
            Password
            <Input
              placeholder="Enter your password"
              type="password"
              value={registerData.password}
              onChange={(/** @type { React.ChangeEvent<HTMLInputElement> } */ event) =>
                setRegisterData(currentData => ({
                  ...currentData,
                  password: event.target.value,
                }))
              }
              isInvalid={Array.isArray(registerErrors) && registerErrors.length > 0}
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
              Register
            </Button>
          </Container>
          {registerErrors && (
            <Container>
              {registerErrors.map(
                (
                  /** @type { BigCommerceApiError | CustomerUserError } */ { message },
                  /** @type {number} */ index,
                ) => (
                  <Text key={`error-message-${index}`} color="red.600">
                    {message}
                  </Text>
                ),
              )}
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
      </AuthGuard>
    </Container>
  )
}

export default RegisterForm
