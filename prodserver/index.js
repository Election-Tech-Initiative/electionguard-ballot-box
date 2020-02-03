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
const ws_port = 3005
const server = http.createServer(app)
const wsServer = new WebSocket.Server({ server })

var ballotsFileName = './castBallots.json'

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

  fs.exists(ballotsFileName, exists => {

    if (exists) {
      var readValue = fs.readFileSync(ballotsFileName)
      var dataArray = JSON.parse(readValue)
      dataArray.push(data)
      var writeValue = JSON.stringify(dataArray)
      fs.writeFileSync(ballotsFileName, writeValue)
    } else {
      var dataArray = []
      dataArray.push(data)
      var writeValue = JSON.stringify(dataArray)
      fs.writeFileSync(ballotsFileName, writeValue)
    }
  })
}

function loadFile(filename) {

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
    // Sanitize line
    line += '' 
    var length = line.length - 8 - 3
    var substr = line.substr(8, length)
    
    if(scanned.findIndex(x => x === substr) === -1) {
      console.log(`> ${substr}`)
      scanned.push(substr)
      appendFile(substr)
      sendData(substr)
    } else{
      console.warn(`> ${substr} - DUPLICATE`)
      sendData('duplicate')
    }
  })
}

listenForSerialPort()

