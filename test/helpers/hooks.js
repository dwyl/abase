/*
 * Test hooks for tape taken from:
 * https://github.com/substack/tape/issues/59#issuecomment-32808769
 */
'use strict';

exports.beforeEach = function (_test, handler) {
  return function tapish (name, listener) {
    _test(name, function (assert) {
      var _end = assert.end;

      assert.end = function () {
        assert.end = _end;
        listener(assert);
      };

      handler(assert);
    });
  };
};

exports.afterEach = function (_test, handler) {
  return function tapish (name, listener) {
    _test(name, function (assert) {
      var _end = assert.end;

      assert.end = function () {
        assert.end = _end;
        handler(assert);
      };

      listener(assert);
    });
  };
};
