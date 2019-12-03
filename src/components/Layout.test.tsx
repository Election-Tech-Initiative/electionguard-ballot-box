import React from 'react'

import { render } from '../../test/testUtils'

import Layout from './Layout'

it('can renders Layout', () => {
  const { container } = render(<Layout />, {})
  expect(container.firstChild).toMatchSnapshot()
})
