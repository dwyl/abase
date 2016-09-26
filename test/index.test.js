var tape = require('tape');
var Hapi = require('hapi');
var path = require('path');
var fs = require('fs');

fs.writeFileSync(path.join(__dirname, 'schema.json'), JSON.stringify({}), 'utf8');

var abase = require('../lib/index.js');

tape('check wrong path throws error', function (t) {
  var server = new Hapi.Server();
  server.connection({ port: 0 });

  var opts = {
    wrong_path: ''
  };

  server.register({ register: abase, options: opts }, function (err) {
    t.ok(err, 'Error thrown');
    server.stop(function () {
      t.end();
    });
  });
});

tape('check no error is thrown if we have the user_schema_path key', function (t) {
  var server = new Hapi.Server();
  server.connection({ port: 0});

  var opts = {
    user_schema_path: path.join(__dirname, 'schema.json')
  };

  var schema = require('./schema.json');

  t.deepEqual(schema, {}, 'schema is empty');

  server.register({ register: abase, options: opts }, function (err) {
    t.ok(!err, 'No error thrown');

    var schema = JSON.parse(fs.readFileSync(path.join(__dirname, 'schema.json')));

    t.ok(schema.email, 'Schema has email property');
    server.stop(function () {
      t.end();
    });
  });
});

tape('check schema is read and no keys are updated', function (t) {
  var server = new Hapi.Server();
  server.connection({ port: 0});

  var opts = {
    user_schema_path: path.join(__dirname, 'schema.json')
  };

  server.register({ register: abase, options: opts }, function (err) {
    t.ok(!err, 'No error thrown');

    server.stop(function () {
      t.end();
    });
  });
});

