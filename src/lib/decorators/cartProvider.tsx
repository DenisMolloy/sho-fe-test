import * as React from 'react'
import { ArgsStoryFn, StoryContext } from '@storybook/addons'
import { CartProvider, useCart } from 'frontend-checkout'
import { StoreConfig, SupportedPlatform } from 'frontend-checkout/dist/types'
import { cartItems as mockedCartItems } from '../mocks'

const platform = (process.env.PLATFORM || 'shopify') as SupportedPlatform

const storeConfig = {
  storeId: process.env.SITE_ID || '',
  storeName: process.env.STORE_NAME || '',
  storeDomain: process.env.PLATFORM_PUBLIC_DOMAIN || '',
  platformApiType: process.env.PLATFORM_API_TYPE || 'graphql',
  storeToken: process.env.STORE_TOKEN || '',
} as StoreConfig

export type DecoratorFunction<StoryFnReturnType = unknown> = (
  fn: ArgsStoryFn<StoryFnReturnType>,
  c: StoryContext,
) => ReturnType<ArgsStoryFn<StoryFnReturnType>>

interface CartItemsDecoratorProps {
  cartId: string
  cartItemIndexes: CartItemIndex[]
  children: React.ReactNode
}

interface MockCartProviderProps {
  cartId: string
  platform: SupportedPlatform
  storeConfig: StoreConfig
  children: React.ReactNode
}

export type CartItemIndex = 0 | 1 | 2 | 3 | 4 | 5
export type CartItemQuantity = CartItemIndex | 6
export type CartItems = CartItemIndex[] | CartItemQuantity

/**
 * Object with promise chain for each unique cart. Promise chain is used to perform all operations on a specific cart's items in a strict order (one after another). This is achieved by allways appending next cart operation to the end of the promises chain.
 */
const cartOperationPromises: {
  [cartId: string]: Promise<any> | undefined
} = {}

function appendCartOperation(cartId: string, operation: () => Promise<any>) {
  let promise = cartOperationPromises[cartId]

  if (promise === undefined) {
    promise = Promise.resolve()
  }

  cartOperationPromises[cartId] = promise.then(operation)
}

function CartProviderDecorator(props: MockCartProviderProps) {
  const { cartId, platform, storeConfig, children } = props

  return (
    <CartProvider
      platform={platform}
      storeConfig={{ ...storeConfig, storeId: `${storeConfig.storeId}-${cartId}` }}
    >
      {children}
    </CartProvider>
  )
}

function CartItemsDecorator(props: CartItemsDecoratorProps) {
  const { cartId, cartItemIndexes, children } = props
  const [{ items, inventory }, { addItems, removeItems }] = useCart()
  const { status: inventoryStatus } = inventory
  const mounted = React.useRef(false)

  React.useEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  }, [])

  React.useEffect(() => {
    if (inventoryStatus !== 'loaded') return

    const itemsToAdd = cartItemIndexes.map(i => mockedCartItems[i])

    appendCartOperation(cartId, () => addItems(itemsToAdd))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryStatus, cartId, cartItemIndexes])

  React.useEffect(() => {
    return () => {
      if (mounted.current || items.length === 0) return

      const itemIdsToDelete = items.map(item => item.id)

      appendCartOperation(cartId, () => removeItems(itemIdsToDelete))
    }
  })

  return <React.Fragment>{children}</React.Fragment>
}

/**
 * Returns cart decorator
 *
 * @param cartItems - Number of cart items to add OR an array with cart item indexes to add specific items
 * @returns A Storybook story wrapped with CartProvider and with cart items added to cart
 */
export const getCartDecorator =
  (cartItems: CartItems): DecoratorFunction<JSX.Element> =>
  StoryFn => {
    const cartItemIndexes = Array.isArray(cartItems)
      ? cartItems
      : (Object.keys(mockedCartItems).map(Number).slice(0, cartItems) as CartItemIndex[])

    cartItemIndexes.sort((a, b) => a - b)

    const cartId = cartItemIndexes.length > 0 ? cartItemIndexes.join(':') : 'empty'

    return (
      <CartProviderDecorator platform={platform} storeConfig={storeConfig} cartId={cartId}>
        <CartItemsDecorator cartId={cartId} cartItemIndexes={cartItemIndexes}>
          <StoryFn />
        </CartItemsDecorator>
      </CartProviderDecorator>
    )
  }
