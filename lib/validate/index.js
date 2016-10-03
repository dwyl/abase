'use strict';

var joiValidator = require('./joi_validation.js');

exports.register = function (server, options, next) {
  var schema = server.app.abase || require(options.schemaPath); // eslint-disable-line

  server.decorate('server', 'abaseValidate', function (fields) {
    return joiValidator(schema, fields);
  });

  next();
};

exports.register.attributes = { name: 'abase-validate' };
