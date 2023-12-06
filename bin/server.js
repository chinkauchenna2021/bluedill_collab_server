#!/usr/bin/env node

/**
 * @type {any}
 */
const WebSocket = require('ws')
const port = process.env.PORT || 1234
const wss = new WebSocket.Server({ port: port })
const setupWSConnection = require('./utils.js').setupWSConnection

wss.on('connection', setupWSConnection)
console.log("working successfully ----  on websocket ---- %s " , wss)
