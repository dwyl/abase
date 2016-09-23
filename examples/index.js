'use strict';

require('env2')('config.env');
var Hapi = require('hapi');
var Abase = require('../lib/index.js');
var HapiPg = require('hapi-postgres-connection');
var server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 8888,
});

server.register([HapiPg, Abase], function (err) {
  if (err) {
    throw err;
  }

  server.start(function () {
    console.log('Server started');
  });
});
