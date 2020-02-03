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
var request = require("request")
const WebSocket = require('ws')

const default_tty_device = '/dev/ttyACM0'

const app = express()
const app_port = 3000
const ws_port = 3005
const server = http.createServer(app)
const wsServer = new WebSocket.Server({ server })

var ballotsFileName = 'castBallots.json'
var exportPath = '../data/'

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

function mount() {
  var options = { 
    method: 'POST',
    url: 'http://localhost:3004/usb/0/mount',
    qs: { label: 'storage_drive' },
    headers: 
    { 
      'cache-control': 'no-cache',
      Connection: 'keep-alive',
      'Content-Length': '0',
      'Accept-Encoding': 'gzip, deflate',
      Host: 'localhost:3004',
      Accept: '*/*',
      } 
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    var response = JSON.parse(body)

    if (response.message && typeof response.message === 'string' && response.message.includes('already mounted'))
    {
      loadUsbMountpoint()
    } else {
      // TODO read it from the response body
      var device = response.message

      // device exists and so does a mountpoint
      if (device && device.mountpoints && device.mountpoints[0]) {
        exportPath = `${device.mountpoints[0]}/data`
        console.log(exportPath)
      }
    }
  });

}

function loadUsbMountpoint() {
  var request = require("request");

var options = { 
  method: 'GET',
  url: 'http://localhost:3004/usb',
  headers: 
   { 
     'cache-control': 'no-cache',
     Connection: 'keep-alive',
     'Accept-Encoding': 'gzip, deflate',
     Host: 'localhost:3004',
     Accept: '*/*',
     'Content-Type': 'application/json' 
    } 
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    var devices = JSON.parse(body);

    // device exists and so does a mountpoint
    if (devices[0] && devices[0].mountpoints && devices[0].mountpoints[0]) {
      exportPath = `${devices[0].mountpoints[0]}/data`
      console.log(exportPath)
    } else {
      mount()
    }
  });

}

wsServer.on('connection', (webSocketClient) => {
  webSocketClient.on('message', (message) => {
    console.log(`websocket: message received: ${message}`)
  })
})

server.listen(ws_port, () => {
  console.log(`websocket server started on port ${server.address().port}`)
  loadUsbMountpoint()
})

function appendFile(data) {

  var file = `${exportPath}/${ballotsFileName}`
  
  fs.exists(file, exists => {

    if (exists) {
      var readValue = fs.readFileSync(file)
      var dataArray = JSON.parse(readValue)
      dataArray.push(data)
      var writeValue = JSON.stringify(dataArray)
      fs.writeFileSync(file, writeValue)
    } else {
      var dataArray = []
      dataArray.push(data)
      var writeValue = JSON.stringify(dataArray)
      fs.writeFileSync(file, writeValue)
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

