import { createContext } from 'react'

import { BallotBoxContextInterface, BallotBoxType } from '../config/types'

const context: BallotBoxContextInterface = {
  isLiveMode: false,
  type: BallotBoxType.Unset,
  setType: () => undefined,
  count: 0,
  setCount: () => undefined,
  eject: () => undefined,
  reset: () => undefined,
}

const BallotBoxContext = createContext(context)

export default BallotBoxContext
