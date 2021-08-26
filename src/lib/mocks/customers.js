export const customers = {
  // Customer with 2 orders
  'john@example.com': {
    customer: {
      acceptsMarketing: false,
      addresses: {
        edges: [
          {
            node: {
              address1: '4546 Woodland Avenue',
              address2: '',
              city: 'New Orleans',
              company: 'My Company',
              country: 'United States',
              firstName: 'John',
              id: 'Z2f2lkj432vc2hvcGlaeS9DdXN0h21eci81MTIzrjA5NTU5',
              lastName: 'Doe',
              phone: '+1-985-707-1109',
              province: 'Louisiana',
              zip: '70032',
            },
          },
          {
            node: {
              address1: '13407 Southwest Amu Street #U8251',
              address2: '',
              city: 'Tualatin',
              company: '',
              country: 'United States',
              firstName: 'John',
              id: 'Z2lkOi8vc2hvcGlmeMDk1P21vZGVsX25hbWU9QWRkcmVzcw',
              lastName: 'Doe',
              phone: null,
              province: 'Oregon',
              zip: '235256',
            },
          },
        ],
        pageInfo: { hasNextPage: false, hasPreviousPage: false },
      },
      createdAt: '2021-02-28T13:46:28Z',
      defaultAddress: {
        address1: '4546 Woodland Avenue',
        address2: '',
        city: 'New Orleans',
        company: 'My Company',
        country: 'United States',
        firstName: 'John',
        id: 'Z2f2lkj432vc2hvcGlaeS9DdXN0h21eci81MTIzrjA5NTU5',
        lastName: 'Doe',
        phone: '+1-985-707-1109',
        province: 'Louisiana',
        zip: '70032',
      },
      displayName: 'John Doe',
      email: 'john@example.com',
      firstName: 'John',
      id: 'Z2lkO52vc2hvcGlaeS9DdXN0h21eci81MTIzrjA5NTU5MTAz',
      lastName: 'Doe',
      orders: {
        edges: [
          // Order #1 with 1 item
          {
            node: {
              cancelReason: null,
              canceledAt: null,
              currencyCode: 'USD',
              currentSubtotalPrice: { amount: '7.99', currencyCode: 'USD' },
              currentTotalPrice: { amount: '12.94', currencyCode: 'USD' },
              currentTotalTax: { amount: '0.0', currencyCode: 'USD' },
              customerLocale: 'en',
              customerUrl: 'https://example.com/account/orders/74ecba71353453458293543d70d7cc84c',
              discountApplications: { edges: [] },
              edited: false,
              email: 'john@example.com',
              financialStatus: 'PAID',
              fulfillmentStatus: 'FULFILLED',
              id: 'Z2lkOi8vc2sdfzE5P2tleT00MTc5ODkyODRjYTQzYTlhNTc2NTA4MTJjNWFjMzkxOQ==',
              lineItems: {
                edges: [
                  {
                    node: {
                      currentQuantity: 1,
                      customAttributes: [],
                      discountAllocations: [],
                      discountedTotalPrice: { amount: '7.99', currencyCode: 'USD' },
                      originalTotalPrice: { amount: '7.99', currencyCode: 'USD' },
                      quantity: 1,
                      title: 'The Feed aLOKSAK',
                      variant: {
                        availableForSale: true,
                        currentlyNotInStock: false,
                        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjYzOTIyOTg4NjUyNw==',
                        image: {
                          altText: 'The Feed aLOKSAK-4x7-The Feed',
                          height: 924,
                          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTQ5MzcyMTA1ODUxNTE=',
                          originalSrc:
                            'https://cdn.shopify.com/s/files/1/1515/2714/products/the-feed-gear-4x7-the-feed-aloksak-14937191546943.jpg?v=1597859495',
                          transformedSrc:
                            'https://cdn.shopify.com/s/files/1/1515/2714/products/the-feed-gear-4x7-the-feed-aloksak-14937191546943.jpg?v=1597859495',
                          width: 916,
                        },
                        priceV2: { amount: '7.99', currencyCode: 'USD' },
                        product: {
                          descriptionHtml:
                            '<meta charset="utf-8">\n<div class="fusion-text">\n<p><span>Are you like us when you work out and always struggling to find the perfect bag to protect your phone and personal items from the elements?  Well look no further as these custom bags are just what you need!  And yes....you can finally stop wasting those sandwich zip lock bags.  Keep those for your kids!</span></p>\n<p><span>We\'re a huge fan of this brand and "aLOKSAK is the only re-sealable, flexible storage bag offering protection from all the elements. The patented, light-weight storage system prevents air, humidity, water, dust and sand from harming your valuables. aLOKSAK can also ensure your treasures are safe from the passage of time.</span><br><span>MILITARY GRADE: These bags are used for safe element proof transport and storage by outdoor enthusiasts, all branches of the U.S. and Foreign Military, and by many governmental and law enforcement agencies worldwide!"</span></p>\n<p><span>Here are the great features of this amazing bag</span></p>\n<meta charset="utf-8">\n<ul>\n<li>Hermetic Seal – An Absolute Airtight Seal Preventing the Re-entry or Release of Air and Micro-Organisms</li>\n<li>Made in the USA</li>\n<li>Holds Five Patents</li>\n<li>4X7 Size - Fits almost all popular smart phone models<br>\n</li>\n<li>Protects Against Microscopic Particles like Dust and Sand</li>\n<li>Recyclable and Reusable</li>\n<li>All Touch Screen Electronics Work 100% While Protected in the aLOKSAK</li>\n<li>Make and Receive Phone Calls While Phone is Protected in aLOKSAK</li>\n</ul>\n</div>',
                          handle: 'the-feed-lok-sak',
                          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ2NzEzNDM4NTM2MzE=',
                          title: 'The Feed aLOKSAK',
                        },
                        requiresShipping: true,
                        selectedOptions: [{ name: 'Size', value: '4x7' }],
                        sku: 'tf_aloksak',
                        title: '4x7',
                        unitPriceMeasurement: {
                          measuredType: null,
                          quantityUnit: null,
                          quantityValue: 0,
                          referenceUnit: null,
                          referenceValue: 0,
                        },
                        weight: 1,
                        weightUnit: 'GRAMS',
                      },
                    },
                  },
                ],
              },
              name: '#291888',
              orderNumber: 291888,
              originalTotalPrice: { amount: '12.94', currencyCode: 'USD' },
              phone: null,
              processedAt: '2021-05-21T14:16:41Z',
              shippingAddress: {
                address1: '13407 Southwest Amu Street #U8251',
                address2: '',
                city: 'Tualatin',
                company: null,
                country: 'United States',
                firstName: 'John',
                id: 'Z2lkOi8vc2hvcGlmeMDk1P21vZGVsX25hbWU9QWRkcmVzcw==',
                lastName: 'Doe',
                phone: '',
                province: 'Oregon',
                zip: '235256',
              },
              shippingDiscountAllocations: [],
              statusUrl:
                'https://example.com/15152714/orders/74ecba718cbf1d70d7cc84c/authenticate?key=417989284',
              subtotalPriceV2: { amount: '7.99', currencyCode: 'USD' },
              successfulFulfillments: [
                {
                  trackingCompany: 'USPS',
                  trackingInfo: [
                    {
                      number: '3252525314623623642346623463246',
                      url: 'https://tools.usps.com/go/TrackConfirmAction.action?tLabels=3252525314623623642346623463246',
                    },
                  ],
                },
              ],
              totalPriceV2: { amount: '12.94', currencyCode: 'USD' },
              totalRefundedV2: { amount: '0.0', currencyCode: 'USD' },
              totalShippingPriceV2: { amount: '4.95', currencyCode: 'USD' },
              totalTaxV2: { amount: '0.0', currencyCode: 'USD' },
            },
          },

          // Order #2 with 3 items
          {
            node: {
              cancelReason: null,
              canceledAt: null,
              currencyCode: 'USD',
              currentSubtotalPrice: { amount: '645.00', currencyCode: 'USD' },
              currentTotalPrice: { amount: '745.00', currencyCode: 'USD' },
              currentTotalTax: { amount: '0.0', currencyCode: 'USD' },
              customerLocale: 'en',
              customerUrl:
                'https://example.com/account/orders/74ecba71353453346346293543d70d7cc84c',
              discountApplications: { edges: [] },
              edited: false,
              email: 'john@example.com',
              financialStatus: 'PAID',
              fulfillmentStatus: 'FULFILLED',
              id: 'Z2lkOi8vc2sdfzE5P2tleT00MTc5ODkyODRjYTQzYTsedgNTc2NTA4MTJjNWFjMzkxOQ==',
              lineItems: {
                edges: [
                  {
                    node: {
                      currentQuantity: 1,
                      customAttributes: [],
                      discountAllocations: [],
                      discountedTotalPrice: { amount: '165.00', currencyCode: 'USD' },
                      originalTotalPrice: { amount: '199.00', currencyCode: 'USD' },
                      quantity: 1,
                      title: '700C Aerospoke - Lime Green Front',
                      variant: {
                        availableForSale: true,
                        currentlyNotInStock: false,
                        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTM0NTUwMTIwODc0NA==',
                        image: {
                          altText: null,
                          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMjgwODk0NjAwNjQ0MjQ=',
                          width: 2048,
                          height: 1365,
                          originalSrc:
                            'https://cdn.shopify.com/s/files/1/0551/9343/6328/products/img-700c-limewb-250x250.gif?v=1615251069',
                          transformedSrc:
                            'https://cdn.shopify.com/s/files/1/0551/9343/6328/products/img-700c-limewb-250x250.gif?v=1615251069',
                        },
                        priceV2: { amount: '199.0', currencyCode: 'USD' },
                        product: {
                          descriptionHtml:
                            '<p>Whether you are a Velodrome Racer or a Fixie Rider, Aerospoke wheels are essential gear for your ride. Aerospoke is proud of the many world records set on our wheels, many of which came on the Velodrome. The aerodynamic performance and rollability of Aerospoke&nbsp;wheels is proven. The stiffness of Aerospoke&nbsp;wheels means less energy loss due to wheel flex or deformation. Aerospoke&nbsp;wheels are rugged and that means less time truing spokes and more time riding the streets. Aerospoke&nbsp;five spoke wing design provides a canvas to be creative with our wheels as well - and we offer a wide variety of colors to do just that.</p>',
                          handle: '700c-aerospoke',
                          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY1NjgxODE3OTI5MzY=',
                          title: '700C Aerospoke - Lime Green Front',
                        },
                        requiresShipping: true,
                        selectedOptions: [
                          { name: 'Wheel-Type', value: 'Front' },
                          { name: 'Color', value: 'Lime Green' },
                        ],
                        sku: 'Aerospoke - Lime Green Front',
                        title: 'Front / Lime Green',
                        unitPriceMeasurement: {
                          measuredType: null,
                          quantityUnit: null,
                          quantityValue: 0,
                          referenceUnit: null,
                          referenceValue: 0,
                        },
                        weight: 13.9994,
                        weightUnit: 'GRAMS',
                      },
                    },
                  },
                  {
                    node: {
                      currentQuantity: 1,
                      customAttributes: [],
                      discountAllocations: [],
                      discountedTotalPrice: { amount: '120.00', currencyCode: 'USD' },
                      originalTotalPrice: { amount: '120.00', currencyCode: 'USD' },
                      quantity: 10,
                      title: 'Ding Dong Bell',
                      variant: {
                        availableForSale: true,
                        currentlyNotInStock: false,
                        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTM0NTU4MTQ5MDM0NA==',
                        image: {
                          altText: null,
                          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMjgwODk1NjM0MTQ2OTY=',
                          width: 2048,
                          height: 1365,
                          originalSrc:
                            'https://cdn.shopify.com/s/files/1/0551/9343/6328/products/CITY-BELL_PASTEL_RED_FRONT_WEB.jpg?v=1615251594',
                          transformedSrc:
                            'https://cdn.shopify.com/s/files/1/0551/9343/6328/products/CITY-BELL_PASTEL_RED_FRONT_WEB.jpg?v=1615251594',
                        },
                        priceV2: { amount: '12.0', currencyCode: 'USD' },
                        product: {
                          descriptionHtml: `<p>Never shout "On your left!" again! Let the pleasant peal of the Ding Dong bell announce your presence. Perfect for herding pedestrians on the multi-use path, ringing "hello" to a friend, or letting your neighborhood know just how much you enjoy riding, every bike deserves a voice and none sounds more 'bikey' than, "Ding Dong!"</p>
                            <div class="textile">
                            <h3>Specs</h3>
                            <ul>
                            <li>“Ding Dong” – the bell</li>
                            <li>Fits Pure City, Pure Fix, and any 22.2mm handlebars</li>
                            <li>Tolls for thee</li>
                            </ul>
                            </div>`,
                          handle: 'ding-dong-bell',
                          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY1NjgyMDAxNDMwMTY=',
                          title: 'Bell - Ding Dong - Red',
                        },
                        requiresShipping: true,
                        selectedOptions: [{ name: 'Color', value: 'Red' }],
                        sku: 'Bell - Ding Dong - Red',
                        title: 'Red',
                        unitPriceMeasurement: {
                          measuredType: null,
                          quantityUnit: null,
                          quantityValue: 0,
                          referenceUnit: null,
                          referenceValue: 0,
                        },
                        weight: 1.0009,
                        weightUnit: 'LB',
                      },
                    },
                  },
                  {
                    node: {
                      currentQuantity: 1,
                      customAttributes: [],
                      discountAllocations: [],
                      discountedTotalPrice: { amount: '360.00', currencyCode: 'USD' },
                      originalTotalPrice: { amount: '360.00', currencyCode: 'USD' },
                      quantity: 3,
                      title: 'DZR Mamba',
                      variant: {
                        availableForSale: true,
                        currentlyNotInStock: false,
                        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTM0NTU4NzI1NzUxMg==',
                        image: {
                          altText: null,
                          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMjgwODk1NjgzNjI2NjQ=',
                          width: 2048,
                          height: 1365,
                          originalSrc:
                            'https://cdn.shopify.com/s/files/1/0551/9343/6328/products/DZR_MAMBA_PAIR_FRONT_WEB.jpg?v=1615251629',
                          transformedSrc:
                            'https://cdn.shopify.com/s/files/1/0551/9343/6328/products/DZR_MAMBA_PAIR_FRONT_WEB.jpg?v=1615251629',
                        },
                        priceV2: { amount: '120.0', currencyCode: 'USD' },
                        product: {
                          descriptionHtml: `<p>When you need to mash your pedals but can’t afford to clash with your jeans, the DZR Mambas have you covered! Durable, thanks to rugged PU coated suede, comfortable, thanks to asymmetrical ankle padding, and built to perform with DZR’s Co-Molded powerplate – this is a daily-ride shoe that’s always ready for action.</p>
                            <div class="textile">
                            <h3>Specs</h3>
                            <ul>
                            <li>Co-Molded Powerplate for performance</li>
                            <li>Link traction outsole for grip</li>
                            <li>Adjustable power strap for fit and performance</li>
                            <li>Reflective heel badge for visibility</li>
                            <li>Stability upper for fit and comfort</li>
                            <li>Two-hole cleat compatible</li>
                            </ul>
                            </div>`,
                          handle: 'dzr-mamba',
                          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY1NjgyMDEwNjA1MjA=',
                          title: 'DZR Mamba - 42',
                        },
                        requiresShipping: true,
                        selectedOptions: [{ name: 'Size', value: '42' }],
                        sku: 'Shoes - DZR - Mamba Black - 42',
                        title: '42',
                        unitPriceMeasurement: {
                          measuredType: null,
                          quantityUnit: null,
                          quantityValue: 0,
                          referenceUnit: null,
                          referenceValue: 0,
                        },
                        weight: 1.0996,
                        weightUnit: 'LB',
                      },
                    },
                  },
                ],
              },
              name: '#356363',
              orderNumber: 356363,
              originalTotalPrice: { amount: '779.00', currencyCode: 'USD' },
              phone: null,
              processedAt: '2021-05-21T14:16:41Z',
              shippingAddress: {
                address1: '13407 Southwest Amu Street #U8251',
                address2: '',
                city: 'Tualatin',
                company: null,
                country: 'United States',
                firstName: 'John',
                id: 'Z2lkOi8vc2hvcGlmeMDk1P21vZGVsX25hbWU9QWRkcmVzcw==',
                lastName: 'Doe',
                phone: '',
                province: 'Oregon',
                zip: '235256',
              },
              shippingDiscountAllocations: [],
              statusUrl:
                'https://example.com/15152714/orders/74ecba718cbf1d70d7cc84c/authenticate?key=417989284',
              subtotalPriceV2: { amount: '645', currencyCode: 'USD' },
              successfulFulfillments: [
                {
                  trackingCompany: 'USPS',
                  trackingInfo: [
                    {
                      number: '3252525314623623642346623463246',
                      url: 'https://tools.usps.com/go/TrackConfirmAction.action?tLabels=3252525314623623642346623463246',
                    },
                  ],
                },
              ],
              totalPriceV2: { amount: '745.00', currencyCode: 'USD' },
              totalRefundedV2: { amount: '0.0', currencyCode: 'USD' },
              totalShippingPriceV2: { amount: '100.00', currencyCode: 'USD' },
              totalTaxV2: { amount: '0.0', currencyCode: 'USD' },
            },
          },
        ],
        pageInfo: { hasNextPage: false, hasPreviousPage: false },
      },
      phone: null,
      status: 'loaded',
      tags: ['LEAD', 'LOST Customer', 'More than 90 days since last order'],
      updatedAt: '2021-05-01T18:36:51Z',
    },
  },

  // Customer with long fields with 0 orders
  'remington.wolfeschlegelsteinhausenbergerdorff@very-long-example.com': {
    customer: {
      id: 'Z2f2lkj432vc2hvcGlaeS9DdXN0h21eci81MTIzrjA5NTU5MTAz',
      email: 'remington.wolfeschlegelsteinhausenbergerdorff@very-long-example.com',
      firstName: 'Remington',
      lastName: 'Wolfeschlegelsteinhausenbergerdorff',
      displayName: 'Remington Wolfeschlegelsteinhausenbergerdorff',
      defaultAddress: null,
      phone: null,
      acceptsMarketing: false,
      tags: ['LEAD', 'LOST Customer', 'More than 90 days since last order'],
      status: 'loaded',
      createdAt: '2021-04-28T16:46:28Z',
      updatedAt: '2021-04-29T11:06:01Z',
    },
  },
}
