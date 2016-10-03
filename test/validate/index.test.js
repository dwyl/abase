'use strict';

var path = require('path');
var test = require('tape');
var Hapi = require('hapi');
var Joi = require('joi');
var plugin = require('../../lib/validate/index.js');

var server = new Hapi.Server();

server.connection();


test('Register validation plugin w/ schemaPath option', function (t) {
  server.register({
    register: plugin,
    options: { schemaPath: path.resolve(__dirname, '..', 'example_schema.js') }
  }, function (err) {
    if (err) {
      t.fail(err);
    }

    t.equal(
      server.abaseValidate(['email']).toString(),
      Joi.object().keys({ email: Joi.string().email() }).toString(),
      'Generated joi object matches for email field'
    );

    t.equal(
      server.abaseValidate(['username']).toString(),
      Joi.object().keys({ username: Joi.string().min(3).max(20) }).toString(),
      'Generated joi object matches for username field'
    );

    t.equal(
      server.abaseValidate(['email', 'username', 'dob']).toString(),
      Joi.object().keys({
        email: Joi.string().email(),
        username: Joi.string().min(3).max(20),
        dob: Joi.date()
      }).toString(),
      'Generated joi object matches for multiple fields'
    );

    t.end();
  });
});
