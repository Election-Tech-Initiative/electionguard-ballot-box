import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import { render as testRender } from '@testing-library/react'

import { BallotBoxType } from '../src/config/types'
import BallotBoxContext from '../src/contexts/ballotBoxContext'

export function render(
  component: React.ReactNode,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [] }),
    type = BallotBoxType.Unset,
    setType = jest.fn(),
    count = 0,
    setCount = jest.fn(),
    eject = jest.fn(),
    reset = jest.fn(),
  } = {}
) {
  return {
    ...testRender(
      <BallotBoxContext.Provider
        value={{
          type,
          setType,
          count,
          setCount,
          eject,
          reset,
        }}
      >
        <Router
          history={
            route ? createMemoryHistory({ initialEntries: [route] }) : history
          }
        >
          {component}
        </Router>
      </BallotBoxContext.Provider>
    ),
    history,
  }
}

export default undefined
