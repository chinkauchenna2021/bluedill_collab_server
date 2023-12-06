#!/usr/bin/env node

/**
 * @type {any}
 */
const WebSocket = require('ws')
const http = require('http')
const port = process.env.PORT || 1234
const wss = new WebSocket.Server({ port: port })
const setupWSConnection = require('./utils.js').setupWSConnection

const host = process.env.HOST || 'localhost'

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('okay')
})

wss.on('connection', setupWSConnection)
console.log("working successfully ----  on websocket ---- %s " , wss)

server.on('upgrade', (request, socket, head) => {
  // You may check auth of request here..
  // See https://github.com/websockets/ws#client-authentication
  /**
   * @param {any} ws
   */
  const handleAuth = ws => {
    wss.emit('connection', ws, request)
  }
  wss.handleUpgrade(request, socket, head, handleAuth)
})

server.listen(port, () => {
  console.log(`running at '${host}' on port ${port}`)
})
