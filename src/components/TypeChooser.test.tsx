import React from 'react'

import { render } from '../../test/testUtils'

import TypeChooser from './TypeChooser'

it('can renders TypeChooser', () => {
  const { container } = render(<TypeChooser />, {})
  expect(container.firstChild).toMatchSnapshot()
})
