'use strict'

var http = require('http')
var requestHandler = require('./requestHandler')

var server = http.createServer(requestHandler)

server.listen(3000)
