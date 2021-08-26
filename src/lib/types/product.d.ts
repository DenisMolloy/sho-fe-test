import { Media } from '.'

export type CmsProduct = ShopifyProduct | BigCommerceProduct

/** Shogun product (normalized data) */
export interface Product {
  externalId?: number
  slug: string
  name: string
  description: string
  media: ProductMediaItem[]
  thumbnail?: ProductThumbnail
  variants: ProductVariant[]
  searchResult?: HighlightResult<Product>
  _shogunNormalized: true
}

export interface ProductMediaItem extends Media {
  id: string
  name: string
}

export interface ProductThumbnail extends Media {
  mimeType: string
  size: number
}

export interface ProductVariant {
  storefrontId: string
  name: string
  price: number
  sku?: string
}

/** Shopify product */
export interface ShopifyProduct {
  externalId?: number
  name: string
  slug: string
  description: string
  descriptionHtml: string
  media: ShopifyMediaItem[]
  thumbnail?: ShopifyThumbnail
  variants: ShopifyVariant[]
  _highlightResult?: HighlightResult<ShopifyProduct>
}

export interface ShopifyMediaItem {
  _id: string
  details: Media
}

export interface ShopifyThumbnail extends Media {
  _type: string
  mimeType: string
  storageID: string
  size: number
}

export interface ShopifyVariant {
  _id: string
  storefrontId: string
  name: string
  price: number
  sku?: string
}

/** BigCommerce product */
export interface BigCommerceProduct {
  id: number
  _id: string
  name: string
  url: string
  description: string
  images: BigCommerceImage[]
  variants: BigCommerceVariant[]
  _highlightResult?: HighlightResult<BigCommerceProduct>
}

export interface BigCommerceImage {
  _id: string
  id: number
  media: Media
}

export interface BigCommerceVariant {
  _id: string
  id: number
  price: number
  sku: string
}

/** Search */
export type HighlightResult<T extends Record<string, any>> = {
  [key in keyof Omit<T, '_highlightResult'>]?: {
    fullyHighlighted: boolean
    matchLevel: 'none' | 'partial' | 'full'
    matchedWords: string[]
    value: string
  }
}
