# Shogun Starter Kit

- [Introduction](#introduction)
- [Configuration](#configuration)
- [Installation](#installation)
- [Usage](#usage)
- [Required dependencies for usage with Shogun Frontend](#required-dependencies-for-usage-with-shogun-frontend)
- [Can 3rd party dependencies be used?](#can-3rd-party-dependencies-be-used)
- [Docs](#docs)
- [Convention and tips](#convention-and-tips)
- [License](#license)

# Introduction

Shogun Starter Kit provides a set of ready to use Sections and Components for your Store. Components are developed in isolation via Storybook and synced to Shogun Frontend with CLI tool or GitHub Integration.

What is possible to develop locally:

- React sections/components (`js` files)

What currently isn't supported:

- Section variables/data
- CMS
- Pages
- Site settings

# Configuration

- Create `.env` file and copy content of `.env.example` in that file.
- Update `HUB_CORE_JWT` variable. To get `HUB_CORE_JWT` value, in your browser open network panel and go to our site https://frontend.getshogun.com/ then click on any API call to Shogun Frontend backend (currently `https://api-gateway.frontend.getshogun.com/graphql`). Under Request Headers find `authorization` header copy/paste value after word 'Bearer'. In `.env` it should look like this:
  `HUB_CORE_JWT=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MTMzODAxOTIsImV4cCI6MTY0NDkxNjE5MiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.72A48ZG0yBQZHFj3OYD-LFbB179KBDmdbaBdJiu5vAU`)

# Usage

To use Shogun Starter Kit locally, you need to install the Node dependencies and then start the Storybook server.

```bash
yarn install
yarn start
```

## Windows only

If your OS of choice is Windows, you might need to change the `package.json` `start` script.

Change the following in `package.json`'s **line 6**.

```diff
- "start": "BROWSER=none start-storybook -p 9009 -s ./static",
+ "start": "SET BROWSER=none start-storybook -p 9009 -s ./static",
```

# Required dependencies for usage with Shogun Frontend

Make sure you have the following dependencies in your Shogun Frontend store:

```
"@chakra-ui/icons": "^1.0.5",
"@chakra-ui/react": "^1.3.2",
"@emotion/react": "^11.0.0",
"@emotion/styled": "^11.0.0",
"framer-motion": ">=3.0.0",
"nanoid": "^3.1.23",
"react-icons": "^4.2.0",
"react-swipeable": "^6.1.0",
```

# Can 3rd party dependencies be used?

Yes. You can `yarn add` them here. To add them in Shogun Frontend ask us to do it for you. Right now we don't have an UI for it.

:warning: Some dependencies might not be supported by Shogun Frontend, due its [PWA](https://web.dev/progressive-web-apps/) and [SSR](https://developers.google.com/web/updates/2019/02/rendering-on-the-web#server-rendering) nature. If in doubt, ask Shogun team for assistance.

# Docs

- Storybook can be visited by accessing: [https://getshogun.github.io/hub-starter-kit/](https://getshogun.github.io/hub-starter-kit/)
- Inside `/docs` directory you can find documentation about Shogun's internal packages, such as `frontend-checkout` and `frontend-ui`

# Conventions and tips

- Components are defined in `src/components/` directory
- Sections are defined in `src/sections/` directory. _Everything_ that's mentioned bellow about the components also applies to sections
- Section and component names should be unique
- Each component consists of two files:
  - `index.js` - component code that has a default export of component
  - `ComponentName.stories.js` containing the stories demonstrating component API (optional)
- There's an alias defined for composing components that you can use as [shown in this example](./src/sections/Banner/index.js). Relative imports won't work in the app
- **For more guidelines**, check the Guidelines section on [Shogun Starter Kit's Storybook](https://getshogun.github.io/hub-starter-kit/?path=/story/docs-guidelines--page)

# License

MIT License

Copyright (c) 2021 Shogun, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
