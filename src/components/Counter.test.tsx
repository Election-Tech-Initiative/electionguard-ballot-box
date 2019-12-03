import React from 'react'

import { render } from '../../test/testUtils'

import Counter from './Counter'

it('can renders Counter', () => {
  const { container } = render(<Counter />, {})
  expect(container.firstChild).toMatchSnapshot()
})
