import React from 'react'
import { Route } from 'react-router-dom'
import { fireEvent } from '@testing-library/react'

import { render } from '../../test/testUtils'

import NotFoundPage from './NotFoundPage'

it('renders NotFoundPage', () => {
  const reset = jest.fn()
  const { container, getByText } = render(
    <Route path="/" component={NotFoundPage} />,
    {
      reset,
      route: '/foobar-not-found-path',
    }
  )
  expect(container.firstChild).toMatchSnapshot()
  fireEvent.click(getByText('Start Over'))
  expect(reset).toHaveBeenCalled()
})
