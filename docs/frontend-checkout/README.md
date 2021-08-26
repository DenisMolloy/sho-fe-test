# frontend-checkout hooks

Frontend checkout hooks that make it easy to fetch products, adding/removing products to cart and retrieving checkout url.

## Installing and importing

`frontend-checkout` is already preinstalled on every Shogun Frontend site. To use it, you only need to import hooks in a component.

```js
import { useCartState, useCartActions } from 'frontend-checkout'
```

## API reference

- `useCartState` hook - current state of user's cart.

```ts
const cart = useCartState()

// Cart
{
 id: string // ID of current cart.
 items: Items[] // Array of items currently in cart.
 inventory: {
   products: Record<productId, {
     availableForSale: boolean  // Indicates should you allow purchasing of a product, e.g. out of stock.
     quantity: number // The available quantity of a given product, if allowed on store.
     minOrder?: number // Minimum order constraint, adjustable in Shogun CMS - Product Content Group.
     maxOrder?: number // Maximum order constraint.
   }
   productVariants: Record<variantId, {
     availableForSale: boolean
     quantity: number
     minOrder?: number
     maxOrder?: number
   }
   status: 'loading' | 'loaded' | 'error' // Status of loading products from CMS
 }
 subtotalPrice: number // Total price of all items in cart, before shipping, taxes, and discounts.
 currencyCode: string // Cart currency code, e.g. "USD".
 isCartShown: boolean // Flag for managing should cart modal or drawer be visible.
 checkoutUrl: string // Url to redirect users when they press `Checkout` link/button.
}
```

- `useCartActions` hook - actions available for manipulating carts.

