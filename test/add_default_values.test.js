'use strict';

var tape = require('tape');
var addDefaultValues = require('../lib/add_default_values.js');

tape('add default values to empty object', function (t) {
  var anyChanges = addDefaultValues({});

  t.ok(anyChanges, 'Default values added to the schema');
  t.end();
});

tape('add email to schema if not defined yet', function (t) {
  var obj = { password: { type: 'password' } };
  var anyChanges = addDefaultValues(obj);

  t.ok(anyChanges, 'Changes applied to the schema');
  t.ok(obj.hasOwnProperty('email'), 'email added');
  t.end();
});

tape('add password to schema if not defined yet', function (t) {
  var obj = { email: { type: 'email' } };
  var anyChanges = addDefaultValues(obj);

  t.ok(anyChanges, 'Changes applied to the schema');
  t.ok(obj.hasOwnProperty('password'), 'password added');
  t.end();
});

tape('do not add default values if they are already defined', function (t) {
  var obj = {
    email: { type: 'email' },
    password: { type: 'password' }
  };
  var anyChanges = addDefaultValues(obj);

  t.ok(!anyChanges, 'No changes applied to the schema');
  t.end();
});
