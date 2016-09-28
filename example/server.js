'use strict';

var hapi = require('hapi');
var path = require('path');
var home = require('./home.js');
var abase = require('../lib/index.js');

exports.init = function (port, next) {
  var server = new hapi.Server();

  server.connection({ port: port });

  server.register([home, {
    register: abase, options: { user_schema_path: path.join('..', 'example_config_2.json') }
  }], function (err) {
    if (err) {
      return next(err);
    }

    return server.start(function (startError) {
      return next(startError, server);
    });
  });
};
