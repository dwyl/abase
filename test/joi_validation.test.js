'use strict';

var test = require('tape');
var Joi = require('joi');

var schemaCreator = require('../lib/joi_validation.js');
var exampleSchema = require('./example_schema.js');

var joiAssert = function (object, schema) {
  return function () {
    Joi.assert(object, schema);
  };
};

test('schemaCreator returns simplejoi which behaves as expected', function (t) {
  var schema = schemaCreator(exampleSchema, ['dob']);

  t.ok(schema.isJoi, 'when configured correctly we get a joi object back');
  t.doesNotThrow(
    joiAssert({ dob: '12-21-2012' }, schema),
    'valid email doesn\'t throw, true handled as no arguments for condition'
  );
  t.doesNotThrow(
    joiAssert({}, schema),
    'dob not specifically required yet'
  );
  t.throws(
    joiAssert({
      dob: '12-21-2012',
      username: 'ttt'
    }, schema),
    'username given when not wanted'
  );

  t.end();
});

test('schemaCreator with custom options', function (t) {
  var schema = schemaCreator(exampleSchema, [
    {
      name: 'email',
      options: { required: true }
    },
    {
      name: 'dob',
      options: { valid: ['12-21-2012', '12-22-2012'] }
    },
    'username'
  ]);

  t.throws(
    joiAssert({ username: '5char' }, schema),
    'email not given but required, example of argument as true for require key'
  );
  t.doesNotThrow(
    joiAssert({ email: 't@g.com' }, schema),
    'min info given, another example of argument as true for email key'
  );
  t.throws(
    joiAssert({
      email: 't@g.com',
      dob: '12-25-2012'
    }, schema),
    'specified dobs not given, example of user of array of arguments'
    + ' and additional requirements'
  );
  t.throws(
    joiAssert({
      email: 't@g.com',
      username: 'ts'
    }, schema),
    'username too short, example of single argument given'
    + ' existing requirements'
  );

  t.end();
});

test('schemaCreator invalid fields', function (t) {
  t.throws(
    function () { schemaCreator(exampleSchema, ['email', 'not_configured']) },
    'if a field passed which is not in config object we throw for now'
  );
  t.throws(
    function () { schemaCreator(exampleSchema, ['email', { needs: 'name' }]) },
    'if object given as field needs a name and options prop'
  );

  t.end();
});
