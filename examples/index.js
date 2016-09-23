'use strict';

var Hapi = require('hapi');
var plugin = require('../lib/index.js');
var server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 8888,
});

server.register(plugin, function (err) {
  if (err) {
    throw err;
  }

  server.start(function () {
    console.log('Server started');
  });
});
