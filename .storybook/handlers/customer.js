import { graphql, rest } from 'msw'
import { customers as customersMock } from '../../src/lib/mocks'

const NETWORK_DELAY = 1000

const errors = {
  INVALID: {
    code: 'INVALID',
    field: null,
    message: 'Input value is invalid.',
  },

  TAKEN: {
    code: 'TAKEN',
    field: null,
    message: 'Email has already been taken',
  },

  TOO_SHORT: {
    code: 'TOO_SHORT',
    field: null,
    message: 'Password is too short (minimum is 5 characters)',
  },

  UNIDENTIFIED_CUSTOMER: {
    code: 'UNIDENTIFIED_CUSTOMER',
    field: null,
    message: 'Unidentified customer',
  },

  TOKEN_NOT_FOUND: {
    code: 'TOKEN_NOT_FOUND',
    field: null,
    message: 'Access token does not exist',
  },
}

export const customer = [
  // loginShopify
  rest.post('/account/login', async (req, res, ctx) => {
    return res(ctx.status(302))
  }),

  // logoutShopify
  rest.get('/account/logout', async (req, res, ctx) => {
    return res(ctx.status(302))
  }),

  // CustomerRecover
  graphql.mutation('CustomerRecover', async (req, res, ctx) => {
    await imitateNetworkDelay()

    const { email } = req.variables

    if (!customersMock[email]) {
      return res(
        ctx.data({
          customerRecover: {
            email,
            customerUserErrors: [errors['INVALID']],
          },
        }),
      )
    }

    return res(
      ctx.data({
        customerRecover: {
          email,
        },
      }),
    )
  }),

  // CustomerAccessTokenCreate
  graphql.mutation('CustomerAccessTokenCreate', async (req, res, ctx) => {
    const {
      input: { email },
    } = req.variables

    if (!customersMock[email]) {
      return res(
        ctx.data({
          customerAccessTokenCreate: {
            customerAccessToken: null,
            customerUserErrors: [errors['UNIDENTIFIED_CUSTOMER']],
          },
        }),
      )
    }

    const accessToken = Buffer.from(email, 'utf8').toString('base64')
    const expiresAt = new Date()

    expiresAt.setFullYear(expiresAt.getFullYear() + 1)

    return res(
      ctx.data({
        customerAccessTokenCreate: {
          customerAccessToken: {
            accessToken,
            expiresAt: expiresAt.toISOString(),
          },
        },
      }),
    )
  }),

  // CustomerAccessTokenRenew
  graphql.mutation('CustomerAccessTokenRenew', async (req, res, ctx) => {
    const { customerAccessToken } = req.variables
    const expiresAt = new Date()

    expiresAt.setFullYear(expiresAt.getFullYear() + 1)

    return res(
      ctx.data({
        customerAccessTokenRenew: {
          customerAccessToken: {
            accessToken: customerAccessToken,
            expiresAt: expiresAt.toISOString(),
          },
        },
      }),
    )
  }),

  // CustomerAccessTokenDelete
  graphql.mutation('CustomerAccessTokenDelete', async (req, res, ctx) => {
    const { customerAccessToken } = req.variables

    return res(
      ctx.data({
        customerAccessTokenDelete: {
          deletedAccessToken: customerAccessToken,
          deletedCustomerAccessTokenId: 'gid://shopify/CustomerAccessToken/whatever',
          userErrors: [],
        },
      }),
    )
  }),

  // GetCustomer
  graphql.query('GetCustomer', async (req, res, ctx) => {
    const { customerAccessToken } = req.variables
    const email = Buffer.from(customerAccessToken, 'base64').toString('utf8')
    const { customer } = customersMock[email]

    if (!customer) {
      return res(ctx.errors([errors['UNIDENTIFIED_CUSTOMER']]))
    }

    const { orders, addresses, ...rest } = customer

    return res(ctx.data({ customer: rest }))
  }),

  // GetOrders
  graphql.query('GetOrders', async (req, res, ctx) => {
    const { customerAccessToken } = req.variables
    const email = Buffer.from(customerAccessToken, 'base64').toString('utf8')
    const { customer } = customersMock[email]

    if (!customer) {
      return res(ctx.errors([errors['UNIDENTIFIED_CUSTOMER']]))
    }

    return res(
      ctx.data({
        customer: {
          orders: customer.orders || null,
        },
      }),
    )
  }),

  // GetAddresses
  graphql.query('GetAddresses', async (req, res, ctx) => {
    const { customerAccessToken } = req.variables
    const email = Buffer.from(customerAccessToken, 'base64').toString('utf8')
    const { customer } = customersMock[email]

    if (!customer) {
      return res(ctx.errors([errors['UNIDENTIFIED_CUSTOMER']]))
    }

    return res(
      ctx.data({
        customer: {
          addresses: customer.addresses || null,
        },
      }),
    )
  }),

  // CustomerCreate
  graphql.mutation('CustomerCreate', async (req, res, ctx) => {
    await imitateNetworkDelay()

    const { customerCreateInput } = req.variables
    const { email } = customerCreateInput
    const customerMock = customersMock[email]

    if (customerMock && customerMock.customer && customerMock.customer.email === email) {
      return res(ctx.errors([errors['TAKEN']]))
    }

    return res(ctx.data({ customer: customerMock.customer }))
  }),

  // CustomerResetByUrl
  graphql.mutation('CustomerResetByUrl', async (req, res, ctx) => {
    await imitateNetworkDelay()

    const { password } = req.variables

    if (password.length < 6) {
      return res(ctx.errors([errors['TOO_SHORT']]))
    }

    return res(ctx.data({}))
  }),
]

// utils
async function imitateNetworkDelay() {
  await new Promise(r => setTimeout(r, NETWORK_DELAY))
}
