var fs = require('fs');
var Hapi = require('hapi');
var tape = require('tape');
var path = require('path');
var abase = require('../lib/index.js');
var hooks = require('./helpers/hooks.js');
var PATH_SCHEMA = path.join(__dirname, 'fixtures', 'schema.json');
var PATH_WRONGSCHEMA = path.join(__dirname, 'fixtures', 'wrong_schema.json');
var PATH_RIGHTSCHEMA = path.join(__dirname, 'fixtures', 'right_schema.json');
var server;

// Spoofs a JSON file, where our naming convention is snake-case
// But in JS our convention is camel case, so need to disable linting here
function getOpts (PATH) {
  return { user_schema_path: PATH }; // eslint-disable-line
}

// Add test hooks to tape
tape = hooks.beforeEach(tape, function (t) {
  server = new Hapi.Server();
  server.connection({ port: 0 });
  t.end();
});

tape = hooks.afterEach(tape, function (t) {
  // reset the schema for next tests
  fs.writeFileSync(
    PATH_SCHEMA,
    JSON.stringify({}),
    'utf8'
  );
  server.stop(t.end);
});


tape('check wrong path throws error', function (t) {
  var opts = { wrong: PATH_SCHEMA };

  server.register({
    register: abase, options: opts
  }, function (err) {
    t.ok(err, 'Error thrown');
    t.end();
  });
});

tape('Attempt to load a wrong content config schema', function (t) {
  var opts = getOpts(PATH_WRONGSCHEMA);

  server.register({
    register: abase, options: opts
  }, function (err) {
    t.ok(err, 'Error thrown');
    t.end();
  });
});

tape('Load abase plugin properly', function (t) {
  var opts = getOpts(PATH_RIGHTSCHEMA);

  server.register({
    register: abase, options: opts
  }, function (err) {
    t.ok(!err, 'Error thrown');
    t.end();
  });
});

tape('Load properly abase plugin and add default values', function (t) {
  var opts = getOpts(PATH_SCHEMA);
  var schemaBefore, schemaAfter, expected;

  schemaBefore = JSON.parse(fs.readFileSync(opts.user_schema_path, 'utf8'));
  t.deepEqual(schemaBefore, {}, 'The schema is empty before abase loading');

  server.register({
    register: abase, options: opts
  }, function (err) {
    t.ok(!err, 'No error thrown');

    schemaAfter = JSON.parse(fs.readFileSync(opts.user_schema_path, 'utf8'));
    expected = {
      email: { type: 'email' },
      password: { type: 'password' }
    };
    t.deepEqual(
      schemaAfter,
      expected,
      'The schema contains the default values after abase loaded'
    );
    t.end();
  });
});
