import React, { useState, useEffect } from 'react'
import Head from 'frontend-head'
import { useCartActions } from 'frontend-checkout'
import { useIsMounted, useNormalizedProduct } from 'Components/Hooks'
import { useRouter } from 'frontend-router'

const HOST_URL = 'https://shogun-starter-kit-mvp.frontend.getshogun.com'

/**
 * @typedef { import("lib/types").CmsProduct } CmsProduct
 * @typedef { import("lib/types").ProductVariant } ProductVariant
 * @typedef {{
 *  product: CmsProduct
 * }} ProductStructuredDataProps
 * @param { ProductStructuredDataProps } props
 */
const ProductStructuredData = ({ product: cmsProduct }) => {
  const router = useRouter()
  const isMounted = useIsMounted()

  const product = useNormalizedProduct(cmsProduct)

  const { isProductAvailableForSale } = useCartActions()
  const [availableForSale, setAvailableForSale] = useState(true)

  useEffect(() => {
    if (!product || !product.variants || !product.variants.length) return

    const [variant] = product.variants

    async function setIsProductAvailableForSale() {
      const available = await isProductAvailableForSale({ id: variant.storefrontId })

      if (!isMounted.current) return

      setAvailableForSale(available)
    }

    setIsProductAvailableForSale()
  }, [product, isProductAvailableForSale, isMounted])

  if (!product) return null

  const { name, thumbnail, variants, description, externalId } = product
  const variant = variants && variants.length > 0 ? variants[0] : undefined

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: thumbnail ? thumbnail.src : undefined,
    sku: variant ? variant.sku : undefined,
    mpn: externalId,
    brand: {
      '@type': 'Organization',
      name: 'Shogun Starter Kit',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: variant ? variant.price : undefined,
      availability: availableForSale ? 'InStock' : 'OutOfStock',
      url: `${HOST_URL}${router.pathname}`,
      seller: {
        '@type': 'Organization',
        name: 'Shogun Starter Kit',
      },
    },
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Head>
  )
}

export default ProductStructuredData
