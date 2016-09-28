'use strict';

var test = require('tape');
var _ = require('../lib/utils.js');

test('::values w/ default keys value', function (t) {
  var o = {
    a: 1, b: 2
  };
  var result = _.values(o);

  t.equal(result[0], o.a, 'Key "a" matches');
  t.equal(result[1], o.b, 'Key "b" matches');
  t.end();
});
