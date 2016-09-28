'use strict';

var Hapi = require('hapi');
var Abase = require('../lib/index.js');
var server = new Hapi.Server();
var config = require('./config.json');

require('env2')('config.env');

server.connection({ port: process.env.PORT || 8888 });

server.register({
  register: Abase, options: config
}, function (err) {
  if (err) {
    throw err;
  }

  server.start(function () {
    server.log('Server started');
  });
});