```ts
/**
 * Fetch single product by ID.
 * fetchProduct: (id: string) => Promise<Product>
 */
const { fetchProduct } = useCartActions()

// Shopify Storefront API (GraphQL)
const id = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' // product id or product handle can be used 'product-handle'

// Shopify AJAX API (REST)
const id = 'product-handle'

// BigCommerce STENCIL API doesn't support fetchProduct method
const product = await fetchProduct(id)

/**
 * Add items to cart.
 * addItems: (items: Item | Item[]) => Promise<Cart>
 */
const { addItems } = useCartActions()

/**
 * Item: {
 *  id: string | number
 *  quantity: number
 *  [key: string]?: any
 */

// Shopify Storefront API (GraphQL)
const item = {
  id: 'Z2lk1i8vc2hvcGlmeS7Qcm9kdWN0LzUwMAk2NjU4MTg3MjM=', // variant id, in Shogun Frontend CMS that is `product.variant.storefrontId`
  quantity: 1,
  // optionally, you can add any custom properities:
  // customAttributes: [{key: 'MyKey', value: 'MyValue'}]
}

// Shopify AJAX API (REST)
const item = {
  id: 7009655818753, // variant id, in Shogun Frontend CMS that is `product.variant.externalId`
  quantity: 1,
  // optionally, you can add any custom properties
  // properties: {key: 'value'}
}

// BigCommerce STENCIL API (REST)
const item = {
  id: 124810, // product id, in Shogun Frontend CMS that is `product.id`
  quantity: 1,
  // optionSelections required if a product has options
  optionSelections: [{ optionId: 11, optionValue: 117 }],
}

addItems(item) // to add multiple items `addItems([item, item2])`

/**
 * Update items in cart.
 * updateItems: (items: Item | Item[]) => Promise<Cart>
 */
const { updateItems } = useCartActions()

// Shopify Storefront API (GraphQL)
const { items } = useCartState()
const item = {
  id: items[0].id, // id of item in cart you want to update
  quantity: 2, // change quantity to 2
}

// Shopify AJAX API (REST)
const { items } = useCartState()
const item = {
  id: items[0].variant_id, // variant_id of item in cart you want to update.
  // Note, if you add 'variant_id' that is not in the cart then a new item will be added to cart.
  // If there are multiple items in cart with the same 'variant_id' only first will be updated.
  quantity: 2, // change quantity to 2 (quantity won't be adjusted to maximum items available in a stock)
}

// If there are multiple items in cart with same 'variant_id' and you need to update/change one that is not first, instead of 'id' you should provide 'line' property, which is 1-based index position of the item in the cart.
const item = {
  line: 2, // update second item in cart
  quantity: 2, // change quantity to 2 (quantity will be adjusted to maximum items in a stock)
}

// BigCommerce STENCIL API (REST)
const { items } = useCartState()
const item = {
  id: items[0].id, // id of item in cart you want to update
  lineItemId: items[0].lineItemId, // lineItemId of item in cart you want to update
  quantity: 2, // change quantity to 2
  // optionSelections required if a product has options
  optionSelections: items[0].optionSelections, // optionSelections can be also updated
}

updateItems(item) // to update multiple items `updateItems([item, item2])`

/**
 * Remove items from cart.
 * removeItems: (itemIds: string | string[]) => Promise<Cart>
 */
const { removeItems } = useCartActions()

// Shopify Storefront API (GraphQL)
const { items } = useCartState()
const itemId = items[0].id // remove first item in cart

// Shopify AJAX API (REST)
const { items } = useCartState()
const itemId = items[0].variant_id // remove first item in cart
// Note, if there are multiple items with the same 'variant_id', only first will be removed.

// BigCommerce STENCIL API (REST)
const { items } = useCartState()
const itemId = items[0].lineItemId // remove first item in cart

removeItems(itemId) // to remove multiple items `removeItems([item, item2])`

/**
 * Show cart.
 * showCart: () => void
 */
const { showCart } = useCartActions()
showCart() // 'isCartShown' will become true.

/**
 * Hide cart.
 * hideCart: () => void
 */
const { hideCart } = useCartActions()
hideCart() // 'isCartShown' will become false.

/**
 * ProductType describes the available product types.
 *
 * It is used when specifying where to search in the inventory (products or variants).
 *
 * In Shopify Product and ProductVariant are used but ProductVariant is used more frequently.
 *
 * In BigCommerce, only Product is used.
 *
 * Helpers that access the inventory will default to the ProductType that is most suitable for
 * the platform. (ProductVariant for Shopify and Product for BigCommerce)
 */
type ProductType = 'Product' | 'ProductVariant'

const defaultProductType = {
  shopify: 'ProductVariant',
  bigCommerce: 'Product',
}[platform]

/**
 * Get product is in inventory.
 * isProductInInventory: ({ id: ItemId, type: ProductType = defaultProductType }) => boolean
 */
const { isProductInInventory } = useCartActions()

// Shopify Storefront API (GraphQL)
const id = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' // storefrontId

// Shopify AJAX API (REST)
const id = 6690750136476 // externalId

// BigCommerce STENCIL API
const product = 124810

const isInInventory = isProductInInventory({ id })

/**
 * Get item is available for sale from inventory.
 * isProductAvailableForSale: ({ id: ItemId, type: ProductType = defaultProductType  }) => boolean
 */
const { isProductAvailableForSale } = useCartActions()

// Shopify Storefront API (GraphQL)
const id = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' // storefrontId

// Shopify AJAX API (REST)
const id = 6690750136476 // externalId

// BigCommerce STENCIL API
const product = 124810

const isItemAvailableForSale = isProductAvailableForSale({ id })

/**
 * Get item quantity from inventory.
 * getProductQuantity: ({ id: ItemId, type: ProductType = defaultProductType }) => number
 */
const { getProductQuantity } = useCartActions()

// Shopify Storefront API (GraphQL)
const id = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' // storefrontId

// Shopify AJAX API (REST)
const id = 6690750136476 // externalId

// BigCommerce STENCIL API
const product = 124810

const quantity = getProductQuantity({ id })

/**
 * Get item min order from inventory.
 * getProductMinOrder: ({ id: ItemId, type: ProductType = defaultProductType }) => number | undefined
 */
const { getProductMinOrder } = useCartActions()

// Shopify Storefront API (GraphQL)
const id = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' // storefrontId

// Shopify AJAX API (REST)
const id = 6690750136476 // externalId

// BigCommerce STENCIL API
const product = 124810

const itemMinOrder = getProductMinOrder({ id })

/**
 * Get item max order from inventory.
 * getProductMaxOrder: ({ id: ItemId, type: ProductType = defaultProductType }) => number | undefined
 */
const { getProductMaxOrder } = useCartActions()

// Shopify Storefront API (GraphQL)
const id = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' // storefrontId

// Shopify AJAX API (REST)
const id = 6690750136476 // externalId

// BigCommerce STENCIL API doesn't support fetchProduct method
const product = 124810

const itemMaxOrder = getProductMaxOrder({ id })
```

## Examples

a) Creating add to cart button component.

```js
import React from 'react'
import { useCartState, useCartActions } from 'frontend-checkout'
import LoadingSpinner from 'Components/LoadingSpinner'

import './styles.css'

// Button states
const IDLE = 'idle'
const LOADING = 'loading'
const SOLD_OUT = 'sold out'
const ERROR = 'error'

// Error message duration
const THREE_SECONDS = 3 * 1000

const AddToCart = ({ id, children }) => {
  const [buttonState, setButtonState] = React.useState(IDLE)

  const { inventory } = useCartState()
  const { addItems, isProductAvailableForSale } = useCartActions()

  React.useEffect(
    function setSoldOutStateIfItemIsNotAvailable() {
      if (inventory.status === LOADING || inventory.status === ERROR) return

      const availableForSale = isProductAvailableForSale({
        id: variantId,
        type: 'ProductVariant',
      })

      if (!availableForSale) setButtonState(SOLD_OUT)
    },
    [inventory.status],
  )

  function clearError() {
    setButtonState(IDLE)
  }

  async function handleAddItemToCart() {
    setButtonState(LOADING)
    try {
      await addItems({ id, quantity: 1 })
      setButtonState(IDLE)
    } catch (e) {
      setButtonState(ERROR)
      setTimeout(clearError, THREE_SECONDS) // Remove error message after 3 seconds.
    }
  }

  if (buttonState === LOADING)
    return (
      <button className="AddToCart">
        <LoadingSpinner />
      </button>
    )

  if (buttonState === SOLD_OUT)
    return (
      <button className="AddToCart AddToCart--sold" disabled>
        Sold out
      </button>
    )

  if (buttonState === ERROR)
    return (
      <button className="AddToCart" onClick={clearError}>
        Adding failed
      </button>
    )

  return (
    <button className="AddToCart" onClick={handleAddItemToCart}>
      {children}
    </button>
  )
}

export default AddToCart
```

