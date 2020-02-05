import React from 'react'
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom'

import 'normalize.css'
import './App.css'

import Layout from './components/Layout'
import BallotBoxContext from './contexts/ballotBoxContext'
import { BallotBoxType } from './config/types'

interface State {
  isLiveMode: boolean
  type: BallotBoxType
  count: number
}

const initialState: State = {
  isLiveMode: process.env.NODE_ENV === 'production',
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
    // TODO: Eject usb drive
    this.reset()
  }

  private reset = () => {
    this.setState(initialState)
    const { history } = this.props
    history.push('/')
  }

  public render() {
    const { isLiveMode, type, count } = this.state
    return (
      <BallotBoxContext.Provider
        value={{
          isLiveMode,
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
