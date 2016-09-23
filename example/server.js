var hapi = require('hapi');
var home = require('./home');
var abase = require('../lib/index');

exports.init = function (port, next) {

  var server = new hapi.Server();
  server.connection({port: port});
  server.register([home, {register: abase, options: require('../example_config.json')}], function (err) {
    if (err) {
      return next(err);
    }

    server.start(function (err) {

      return next(err, server);
    });
  });
};
