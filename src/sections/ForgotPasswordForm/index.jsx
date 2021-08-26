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
import { useCustomerActions } from 'frontend-customer'
import Container from 'Components/Container'
import Flex from 'Components/Flex'
import Input from 'Components/Input'
import Button from 'Components/Button'
import Link from 'Components/Link'
import Text from 'Components/Text'
import Heading from 'Components/Heading'
import AuthGuard from 'Components/AuthGuard'

const SUCCESS_MESSAGE_TITLE = 'Check your inbox!'
const SUCCESS_MESSAGE_DESCRIPTION =
  "We've just sent you an email - follow the reset instructions to change your password."
const LOGIN_PAGE_TEXT = 'Go back to login'
const LOGIN_PAGE_URL = '/account/login'

/**
 * @typedef {{
 *  successMessageTitle: string
 *  successMessageDescription: string
 *  loginPageText: string
 *  loginPageUrl: string
 * }} ForgotPasswordFormProps
 *
 * @param {ForgotPasswordFormProps} props
 */
const ForgotPasswordForm = ({
  successMessageTitle,
  successMessageDescription,
  loginPageText,
  loginPageUrl,
}) => {
  const [inputValue, setInputValue] = React.useState('')
  const [submitSuccess, setSubmitSuccess] = React.useState(false)
  /**
   * @typedef { import("frontend-customer/dist/customer-sdk/platforms/big_commerce/rest/types/api").BigCommerceApiError } BigCommerceApiError
   * @typedef { import("frontend-customer/dist/customer-sdk/platforms/shopify/storefront-api/types/api").CustomerUserError } CustomerUserError
   * @typedef { ( BigCommerceApiError[] | CustomerUserError[] | null | undefined ) } FrontendErrors
   * @type { [FrontendErrors, React.Dispatch<React.SetStateAction<FrontendErrors>> ] }
   */
  const [submitErrors, setSubmitErrors] = React.useState()
  const [submitInProgress, setSubmitInProgress] = React.useState(false)
  const { recoverPassword } = useCustomerActions()
  const mounted = React.useRef(false)

  React.useEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  }, [])

  /** @type { React.FormEventHandler<HTMLDivElement> } */
  const handleSubmit = async event => {
    event.preventDefault()

    setSubmitErrors(null)
    setSubmitInProgress(true)

    const { errors } = await recoverPassword(inputValue)

    if (!mounted.current) return

    if (errors) {
      setSubmitInProgress(false)
      setSubmitErrors(errors)
      console.error('Something went wrong', errors)

      return
    }

    setSubmitSuccess(true)
  }

  const disableLoginButton = !inputValue || submitInProgress

  return (
    <Container as="section" mx="auto" maxW="lg" p={6}>
      {submitSuccess ? (
        <>
          <Heading as="h1" mb={5}>
            {successMessageTitle || SUCCESS_MESSAGE_TITLE}
          </Heading>
          <Text>{successMessageDescription || SUCCESS_MESSAGE_DESCRIPTION}</Text>
        </>
      ) : (
        <Container>
          <Heading as="h1" mb={5}>
            Forgot password
          </Heading>

          <AuthGuard allowedAuthStatus="unauthenticated" redirectUrl="/account">
            <Text mb={5}>Enter your email and we will send you a password reset link.</Text>
            <Container as="form" onSubmit={handleSubmit}>
              <Container as="label" display="block" mb={5}>
                Email
                <Input
                  placeholder="email@example.com"
                  type="email"
                  value={inputValue}
                  onChange={(/** @type { React.ChangeEvent<HTMLInputElement> } */ event) =>
                    setInputValue(event.target.value)
                  }
                  isInvalid={Array.isArray(submitErrors) && submitErrors.length > 0}
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
                  isLoading={submitInProgress}
                  loadingText="Sending"
                  type="submit"
                  width={{ base: '100%', md: 48 }}
                  maxWidth="100%"
                  mb={{ base: 5, md: 0 }}
                  disabled={disableLoginButton}
                >
                  Send
                </Button>
                <Link href={loginPageUrl || LOGIN_PAGE_URL}>
                  {loginPageText || LOGIN_PAGE_TEXT}
                </Link>
              </Flex>
              {submitErrors && (
                <Container mb={5}>
                  {submitErrors.map((
                    /** @type { BigCommerceApiError | CustomerUserError } */ error,
                    /** @type {number} */ index,
                  ) => (
                    <Text as="strong" key={`error-message-${index}`} color="red.600">
                      {error.message}
                    </Text>
                  ))}
                </Container>
              )}
            </Container>
          </AuthGuard>
        </Container>
      )}
    </Container>
  )
}

export default ForgotPasswordForm
