import { BigCommerceCategory, ShopifyCollection } from '../types'
import { bigCommerceProducts, shopifyProducts } from '.'

export const shopifyCollection: ShopifyCollection = {
  name: 'Bikes',
  slug: 'bikes',
  description: 'This is a demonstration store. - Bikes',
  descriptionHtml: '<p><b>This is a demonstration store.</b> - Bikes</p>',
  image: {
    height: 800,
    mimeType: 'image/jpeg',
    name: 'Bicycle_Bike_Old_Retro_Road_Vintage-16200_1.jpg',
    size: 127669,
    src: 'https://f.shgcdn.com/d1262818-7c21-4c31-b738-24ce9414ec5c/',
    storageID: 'd1262818-7c21-4c31-b738-24ce9414ec5c',
    width: 1200,
    _type: 'image',
  },
  products: shopifyProducts,
}

export const bigCommerceCategory: BigCommerceCategory = {
  name: 'Kitchen',
  url: '/kitchen/',
  description: '<p><b>This is a demonstration store.</b></p>',
  image: {
    alt: 'modern_kitchen_gnangarra__99414',
    name: 'modern_kitchen_gnangarra__99414.jpg',
    size: 7240528,
    _type: 'image',
    width: 4493,
    height: 2931,
    mimeType: 'image/jpeg',
    src: 'https://f.shgcdn.com/d1fcd13c-ac8c-4bd4-ae98-5cbc99b6c368/',
  },
  products: bigCommerceProducts,
}
