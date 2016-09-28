'use strict';

var server = require('./server.js');
var hoek = require('hoek');
var port = process.env.PORT || 8000;

server.init(port, function (err) {
  hoek.assert(!err, err);
  console.log('The server is running on: http://localhost:' + port); // eslint-disable-line
});
