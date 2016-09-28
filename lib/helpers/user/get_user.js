'use strict';

var users = require('../../../users.json');

module.exports = function (idUser) {
  var result;

  users.forEach(function (user) {
    if (Number(user.id) === idUser) {
      result = user;
    }
  });

  return result;
};
