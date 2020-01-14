// This file runs a simple production web server of the React production build
// it reuses setupProxy.js for consistent use of backend modules in dev and prod.
// This is plain JS rather than our TS setup in the React app because of that.
//
/* eslint-disable */
/* istanbul ignore file */

const express = require('express')
const fs = require('fs')
const proxy = require('../src/setupProxy')
const http = require('http')
const WebSocket = require('ws');

const default_tty_device = '/dev/ttyACM0'

const app = express()
const app_port = 3000
const ws_port = 3001
const server = http.createServer(app)
const wsServer = new WebSocket.Server({ server })

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
  next()
})
proxy(app)

app.get('/machine-id', (req, res) => {
  res.json({
    "machineId": process.env.VX_MACHINE_ID || "000",
  })
})

app.use('/', express.static('../build'))

// eslint-disable-next-line no-console
app.listen(app_port, () => console.log(`Listening at http://localhost:${app_port}/`))


wsServer.on('connection', (webSocketClient) => {
  webSocketClient.on('message', (message) => {
    console.log(`websocket: message received: ${message}`)
  })
})

server.listen(ws_port, () => {
  console.log(`websocket server started on port ${server.address().port}`)
})

function appendFile(data) {
  fs.appendFile('data.txt', data, 'utf8', error => {
    if (error) {
      console.log(`error writing file: ${error}`)
    }
  })
}

function sendData(data) {
  wsServer.clients.forEach(client => {
    client.send(`{ "message" : ${data} }`)
  })
}

let scanned = []
function listenForSerialPort() {
  const SerialPort = require('serialport')
  const port = new SerialPort(default_tty_device)

  const Readline = require('@serialport/parser-readline')
  const ByteLength = require('@serialport/parser-byte-length')

  const parser = new Readline()
  const byteLength = new ByteLength({ length: 8})
  port.pipe(byteLength)

  port.on('error', err => {
    console.error('Error', err)
  })

  port.on('close', err => {
    console.log('Closed', err)
  })

  port.on('data', line => {
    line += '' // Sanitize line
    if(scanned.findIndex(x => x === line) === -1) {
      console.log(`> ${line}`)
      scanned.push(line)
      appendFile(line)
      sendData(line)
    } else{
      console.warn(`> ${line} - DUPLICATE`)
      sendData('duplicate')
    }
  })
}

listenForSerialPort()

