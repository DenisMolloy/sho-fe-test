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
import { useRouter } from 'frontend-router'
import { useCart } from 'frontend-checkout'
import { BiCart, BiUser } from 'react-icons/bi'
import Link from 'Components/Link'
import Badge from 'Components/Badge'
import Container from 'Components/Container'
import Grid from 'Components/Grid'
import Logo from 'Components/Logo'
import Menu from 'Components/Menu'
import SearchPopover from 'Components/SearchPopover'
import Icon from 'Components/Icon'
import SearchQueryInput from 'Components/SearchQueryInput'
import { useCustomerState } from 'frontend-customer'
import IconButton from 'Components/IconButton'
import HStack from 'Components/HStack'

const CartIcon = () => <Icon display="block" as={BiCart} size="md" />

/**
 * @typedef { import("lib/types").Media } Media
 * @typedef { import("lib/types").Menu } MenuType
 * @typedef {{
 *  logoImage?: Media
 *  logoLink?: string
 *  menu?: MenuType
 *  sticky?: boolean
 * }} HeaderProps
 * @param { HeaderProps } props
 */
const Header = ({ logoImage, logoLink, menu, sticky }) => {
  const router = useRouter()
  const { isLoggedIn } = useCustomerState()
  const [{ items = [] }, { showCart }] = useCart()

  const itemsQuantity = items.reduce((acc, currentItem) => acc + currentItem.quantity, 0)

  const cartIconAriaLabel = !!itemsQuantity ? `Cart with ${itemsQuantity} items.` : 'Cart is empty.'

  const handleSearchSubmit = React.useCallback(query => router.push(`/search?q=${query}`), [router])

  const menuLinks = menu && menu.menuLinks

  return (
    <Grid
      as="header"
      position={sticky ? 'sticky' : 'initial'}
      top="0"
      templateAreas={{ base: "'menu logo cart'", md: "'logo menu cart'" }}
      templateColumns={{ base: '5rem 1fr 5rem', sm: '3rem 1fr 3rem', md: 'auto 1fr auto' }}
      alignItems="center"
      columnGap={{ base: 2, md: 10 }}
      px={{ base: 4, md: 8 }}
      py={4}
      bg="brand.100"
      zIndex="docked"
    >
      <Container gridArea="logo" justifySelf={{ base: 'center', md: 'left' }} w={['20', '32']}>
        <Logo image={logoImage} link={logoLink} />
      </Container>

      {menu ? (
        <Container gridArea="menu">
          <Menu
            content={
              <SearchQueryInput
                onClick={event => event.stopPropagation()}
                onKeyDown={event => event.stopPropagation()}
                onSearchSubmit={handleSearchSubmit}
              />
            }
            links={menuLinks}
          />
        </Container>
      ) : null}

      <HStack gridArea="cart" justifySelf="right" spacing="4">
        <Container display={{ base: 'none', md: 'block' }}>
          <SearchPopover onSearchSubmit={handleSearchSubmit} />
        </Container>

        <Link
          href={isLoggedIn ? '/account' : '/account/login'}
          title="Navigate to account"
          aria-label="Navigate to my account"
        >
          <IconButton
            variant="iconWrapper"
            aria-label="Navigate to my account"
            size={8}
            icon={<Icon display="block" as={BiUser} size="md" />}
          />
        </Link>

        <IconButton
          variant="iconWrapper"
          aria-live="assertive"
          aria-label={cartIconAriaLabel}
          onClick={showCart}
          size={8}
          icon={
            itemsQuantity ? (
              <Badge badgeContent={itemsQuantity} variant="cart">
                <CartIcon />
              </Badge>
            ) : (
              <CartIcon />
            )
          }
        />
      </HStack>
    </Grid>
  )
}

export default Header
