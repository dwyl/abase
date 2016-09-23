'use strict';

exports.register = function (server, options, next) {
  next();
};

exports.register.attributes = {
  pkg: {
    name: 'Abase'
  }
};