b) Creating checkout link/button component

```js
import React from 'react'
import { useCartState } from 'frontend-checkout'

import './styles.css'

const CheckoutLink = ({ children }) => {
  const { checkoutUrl } = useCartState()

  return (
    <a className="CheckoutLink" href={checkoutUrl}>
      {children}
    </a>
  )
}

export default CheckoutLink
```

c) Creating component for changing item quantity

```js
import React from 'react'
import { useCartActions } from 'frontend-checkout'

import './styles.css'

const IDLE = 'idle'
const LOADING = 'loading'

const ItemQuantity = ({ id, initialQuantity = 0 }) => {
  const [inputStatus, setInputStatus] = React.useState(IDLE)
  const { updateItems, removeItems } = useCartActions()

  async function handleItemQuantityChange(requestedQtyChange) {
    const newQuantity = quantity + requestedQtyChange

    if (newQuantity === quantity) return

    setInputStatus(LOADING)
    try {
      if (newQuantity === 0) {
        await removeItems(id)
      } else {
        await updateItems({ id, quantity: newQuantity })
        setInputStatus(IDLE)
      }
    } catch (e) {
      setInputValue(quantity)
      setInputStatus(IDLE)
      // Show error message
    }
  }

  return (
    <React.Fragment>
      <button
        className="ItemQuantityInput-btn--minus"
        disabled={inputStatus === LOADING}
        onClick={() => handleItemQuantityChange(-1)}
      >
        Reduce item quantity by one
      </button>
      <label htmlFor="itemQty">Item quantity</label>
      <input
        id="itemQty"
        className="ItemQuantityInput-input"
        type="number"
        min={0}
        disabled={inputStatus === LOADING}
        onBlur={(e) =>
          handleItemQuantityChange(
            Number(e.target.value) - quantity /* difference between new and current quantity */,
          )
        }
      />
      <button
        className="ItemQuantityInput-btn--plus"
        disabled={inputStatus === LOADING}
        onClick={() => handleItemQuantityChange(1)}
      >
        Increase item quantity by one
      </button>
    </React.Fragment>
  )
}

export default ItemQuantity
```

d) Changing variant in cart

```js
// Components/CartPage
import React from 'react'
import { useCartState } from 'frontend-checkout'

import './styles.css'

const CartPage = () => {
  const { items } = useCartState()

  return (
    <CartContainer>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </CartContainer>
  )
}

export default CartPage

// Components/CartItem
import React, { useEffect, useState } from 'react'
import { useCartActions } from 'frontend-checkout'

import './styles.css'

const CartItem = ({ item }) => {
  const { fetchProduct } = useCartActions()
  const [variants, setVariants] = useState([])

  // Shopify Storefront API (GraphQL)
  const productId = item.variant.product.id // product id must be used in GraphQL API (Variant and CheckoutLineItem id will not work)

  // Shopify AJAX API (REST)
  const productId = item.handle // product handle must be used in REST API

  useEffect(
    async function getProductVariants() {
      const product = await fetchProduct(productId)

      if (product == null) return

      const { variants } = product

      setVariants(variants)
    },
    [productId, fetchProduct, setVariants],
  )

  return (
    <CartItemContainer>
      <CartItemTitle item={item} />
      <ItemQuantity item={item} />
      <VariantsDropdown itemId={item.id} quantity={item.quantity} variants={variants} />
    </CartItemContainer>
  )
}

export default CartItem

// Components/VariantsDropdown
import React, { useEffect, useState } from 'react'
import { useCartActions } from 'frontend-checkout'

import './styles.css'

const VariantsDropdown = ({ itemId, quantity, variants }) => {
  const { addItems, removeItems } = useCartActions()

  async function handleVariantChange(variant) {
    // we can't update existing item in cart
    // we need to remove and then add new variant
    await removeItems(itemId)

    await addItems({ id: variant.id, quantity })
  }

  return (
    <VariantsDropdownContainer>
      {variants.map((variant) => (
        <VariantsDropdownItem variant={variant} onSelect={handleVariantChange} />
      ))}
    </VariantsDropdownContainer>
  )
}

export default VariantsDropdown
```
