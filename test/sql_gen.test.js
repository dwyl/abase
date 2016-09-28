'use strict';

var tape = require('tape');

var sqlGen = require('../lib/sql_gen.js');
var schema = require('./example_schema.js');

tape('::init should throw on empty or invalid input', function (t) {
  t.throws(function () {
    sqlGen.init();
  });
  t.end();
});

tape('::init - generate SQL to create a table if none exists', function (t) {
  var query = sqlGen.init(schema);

  t.equal(
    query,
    'CREATE TABLE IF NOT EXISTS "user_data" ('
    + 'email VARCHAR(80), '
    + 'username VARCHAR(20), '
    + 'dob DATE'
    + ')',
    'Create table query generation from config object'
  );
  t.end();
});

tape('::select - generate SQL to select columns from a table', function (t) {
  var query = sqlGen.select(schema.table_name, { select: ['email', 'dob'] });

  t.equal(
    query[0],
    'SELECT email, dob FROM "user_data"',
    'Generate parameterised query'
  );
  t.deepEqual(query[1], [], 'Generate values for parameterised query');
  t.end();
});

tape('::select - gen. SQL to select cols from table w/ where', function (t) {
  var query = sqlGen.select(schema.table_name, {
    select: ['email', 'dob'],
    where: { foo: 'bar' }
  });

  t.equal(
    query[0],
    'SELECT email, dob FROM "user_data" WHERE foo=$1',
    'Generate parameterised query'
  );
  t.deepEqual(query[1], ['bar'], 'Generate values for parameterised query');
  t.end();
});

tape('::insert - generate SQL to insert a column into a table', function (t) {
  var query = sqlGen.insert(
    schema.table_name, { fields: { email: 'me@poop.com' } }
  );

  t.equal(
    query[0],
    'INSERT INTO "user_data" (email) VALUES ($1)',
    'Generate parameterised query'
  );
  t.deepEqual(
    query[1],
    ['me@poop.com'],
    'Generate values for parameterised query'
  );
  t.end();
});

tape('::update - generate SQL to update a column in a table', function (t) {
  var query = sqlGen.update(
    schema.table_name, { fields: { email: 'me@poop.com' } }
  );

  t.equal(
    query[0],
    'UPDATE "user_data" SET email=$1',
    'Generate parameterised query'
  );
  t.deepEqual(
    query[1],
    ['me@poop.com'],
    'Generate values for parameterised query'
  );
  t.end();
});

tape('::update - gen. SQL to update a col in table w/ where', function (t) {
  var query = sqlGen.update(schema.table_name, {
    fields: { email: 'me@poop.com' },
    where: { foo: 'bar' }
  });

  t.equal(
    query[0],
    'UPDATE "user_data" SET email=$1 WHERE foo=$2',
    'Generate parameterised query'
  );
  t.deepEqual(
    query[1],
    ['me@poop.com', 'bar'],
    'Generate values for parameterised query'
  );
  t.end();
});

tape('::delete should generate SQL to delete a row from a table', function (t) {
  var query = sqlGen.delete(schema.table_name, { where: { username: 'bob' } });

  t.equal(
    query[0],
    'DELETE FROM "user_data" WHERE username=$1',
    'Generate parameterised query'
  );
  t.deepEqual(
    query[1],
    ['bob'],
    'Generate values for parameterised query'
  );
  t.end();
});
