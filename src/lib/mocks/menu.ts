import { Menu } from '../types'

export const menu: Menu = {
  menuLinks: [
    {
      subMenuLinks: [
        {
          label: 'Bikes',
          slug: '/collections/bikes',
        },
        {
          label: 'Clothing',
          slug: '/collections/clothing',
        },
        {
          label: 'Tools',
          slug: '/collections/tools',
        },
        {
          label: 'Parts & Accessories',
          slug: '/collections/parts-accessories',
        },
      ],
      label: 'Shop',
      slug: 'shop',
    },
    {
      subMenuLinks: [
        {
          label: 'Trek',
          slug: '/brands/trek',
        },
        {
          label: 'Norco',
          slug: '/brands/norco',
        },
        {
          label: 'Schwinn',
          slug: '/brands/schwinn',
        },
        {
          label: 'Cannondale',
          slug: '/brands/cannondale',
        },
      ],
      label: 'Brands',
      slug: 'brands',
    },
    {
      label: 'About',
      slug: '/about',
    },
    {
      label: 'Contact',
      slug: '/contact',
    },
  ],
  name: 'Header',
}
