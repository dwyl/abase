'use strict';

var server = require('./server');
var hoek = require('hoek');

server.init(process.env.PORT || 8000, function (err) {
  hoek.assert(!err, err);
  server.log('The server is running on: ', server.info.uri);
});
