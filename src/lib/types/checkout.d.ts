export interface CheckoutProduct {
  id: string
  quantity: number
  title: string
  variant: {
    id: string
    image: {
      altText: string | null
      src: string
    }
    price: string
    product: {
      handle: string
    }
    title: string
  }
}
