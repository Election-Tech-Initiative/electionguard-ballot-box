/* eslint-disable no-console */
import React, { Component } from 'react'

interface Props {
  onScan: () => void
}

class QRScanner extends Component<Props> {
  componentDidMount() {
    const endpoint = process.env.REACT_APP_SCANNER_ENDPOINT
    if (!endpoint) {
      return
    }
    const ws = new WebSocket(endpoint)
    ws.onopen = () => {
      console.log('websocket connection open')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ws.onmessage = evt => {
      console.log(`message received: ${JSON.stringify(evt.data)}`)
      this.props.onScan()
    }
  }

  render() {
    return <></>
  }
}

export default QRScanner
