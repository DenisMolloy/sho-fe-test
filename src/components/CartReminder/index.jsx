import React from 'react'
import { useCartState } from 'frontend-checkout'
import Link from 'frontend-link'
import Container from 'Components/Container'
import Text from 'Components/Text'
// import './styles.css'

const CartReminder = () => {
  const cart = useCartState()
  const itemsInCart = cart.items.reduce((acc, currentItem) => acc + currentItem.quantity, 0)

  return (
    <Container
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      bgColor="black"
      color="white"
      width={{
        lg: '65%',
        md: '90%',
        base: '100%',
      }}
      margin="auto"
      mb={10}
      p={4}
      boxShadow="dark-lg"
      textAlign="center"
    >
      {itemsInCart === 0 ? (
        <React.Fragment>
          <Text>You don't have any items in your cart. Once you're inspired,</Text>
          <Link href="/">
            <Text color="green.200" textDecoration="underline" _hover={{ color: 'green.100' }}>
              Lets go shopping!
            </Text>
          </Link>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Text>
            You have <span style={{ fontWeight: 'bold' }}>{itemsInCart}</span> item
            {itemsInCart > 1 ? 's' : ''} in your cart.
          </Text>
          <Link href="/cart">
            <Text color="green.200" textDecoration="underline" _hover={{ color: 'green.100' }}>
              Would you like to checkout?
            </Text>
          </Link>
        </React.Fragment>
      )}
    </Container>
  )
}
export default CartReminder
