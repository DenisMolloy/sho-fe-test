/* eslint-disable no-console */
import * as React from 'react'
import { useCustomerActions } from 'frontend-customer'
import { useIsMounted } from 'Components/Hooks'

interface CustomerDecoratorProps {
  email?: string
  children: React.ReactNode
}

function CustomerDecorator(props: CustomerDecoratorProps) {
  const { email, children } = props

  const isMounted = useIsMounted()
  const [isReady, setIsReady] = React.useState(false)
  const { login, getCustomer, logout } = useCustomerActions()

  React.useEffect(() => {
    const loginUser = async (email: string) => {
      const credentials = { email, password: 'whatever' }

      const result = await login(credentials)

      if ('errors' in result) {
        const { errors } = result

        console.groupCollapsed('CustomerDecorator failed :(')

        if (errors) {
          errors.forEach(error => console.error(error.message, { credentials, error }))
        } else {
          console.error(`Got login result errors of type ${typeof result.errors} and value =`, {
            credentials,
            errors: result.errors,
          })
        }

        console.groupEnd()
      }

      if (isMounted.current) {
        setIsReady(true)
      }
    }

    const fetchUser = async () => {
      await getCustomer()

      if (isMounted.current) {
        setIsReady(true)
      }
    }

    if (email) {
      loginUser(email)
    } else {
      fetchUser()
    }

    return () => {
      logout()
    }
  }, [email, isMounted, login, getCustomer, logout])

  if (!isReady) {
    return null
  }

  return <React.Fragment>{children}</React.Fragment>
}

/**
 * Returns customer decorator
 *
 */
export const getCustomerDecorator = (email?: string) => (StoryFn: any) =>
  (
    <CustomerDecorator email={email}>
      <StoryFn />
    </CustomerDecorator>
  )
