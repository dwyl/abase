'use strict';

module.exports = {
  int: function () {
    return 'BIGINT';
  },
  text: function (opts) {
    var length = opts.length || 80;

    return 'VARCHAR(' + length + ')';
  },
  bool: function () {
    return 'BOOLEAN';
  },
  date: function () {
    return 'DATE';
  },
  float: function () {
    return 'DOUBLE PRECISION';
  },
  timestamp: function () {
    return 'TIMESTAMP';
  }
};
