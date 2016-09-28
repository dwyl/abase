'use strict';

var hapi = require('hapi');
var home = require('./home');
var abase = require('../lib/index');
var config = require('../example_config_2.json');

exports.init = function (port, next) {
  var server = new hapi.Server();

  server.connection({ port: port });

  server.register([home, {
    register: abase, options: config
  }], function (err) {
    if (err) {
      return next(err);
    }

    return server.start(function (startError) {
      return next(startError, server);
    });
  });
};
