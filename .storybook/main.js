const path = require('path')
const AliasPlugin = require('enhanced-resolve/lib/AliasPlugin')

const toPath = _path => path.join(process.cwd(), _path)

module.exports = {
  stories: [
    '../src/docs/**/*.stories.mdx',
    '../src/components/**/*.stories.@(js|mdx)',
    '../src/sections/**/*.stories.@(js|mdx)',
  ],

  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
    '@storybook/addon-backgrounds',
    '@storybook/addon-viewport',
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldExtractValuesFromUnion: true,
      propFilter: (prop, component) => {
        if (prop.declarations !== undefined && prop.declarations.length > 0) {
          const hasPropAdditionalDescription = prop.declarations.find(declaration => {
            return !declaration.fileName.includes('node_modules')
          })

          return Boolean(hasPropAdditionalDescription)
        }

        return true
      },
    },
  },

  refs: {
    // This is to get rid of WARN unable to find package.json for @chakra-ui/react
    // will be released in Storybook 6.2.0, see https://github.com/storybookjs/storybook/pull/12863
    '@chakra-ui/react': { disable: true },
  },

  webpackFinal: config => {
    /** Add aliases */
    config.resolve.alias = {
      ...config.resolve.alias,
      'Components/BuiltIn': path.join(__dirname, '../src/lib/built-in'),
      'frontend-link': path.join(__dirname, '../src/lib/built-in/Link'),
      'frontend-store': path.join(__dirname, '../src/lib/built-in/store/context'),
      'frontend-head': path.join(__dirname, '../src/lib/built-in/head'),
      'frontend-router': path.join(__dirname, '../src/lib/built-in/router'),
      'frontend-lazy': path.join(__dirname, '../src/lib/built-in/lazy'),
      '@emotion/core': toPath('node_modules/@emotion/react'),
      'emotion-theming': toPath('node_modules/@emotion/react'),
    }

    config.resolve.plugins.push(
      new AliasPlugin(
        'described-resolve',
        [
          {
            name: 'Components',
            alias: [
              path.join(__dirname, '../src/components'),
              path.join(__dirname, '../src/sections'),
            ],
          },
        ],
        'resolve',
      ),
    )

    /** Add global css */
    config.entry.push(path.join(__dirname, '../src/global.css'))

    return config
  },
}
