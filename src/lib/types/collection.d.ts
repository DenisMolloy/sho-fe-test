import { BigCommerceProduct, Media, ShopifyProduct } from '.'

export type CmsCollection = ShopifyCollection | BigCommerceCategory

export interface Collection {
  name: string
  slug: string
  description: string
  products: ShopifyProduct[] | BigCommerceProduct[]
  image: CollectionImage | undefined
}

export interface ShopifyCollection {
  name: string
  slug: string
  description: string
  descriptionHtml: string
  products: ShopifyProduct[]
  image?: ShopifyCollectionImage
}

export interface BigCommerceCategory {
  name: string
  url: string
  description: string
  products: BigCommerceProduct[]
  image?: BigCommerceCategoryImage
}

export interface CollectionImage extends Media {
  _type: string
  mimeType: string
}

export interface BigCommerceCategoryImage extends CollectionImage {
  size: number
}

export interface ShopifyCollectionImage extends BigCommerceCategoryImage {
  storageID: string
}
