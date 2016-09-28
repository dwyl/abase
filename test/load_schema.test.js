var tape = require('tape');
var loadSchema = require('../lib/load_schema.js');
var path = require('path');

tape('attempt to load a schema with a wrong path file', function (t) {
  loadSchema('./wrongpathoffile.json', function (error) {
    t.ok(error, 'can\'t read a file with a wrong path');
    t.equal(
      error,
      'Error: sorry impossible to read the file at ./wrongpathoffile.json',
      'error message is passed to the callback'
    );
    t.end();
  });
});

tape('the schema is not a json object', function (t) {
  loadSchema(path.join(__dirname, 'fixtures', 'wrong_schema.json'), function (error) {
    t.ok(error, 'can\'t parse the content of the schema');
    t.equal(
      error,
      'Error: the schema user file contains unconventianal type,'
      + 'please make sure an schema object is defined',
      'error schema parse displayed properly'
    );
    t.end();
  });
});

tape('load the schema', function (t) {
  loadSchema(path.join(__dirname, 'fixtures', 'right_schema.json'), function (error, schema) {
    t.ok(!error, 'no errors');
    t.deepEqual(
      schema,
      {
        email: { type: 'email' }, password: { type: 'password' }
      },
      'the schema is loaded properly'
    );
    t.end();
  });
});
