'use strict';

var test = require('tape');
var compareSync = require('bcrypt').compareSync;

var hash = require('../lib/hash.js');

var testConfig = { fields: {
  secretAnswer: { password: true },
  password: { password: true },
  email: {}
} };

test('no need to hash, cb instantaneous w/o err but new object', function (t) {
  var testData = { email: 't@g.com' };

  hash(testConfig, testData, function (err, res) {
    t.equal(err, null, 'no chance for error creation');
    t.deepEqual(res, { email: 't@g.com' }, 'object shallowly equal');
    t.notEqual(res, testData, 'new object always returned');

    t.end();
  });
});

test('needs to be hashed', function (t) {
  var testData = {
    email: 'no@need.com',
    password: 'hash me',
    secretAnswer: 'please'
  };

  hash(testConfig, testData, function (err, res) {
    t.notOk(err, 'no error should be produced');
    t.deepEqual(
      testData,
      {
        email: 'no@need.com',
        password: 'hash me',
        secretAnswer: 'please'
      },
      'original object not mutated'
    );
    t.equal(res.email, testData.email, 'email remains the same');
    t.notEqual(res, testData, 'new object always returned');
    t.ok(
      compareSync(testData.password, res.password),
      'field tagged password hashed ok default salt number used'
    );
    t.ok(
      compareSync(testData.secretAnswer, res.secretAnswer),
      'other field tagged password hashed ok default salt number used'
    );

    t.end();
  });
});

test('forcing a bcrypt error with invalid args (won\'t happen)', function (t) {
  var testData = {
    password: 'validString',
    secretAnswer: 42
  };

  hash(testConfig, testData, function (err) {
    t.ok(err, 'error created');
    t.deepEqual(
      testData,
      {
        password: 'validString',
        secretAnswer: 42
      },
      'original object not mutated'
    );

    t.end();
  });
});

test('custom salt number', function (t) {
  var saltConfig = {
    fields: { password: { password: true } },
    salt_number: 5 // eslint-disable-line
  };

  hash(saltConfig, { password: 'hash me' }, function (err) {
    t.notOk(err, 'when providing custom salt number');

    t.end();
  });
});
