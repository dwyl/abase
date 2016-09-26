var abase = require('../lib/index.js');
var fs = require('fs');
var Hapi = require('hapi');
var tape = require('tape');
var path = require('path');

tape('check wrong path throws error', function (t) {
  var server = new Hapi.Server();
  server.connection({ port: 0 });

  var opts = {
    wrong: path.join(__dirname, 'fixtures', 'schema.json')
  };

  server.register({ register: abase, options: opts }, function (err) {
    t.ok(err, 'Error thrown');
    server.stop(function () {
      t.end();
    });
  });
});

tape('Attempt to load a wrong content config schema', function (t) {
  var server = new Hapi.Server();
  server.connection({ port: 0 });

  var opts = {
    user_schema_path: path.join(__dirname, 'fixtures', 'wrong_schema.json')
  };

  server.register({ register: abase, options: opts }, function (err) {
    t.ok(err, 'Error thrown');
    server.stop(function () {
      t.end();
    });
  });
});

tape('Load abase plugin properly', function (t) {
  var server = new Hapi.Server();
  server.connection({ port: 0 });

  var opts = {
    user_schema_path: path.join(__dirname, 'fixtures', 'right_schema.json')
  };

  server.register({ register: abase, options: opts }, function (err) {
    t.ok(!err, 'Error thrown');
    server.stop(function () {
      t.end();
    });
  });
});

tape('Load properly abase plugin and add default values', function (t) {
  var server = new Hapi.Server();
  server.connection({ port: 0 });

  var opts = {
    user_schema_path: path.join(__dirname, 'fixtures', 'schema.json')
  };
  var schemaBefore = JSON.parse(fs.readFileSync(opts.user_schema_path, 'utf8'));
  t.deepEqual(schemaBefore, {}, 'The schema is empty before abase loading');
  server.register({ register: abase, options: opts }, function (err) {
    t.ok(!err, 'No error thrown');
    var schemaAfter = JSON.parse(fs.readFileSync(opts.user_schema_path, 'utf8'));
    var expected = {
      email: {type: 'email'},
      password: {type: 'password'}
    };
    t.deepEqual(schemaAfter, expected, 'The schema contains the default values after abase loaded');
    server.stop(function () {
      //reset the schema for next tests
      fs.writeFileSync(opts.user_schema_path, JSON.stringify({}), 'utf8');
      t.end();
    });
  });
});
