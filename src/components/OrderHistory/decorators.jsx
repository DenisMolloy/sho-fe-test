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

import * as React from 'react'
import { getCustomerDecorator } from '../../lib/decorators'
import { useCustomer } from 'frontend-customer'

/**
 * @typedef { import("@storybook/addons").ArgsStoryFn<JSX.Element> } ArgsStoryFn
 * @typedef {{ StoryFn: ArgsStoryFn }} Props
 *
 * @param {Props} props
 * @returns {React.ReactElement}
 * */
function OrderHistoryDecorator({ StoryFn }) {
  const [{ isLoggedIn, orders }, { getAllOrders }] = useCustomer()

  React.useEffect(() => {
    if (isLoggedIn) {
      getAllOrders()
    }
  }, [isLoggedIn, getAllOrders])

  return <React.Fragment>{React.cloneElement(StoryFn(), { orders })}</React.Fragment>
}

/**
 * @typedef { import("../../lib/decorators").DecoratorFunction<JSX.Element> } DecoratorFunction
 *
 * @param {string} email
 * @returns {DecoratorFunction[]}
 * */

const getDecorators = email => [
  StoryFn => <OrderHistoryDecorator StoryFn={StoryFn} />,
  getCustomerDecorator(email),
]

export default getDecorators
