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
import { useIsMounted } from 'Components/Hooks'
import Container from 'Components/Container'
import Divider from 'Components/Divider'
import Flex from 'Components/Flex'
import Input from 'Components/Input'
import Button from 'Components/Button'
import Link from 'Components/Link'
import Text from 'Components/Text'

const EMAIL_LABEL = 'Email'
const PASSWORD_LABEL = 'Password'
const LOGIN_BUTTON_TEXT = 'Login'
const FORGOT_PASSWORD = 'Forgot password?'
const NO_ACCOUNT_TEXT = "Don't have an account?"
const REGISTER_LINK_TEXT = 'Register'
const REDIRECT_TO = '/account'

/**
 * @typedef {{
 *  emailLabel: string
 *  passwordLabel: string
 *  loginButtonText: string
 *  forgotPasswordText: string
 *  noAccountText: string
 *  registerLinkText: string
 *  redirectTo: string
 * }} LoginFormProps
 *
 * @param {LoginFormProps} props
 */
const LoginForm = ({
  emailLabel,
  passwordLabel,
  loginButtonText,
  forgotPasswordText,
  noAccountText,
  registerLinkText,
  redirectTo,
}) => {
  /**
   * @typedef { import("frontend-customer/dist/customer-sdk/platforms/big_commerce/rest/types/api").BigCommerceApiError } BigCommerceApiError
   * @typedef { import("frontend-customer/dist/customer-sdk/platforms/shopify/storefront-api/types/api").CustomerUserError } CustomerUserError
   * @typedef { ( BigCommerceApiError[] | CustomerUserError[] | null | undefined ) } FrontendErrors
   * @type { [FrontendErrors, React.Dispatch<React.SetStateAction<FrontendErrors>> ] }
   */
  const [loginErrors, setLoginErrors] = React.useState()
  const [loginFields, setLoginFields] = React.useState({ email: '', password: '' })
  const [loginInProgress, setLoginInProgress] = React.useState(false)

  const { login } = useCustomerActions()
  const router = useRouter()
  const isMounted = useIsMounted()

  /** @type { { checkout_url?: string } } */
  const { checkout_url: queryCheckoutUrl } = router.query

  /** @type { React.FormEventHandler<HTMLDivElement> } */
  const handleSubmit = async event => {
    event.preventDefault()

    setLoginErrors(null)
    setLoginInProgress(true)

    const { errors } = await login(loginFields)

    if (errors) {
      if (!isMounted.current) return

      setLoginInProgress(false)
      setLoginErrors(errors)

      // eslint-disable-next-line no-console
      console.error('Something went wrong', errors)

      return
    }

    router.push(queryCheckoutUrl || redirectTo || REDIRECT_TO)
  }

  const disableLoginButton =
    loginFields.email === '' || loginFields.password === '' || loginInProgress

  return (
    <Container as="form" onSubmit={handleSubmit}>
      <Container as="label" display="block" mb={5}>
        {emailLabel || EMAIL_LABEL}
        <Input
          placeholder="email@example.com"
          type="email"
          value={loginFields.email}
          onChange={(/** @type { React.ChangeEvent<HTMLInputElement> } */ event) =>
            setLoginFields(prevLoginFields => ({ ...prevLoginFields, email: event.target.value }))
          }
          isInvalid={Array.isArray(loginErrors) && loginErrors.length > 0}
          isRequired
        />
      </Container>

      <Container as="label" display="block" mb={5}>
        {passwordLabel || PASSWORD_LABEL}
        <Input
          placeholder="Enter your password"
          type="password"
          value={loginFields.password}
          onChange={(/** @type { React.ChangeEvent<HTMLInputElement> } */ event) =>
            setLoginFields(prevLoginFields => ({
              ...prevLoginFields,
              password: event.target.value,
            }))
          }
          isInvalid={Array.isArray(loginErrors) && loginErrors.length > 0}
          isRequired
        />
      </Container>

      <Flex
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems={{ md: 'center' }}
        justifyContent="space-between"
        mb={5}
      >
        <Button
          isLoading={loginInProgress}
          loadingText="Submitting"
          type="submit"
          width={{ base: '100%', md: 48 }}
          maxWidth="100%"
          mb={{ base: 5, md: 0 }}
          disabled={disableLoginButton}
        >
          {loginButtonText || LOGIN_BUTTON_TEXT}
        </Button>
        <Link href="/account/recover-password">{forgotPasswordText || FORGOT_PASSWORD}</Link>
      </Flex>

      {loginErrors && (
        <Container mb={5}>
          {loginErrors.map(
            (
              /** @type { BigCommerceApiError | CustomerUserError } */ error,
              /** @type {number} */ index,
            ) => (
              <Text as="strong" key={`error-message-${index}`} color="red.600">
                {error.message}
              </Text>
            ),
          )}
        </Container>
      )}

      <Divider mb={5} />

      <Text>
        {noAccountText || NO_ACCOUNT_TEXT}{' '}
        <Link href="/account/register">{registerLinkText || REGISTER_LINK_TEXT}</Link>
      </Text>
    </Container>
  )
}

export default LoginForm
