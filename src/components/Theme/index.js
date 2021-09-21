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
import { extendTheme, theme as defaultTheme } from '@chakra-ui/react'

const colors = {
  black: '#000000',
  white: '#FFFFFF',
  green: '#8dc641',
  gray: {
    900: '#444444',
    800: '#666666',
    700: '#888888',
    500: '#BBBBBB',
    300: '#DDDDDD',
    200: '#EEEEEE',
    100: '#F9F9F9',
  },
  red: {
    600: '#D01B11',
  },
}

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: colors.gray['900'],
      },
      'label, input': {
        mt: 2,
      },
    },
  },

  colors: {
    ...colors,
    brand: {
      100: colors.gray['100'],
      200: colors.gray['300'],
    },
  },

  fontSizes: {
    sm: '0.875rem', // 14px
    md: '1rem', // 16px
    lg: '1.25rem', // 20px
    xl: '1.75rem', // 28px
    '2xl': '2rem', // 32px
  },

  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  components: {
    Pagination: {
      parts: ['List', 'LeftListItem', 'RightListItem', 'ListItem', 'IconButton'],
      baseStyle: {
        List: {
          display: 'flex',
          flexWrap: 'wrap',
          maxW: 'full',
          alignItems: 'center',
        },
        LeftListItem: {
          mr: 4,
        },
        RightListItem: {
          ml: 4,
        },
        ListItem: {
          mx: { base: 0.5, md: 1 },
        },
        IconButton: {
          height: defaultTheme.sizes[8],
          width: defaultTheme.sizes[12],
          rounded: 'none',
          m: 0,
          p: 0,
          _hover: { background: 'none' },
          _active: { background: 'none' },
        },
      },
    },
    Button: {
      // Styles for the base style
      baseStyle: {},
      // Styles for the size variants
      sizes: {
        sm: {
          fontSize: 'sm',
        },
        md: {
          fontSize: 'md',
          padding: 4,
          height: '3.125rem', // 50px
        },
        lg: {
          fontSize: 'lg',
        },
        8: {
          height: defaultTheme.sizes[8],
          minWidth: defaultTheme.sizes[8],
        },
      },
      // Styles for the visual style variants
      variants: {
        primary: {
          bg: 'black',
          backgroundColor: 'black',
          color: 'white',
          padding: 4,
          borderRadius: 0,
          fontWeight: 500,
          _hover: {
            bg: 'brand.gray.900',
            backgroundColor: 'brand.200',
            color: 'black',
          },
          _disabled: {
            borderColor: 'brand.200',
            borderStyle: 'solid',
            borderWidth: '1px',
            backgroundColor: 'initial',
            color: 'black',
          },
        },
        secondary: {
          bg: 'white',
          backgroundColor: 'white',
          borderColor: 'brand.200',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderRadius: 0,
          color: 'brand.gray.900',
          padding: 4,
          fontWeight: 500,
          _hover: {
            bg: 'brand.gray.900',
            backgroundColor: 'brand.200',
          },
        },

        icon: {
          bg: 'none',
          color: 'gray.600',
          lineHeight: 'inherit',
          m: 2,
          p: 0,
          _hover: { color: 'black' },
          _disabled: { color: 'gray.600' },
        },

        iconWrapper: {
          rounded: 'none',
          m: 0,
          p: 0,
          _hover: { background: 'none' },
          _active: { background: 'none' },
        },
      },
      // The default `size` or `variant` values
      defaultProps: {},
    },

    Link: {
      baseStyle: ({ variant }) => {
        return variant && ['primary', 'secondary', 'outline'].includes(variant)
          ? {
              border: '1px solid',
              display: 'inline-block',
              fontSize: 'inherit',
              lineHeight: '1.2',
              outline: 'none',
              padding: '1rem',
              textAlign: 'center',
              transition: 'background 250ms',
              userSelect: 'none',
              borderColor: colors.gray['200'],
            }
          : {
              fontSize: 'inherit',
              lineHeight: '1.2',
            }
      },
      sizes: {
        sm: {
          fontSize: 'sm',
        },
        md: {
          fontSize: 'md',
        },
        lg: {
          fontSize: 'lg',
        },
        8: {
          height: defaultTheme.sizes[8],
          minWidth: defaultTheme.sizes[8],
        },
      },
      variants: {
        primary: {
          backgroundColor: colors.black,
          color: colors.white,
          _hover: { backgroundColor: colors.gray['300'], color: colors.black },
        },
        secondary: {
          backgroundColor: colors.white,
          borderColor: colors.gray['300'],
          color: colors.gray['800'],
          _hover: { backgroundColor: colors.gray['300'] },
        },
        outline: {
          borderRadius: '.375rem',
          _hover: { backgroundColor: colors.gray['100'] },
        },
        iconWrapper: {
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          rounded: 'none',
          m: 0,
          p: 0,
          _hover: { background: 'none' },
          _active: { background: 'none' },
        },
      },
      defaultProps: {},
    },

    Menu: {
      parts: ['contentItem', 'parentItem', 'mobileSubmenuItem'],
      baseStyle: props => {
        const { item: defaultItem } = defaultTheme.components.Menu.baseStyle(props)

        return {
          button: {
            p: 1,
            outline: 'initial',
            _focus: {
              boxShadow: defaultTheme.shadows.outline,
            },
          },
          item: {
            _focus: {
              background: 'gray.200',
              boxShadow: 'none',
              textDecoration: 'underline',
            },
          },
          contentItem: {
            px: 12,
            py: 3,
          },
          parentItem: {
            ...defaultItem,
          },
          mobileSubmenuItem: {
            ...defaultItem,
            pl: 6,
            fontSize: 'sm',
            color: 'gray.600',
            _focus: {
              ...defaultItem._focus,
              boxShadow: 'none',
              textDecoration: 'underline',
            },
          },
        }
      },
    },

    ShogunContainer: {
      // Styles for the base style
      baseStyle: {},
      // Styles for the size variations
      sizes: {},
      // Styles for the visual style variations
      variants: {
        solid: {
          bg: 'brand.100',
          padding: 5,
        },
        outline: {
          borderColor: 'brand.200',
          borderWidth: '1px',
          bg: 'brand.100',
          padding: 5,
        },
        'section-wrapper': {
          minW: 'xs',
          mx: 'auto',
          maxW: '7xl',
          p: 6,
        },
      },
      // The default `size` or `variant` values
      defaultProps: {},
    },

    SearchQueryInput: {
      parts: ['inputGroup', 'input', 'inputRightElement', 'iconButton'],
      baseStyle: {
        inputGroup: {
          maxWidth: 'md',
        },
        input: {
          mt: 0,
        },
        iconButton: {
          height: '80%',
          width: '80%',
        },
      },
      sizes: {
        sm: {
          input: {
            paddingRight: 10,
          },
          inputRightElement: {
            width: 10,
          },
        },
        md: {
          input: {
            paddingRight: 14,
          },
          inputRightElement: {
            width: 14,
          },
        },
      },
      variants: {
        primary: {
          iconButton: {
            color: 'white',
            backgroundColor: 'black',
            _hover: {
              backgroundColor: 'brand.200',
              color: 'black',
            },
          },
        },
      },
      defaultProps: {
        size: 'md',
        variant: 'primary',
      },
    },

    SearchPopover: {
      parts: ['popoverContent', 'popoverBody'],
      baseStyle: {
        inputGroup: {
          maxWidth: 'sm',
        },
        popoverContent: {
          marginX: 4,
        },
      },
      sizes: {
        sm: {},
        md: {},
      },
      variants: {
        primary: {
          popoverBody: {
            backgroundColor: 'white',
          },
        },
      },
      defaultProps: {
        size: 'md',
        variant: 'primary',
      },
    },

    Divider: {
      baseStyle: {
        borderColor: 'brand.200',
        borderWidth: '2px',
      },
      variants: {
        dotted: {
          borderStyle: 'dotted',
        },
      },
    },

    Badge: {
      baseStyle: {
        background: 'gray.300',
        color: 'gray.900',
      },
      variants: {
        cart: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'black',
          color: 'white',
          fontSize: 'xs',
          width: '3ch',
          height: '3ch',
          borderRadius: '50%',
        },
      },
    },

    Icon: {
      baseStyle: {},
      sizes: {
        sm: { boxSize: 3 },
        md: { boxSize: 5 },
        lg: { boxSize: 8 },
      },
      variants: {},
      defaultProps: {},
    },

    Banner: {
      parts: ['Heading', 'BackgroundImage'],
      baseStyle: ({ title, titleHorizontalAlignment, titleVerticalAlignment }) => ({
        BackgroundImage: {
          h: '25vw',
          bgPosition: 'center',
          backgroundSize: 'cover',
          color: 'white',
          fontSize: { base: 'lg', md: 'lg', lg: 'xl' },
          padding: 8,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        },
        Heading: {
          w: '100%',
          h: '100%',
          fontSize: { base: 'l', md: 'xl', lg: '2xl' },
          display: title ? 'flex' : 'none',
          justifyContent:
            titleHorizontalAlignment === 'left'
              ? 'flex-start'
              : titleHorizontalAlignment === 'right'
              ? 'flex-end'
              : 'center',
          alignItems:
            titleVerticalAlignment === 'top'
              ? 'flex-start'
              : titleVerticalAlignment === 'bottom'
              ? 'flex-end'
              : 'center',
        },
      }),
      sizes: {},
      variants: {},
      defaultProps: {},
    },
    NumberInput: {
      parts: ['Stack', 'Input'],
      baseStyle: {
        Stack: { minW: 28 },
        Input: { textAlign: 'center' },
      },
    },
  },
})

export default () => null
