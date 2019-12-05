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
  endpoint: string
}

const initialState: State = {
  isLiveMode: true,
  type: BallotBoxType.Unset,
  count: 0,
  endpoint: 'ws://localhost:3001',
}

export class App extends React.Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = initialState
  }

  componentDidMount() {
    const ws = new WebSocket(this.state.endpoint)
    ws.onopen = () => {
      console.log('websocket connection open')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ws.onmessage = evt => {
      console.log(`message received: ${JSON.stringify(evt.data)}`)
      this.setBallotCount(this.state.count + 1)
    }
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
