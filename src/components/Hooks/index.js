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
import {
  isBigCommerceCategory,
  isBigCommerceProduct,
  isNormalizedProduct,
  isShopifyCollection,
  isShopifyProduct,
} from 'Components/Utils'

export function useIsMounted() {
  const isMounted = React.useRef(false)

  React.useLayoutEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return isMounted
}

export function useIsFirstRender() {
  const isFirstRender = React.useRef(true)

  React.useEffect(() => {
    setTimeout(() => {
      isFirstRender.current = false
    }, 0)
  }, [])

  return isFirstRender
}

/**
 * @typedef { import("lib/types").Product } Product
 * @typedef { import("lib/types").CmsProduct } CmsProduct
 *
 * @param { CmsProduct | Product | null | undefined } product
 */
export function useNormalizedProduct(product) {
  return React.useMemo(() => {
    if (!product) return null

    if (isNormalizedProduct(product)) return product

    if (isShopifyProduct(product)) {
      /** @type { Product } */
      const normalizedProduct = {
        externalId: product.externalId,
        name: product.name,
        slug: `/${product.slug}/`,
        description: product.descriptionHtml || product.description,
        media: product.media.map(({ _id, details }) => ({ id: _id, ...details })),
        variants: product.variants.map(({ storefrontId, name, price, sku }) => ({
          storefrontId,
          name,
          price,
          sku,
        })),
        thumbnail: product.thumbnail,
        searchResult: product._highlightResult
          ? {
              name: product._highlightResult.name,
              description: product._highlightResult.description,
            }
          : undefined,
        _shogunNormalized: true,
      }

      return normalizedProduct
    }

    if (isBigCommerceProduct(product)) {
      /** @type { Product } */
      const normalizedProduct = {
        externalId: product.id,
        name: product.name,
        slug: product.url,
        description: product.description,
        media: product.images.map(({ _id, media }) => ({
          id: _id,
          ...media,
        })),
        variants: product.variants.map(({ _id, price, sku }) => ({
          storefrontId: _id,
          name: sku,
          price,
          sku,
        })),
        searchResult: product._highlightResult
          ? {
              name: product._highlightResult.name,
              description: product._highlightResult.description,
            }
          : undefined,
        _shogunNormalized: true,
      }

      return normalizedProduct
    }

    throw new Error('Unknown Product type. Only Shopify and BigCommerce platforms are supported')
  }, [product])
}

/**
 * @typedef { import("lib/types").CmsCollection } CmsCollection
 * @typedef { import("lib/types").Collection } Collection
 *
 * @param { CmsCollection | null | undefined } cmsCollection
 * @returns { Collection | null }
 */
export function useNormalizedCollection(cmsCollection) {
  if (!cmsCollection) return null

  /** @type { Collection } */
  const normalizedCollection = {
    name: '',
    slug: '',
    description: '',
    image: undefined,
    products: [],
  }

  if (isShopifyCollection(cmsCollection)) {
    return {
      ...normalizedCollection,
      name: cmsCollection.name,
      slug: cmsCollection.slug,
      description: cmsCollection.descriptionHtml || cmsCollection.description,
      image: cmsCollection.image,
      products: cmsCollection.products,
    }
  }

  if (isBigCommerceCategory(cmsCollection)) {
    return {
      ...normalizedCollection,
      name: cmsCollection.name,
      slug: `/${cmsCollection.url}/`,
      description: cmsCollection.description,
      image: cmsCollection.image,
      products: cmsCollection.products,
    }
  }

  throw new Error(
    'Unknown Collection/Category type. Only Shopify and BigCommerce platforms are supported',
  )
}

export default () => null
