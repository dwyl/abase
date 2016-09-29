'use strict';

var test = require('tape');

var client = require('./test_pg_client.js');
var db = require('../lib/db.js');
var schema = require('./example_schema.js');

var testInsert = {
  email: 'test@gmail.com',
  dob: '2001-09-27',
  username: 'test'
};

test('init test client', function (t) {
  client.connect(function () {
    client.query('DROP TABLE IF EXISTS ' + schema.table_name, t.end);
  });
});

test('db.init', function (t) {
  t.throws(
    function () { db.init(client, { rubbish: 'schema' }) },
    'error thrown when given when using invalid schema'
  );
  db.init(client, schema)
    .then(function () { return client.query('SELECT * from user_data') })
    .then(function (res) {
      t.ok(
        res.fields
          .map(function (field) { return field.name })
          .indexOf('dob') > -1
        , 'table created with a correct field'
      );
      t.end();
    })
  ;
});


test('db.insert & default select w custom where', function (t) {
  db.insert(client, schema, { fields: testInsert })
    .then(function () {
      return db.select(client, schema, { where: { dob: '2001-09-27' } });
    })
    .then(function (res) {
      t.equal(
        res.rows[0].email,
        testInsert.email,
        'email correct'
      );
      t.equal(
        res.rows[0].username,
        testInsert.username,
        'username correct'
      );
      t.equal(
        res.rows[0].dob.toLocaleDateString('GMT'),
        new Date(testInsert.dob).toLocaleDateString('GMT'),
        'get same date back, though now a date object'
      );
      t.end();
    })
    .catch(function (err) {
      t.fail(err);
      t.end();
    })
  ;
});

test('db.insert x 2 same username error', function (t) {
  t.plan(1);
  db.insert(client, schema, { fields: testInsert })
    .then(function () {
      return db.insert(client, schema, { fields: testInsert });
    })
    .then(function () {
      t.fails('shouldn\'t allow second insert if unique key given');
    })
    .catch(function () {
      t.pass('shouldn\'t allow second insert if unique key given');
    })
  ;
});

test('db.update w where & custom select w default where', function (t) {
  t.plan(1);
  db.update(client, schema, {
    fields: { username: 'bob' },
    where: { email: 'test@gmail.com' }
  }).then(function () {
    return db.select(client, schema, { select: ['email', 'username'] });
  })
  .then(function (res) {
    t.deepEqual(
      res.rows[0],
      {
        email: 'test@gmail.com',
        username: 'bob'
      },
      'username updated'
    );
  })
  .catch(t.fail);
});

test('db.delete w db.select', function (t) {
  t.plan(1);
  db.delete(client, schema, { where: { username: 'bob' } })
    .then(function () { return db.select(client, schema, {}) })
    .then(function (res) { t.equal(res.rows.length, 0, 'nothing left in db') })
    .catch(t.fail)
  ;
});

test('close test client', function (t) {
  client.end(t.end);
});
