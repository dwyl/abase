'use strict';

var mapObj = {
  number: function (opts) {
    return opts.integer ? 'BIGINT' : 'DOUBLE PRECISION';
  },
  string: function (opts, name) {
    var length = opts.max || 80;
    var willBeHashed = name === 'password';

    if (willBeHashed) {
      length = 60; // http://stackoverflow.com/questions/5881169/what-column-type-length-should-i-use-for-storing-a-bcrypt-hashed-password-in-a-d
    }

    return 'VARCHAR(' + length + ')';
  },
  boolean: function () {
    return 'BOOLEAN';
  },
  date: function (opts) {
    return opts.timestamp ? 'TIMESTAMP' : 'DATE';
  }
};

function mapper (name, type, options) {
  var opts = options || {};
  var constraints = '';

  if (opts.unique) {
    constraints += ' CONSTRAINT ' + name + '_unique UNIQUE';
  }

  return name + ' ' + mapObj[type](opts, name) + constraints;
}

module.exports = mapper;
module.exports.mapObj = mapObj;
