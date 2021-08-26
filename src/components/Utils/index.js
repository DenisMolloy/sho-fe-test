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

/**
 * @template T
 * @param {T | 'undefined'} [value]
 * @param {T} [defaultValue]
 * @returns {T | undefined}
 */
export function normalizePropValue(value, defaultValue) {
  return value === undefined || value === 'undefined' ? defaultValue : value
}

/**
 * @param {string} str
 * @param {RegExp} regexp
 * @returns {string[]}
 */
export function getMatchesFromString(str, regexp) {
  /** @type {string[]} */
  const results = []

  let result = regexp.exec(str)

  while (result) {
    results.push(result[1])
    result = regexp.exec(str)
  }

  return results
}

/**
 * @param {React.ReactNode[]} parts
 * @param {string} placeholder
 * @param {React.ReactNode} replacement
 * @returns {React.ReactNode[]}
 */
export function getArrayNodesReplaced(parts, placeholder, replacement) {
  /**
   * @param {React.ReactNode[]} accumulator
   * @param {React.ReactNode} currentValue
   * @param {number} currentIndex
   * @param {React.ReactNode[]} array
   * @returns {React.ReactNode[]}
   */
  const reducer = (accumulator, currentValue, currentIndex, array) => {
    accumulator.push(currentValue)

    if (currentIndex < array.length - 1) {
      accumulator = accumulator.concat(replacement)
    }

    return accumulator
  }

  /** @type {React.ReactNode[]} */
  let newResult = []

  for (const part of parts) {
    if (typeof part === 'string') {
      const subparts = part.split(placeholder).reduce(reducer, [])

      newResult = newResult.concat(subparts)
    } else {
      newResult = newResult.concat(part)
    }
  }

  return newResult
}

/**
 * @typedef {{
 *  money: string | number
 *  locales?: string | string[]
 *  options?: Intl.NumberFormatOptions
 * }} Payload
 *
 * @param {Payload} payload
 * @returns {string}
 */
export function formatMoney({ money, locales, options }) {
  if (typeof money === 'string') {
    money = Number(money)
  }

  const formatter = new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: 'USD',
    ...options,
  })

  return formatter.format(money)
}

/**
 * @typedef {{
 *  date: Date | string
 *  display?: 'datetime' | 'date' | 'time'
 *  locales?: string | string[]
 *  options?: Intl.DateTimeFormatOptions
 * }} FormatDatePayload
 *
 * @param {FormatDatePayload} payload
 * @returns {string}
 */
export function formatDate({ date, display = 'datetime', locales, options }) {
  if (typeof date === 'string') {
    date = new Date(date)
  }

  switch (display) {
    case 'date':
      return date.toLocaleDateString(locales, options)

    case 'time':
      return date.toLocaleTimeString(locales, options)

    default:
      return date.toLocaleString(locales, options)
  }
}

/**
 * Type guards ⤋⤋⤋
 *
 * @typedef { import("frontend-customer/dist/customer-sdk/platforms/big_commerce/rest/types/sdk").BigCommerceSdkCustomerProps } BigCommerceSdkCustomerProps
 * @typedef { import("frontend-customer/dist/customer-sdk/platforms/shopify/storefront-api/types/sdk").ShopifyCustomerProps } ShopifyCustomerProps
 * @typedef { import("frontend-customer/dist/customer-sdk/types").Customer<BigCommerceSdkCustomerProps> } BigCommerceCustomer
 * @typedef { import("frontend-customer/dist/customer-sdk/types").Customer<ShopifyCustomerProps> } ShopifyCustomer
 *
 * @param { BigCommerceCustomer | ShopifyCustomer } customerState
 * @return { customerState is ShopifyCustomer }
 */
export function isShopifyAccount(customerState) {
  return customerState && customerState.hasOwnProperty('defaultAddress')
}

/**
 * @typedef { import("frontend-customer/dist/customer-sdk/platforms/shopify/storefront-api/types/sdk").ShopifySdkAddress } ShopifySdkAddress
 *
 * @param { ShopifyCustomer['addresses'] | BigCommerceCustomer['addresses'] } addresses
 * @return { addresses is ShopifySdkAddress[] }
 */
export function isShopifyAccountAddress(addresses) {
  return (
    addresses === null ||
    (Array.isArray(addresses) && !addresses.length) ||
    (Array.isArray(addresses) && addresses[0].hasOwnProperty('zip'))
  )
}

/**
 * @typedef { import("lib/types").CmsProduct } cmsProduct
 * @typedef { import("lib/types").ShopifyProduct } ShopifyProduct
 * @typedef { import("lib/types").BigCommerceProduct } BigCommerceProduct
 * @typedef { import("lib/types").Product } Product
 *
 * @param { cmsProduct | Product } product
 * @returns { product is Product }
 */
export function isNormalizedProduct(product) {
  return product && product.hasOwnProperty('_shogunNormalized')
}

/**
 * @param { cmsProduct | Product } product
 * @returns { product is ShopifyProduct }
 */
export function isShopifyProduct(product) {
  return product && product.hasOwnProperty('slug')
}

/**
 * @param { cmsProduct | Product } product
 * @returns { product is BigCommerceProduct }
 */
export function isBigCommerceProduct(product) {
  return product && product.hasOwnProperty('url')
}

/**
 * @param { import("lib/types").CmsCollection } collection
 * @returns { collection is import("lib/types").ShopifyCollection }
 */
export function isShopifyCollection(collection) {
  return collection && collection.hasOwnProperty('slug')
}

/**
 * @param { import("lib/types").CmsCollection } category
 * @returns { category is import("lib/types").BigCommerceCategory }
 */
export function isBigCommerceCategory(category) {
  return category && category.hasOwnProperty('url')
}

export default () => null
