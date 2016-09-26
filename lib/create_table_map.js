'use strict';

var mapObj = {
  int: function () {
    return 'BIGINT';
  },
  text: function (opts) {
    var length = (opts && opts.length) || 80;

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

function mapper (name, type, options) {
  return name + ' ' + mapObj[type](options);
};

module.exports = mapper;
module.exports.mapObj = mapObj;
