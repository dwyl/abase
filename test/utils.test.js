'use strict';

var test = require('tape');
var _ = require('../lib/utils.js');

var o = {
  a: 1,
  b: 2
};

test('::values w/ default keys value', function (t) {
  var result = _.values(o);

  t.ok(result.indexOf(o.a) > -1, 'Key "a"\'s value found');
  t.ok(result.indexOf(o.b) > -1, 'Key "b"\'s value found');
  t.end();
});

test('::values w/ chosen order', function (t) {
  t.deepEqual(
    _.values(o, ['b', 'a']),
    [o.b, o.a],
    '"b" given back first, "a" second'
  );

  t.end();
});

test('::except', function (t) {
  t.equal(
    _.except(['b'], o),
    { a: 1 },
    'Only "a" prop left'
  );

  t.end();
});
