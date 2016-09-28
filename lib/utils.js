'use strict';

exports.values = function (obj, keys) {
  return (keys || Object.keys(obj))
    .map(function (k) { return obj[k] });
};

exports.except = function (fields, obj) {
  var o = {};

  Object.keys(obj).forEach(function (k) {
    if (fields.indexOf(k) === -1) {
      o[k] = obj[k];
    }
  });

  return o;
};
