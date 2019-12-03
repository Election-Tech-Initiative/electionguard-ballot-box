import React from 'react'
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom'

import 'normalize.css'
import './App.css'

import Layout from './components/Layout'
import BallotBoxContext from './contexts/ballotBoxContext'
import { BallotBoxType } from './config/types'

interface State {
  type: BallotBoxType
  count: number
}

const initialState: State = {
  type: BallotBoxType.Unset,
  count: 0,
}

export class App extends React.Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = initialState
  }

  private setBallotBoxType = (type: BallotBoxType) => {
    this.setState({ type })
  }

  private setBallotCount = (count: number) => {
    this.setState({ count })
  }

  private eject = () => {
    // TODO Eject usb drive
    this.reset()
  }

  private reset() {
    this.setState(initialState)
  }

  public render() {
    const { type, count } = this.state
    return (
      <BallotBoxContext.Provider
        value={{
          type,
          setType: this.setBallotBoxType,
          count,
          setCount: this.setBallotCount,
          eject: this.eject,
          reset: this.reset,
        }}
      >
        <Layout />
      </BallotBoxContext.Provider>
    )
  }
}

const Root = () => (
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>
)

export default Root
