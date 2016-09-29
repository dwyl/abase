'use strict';

var createUser = require('../user/create_user.js');
var updateUser = require('../user/update_user.js');
var validateUser = require('../user/validate_user.js');

module.exports = function (request, reply, page, pool) {
  pool.connect(function (cnctError, client, done) {
    var payload;

    if (page.type === 'login') {
      if (cnctError) {
        return reply
          .redirect('/500')
          .unstate('cookie')
          .code(500);
      }

      return validateUser(client, request.payload, function (err, isValid) {
        done(); // eslint-disable-line

        if (err) {
          return reply
            .redirect('/500')
            .unstate('cookie')
            .code(500);
        }

        if (!isValid) {
          return reply.redirect('/').unstate('cookie');
        }

        return reply.redirect('/user/list').state('cookie', 'newvalue');
      });
    }

    if (page.type === 'signup') {
      return createUser(client, request.payload, function (err) {
        if (err) {
          return reply.redirect('/signup');
        }

        return reply.redirect('/user/list');
      });
    }

    if (page.type === 'user_edit') {
      payload = Object.keys(request.payload).reduce(function (acc, curr) {
        if (request.payload[curr] !== '') {
          acc[curr] = request.payload[curr];
        }

        return acc;
      }, {});

      return updateUser(client, payload, function (err) {
        if (err) {
          return reply.redirect('/500').code(500);
        }

        return reply.redirect('/user/detail/' + request.params.id_user);
      });
    }

    return reply.redirect('/404');
  });
};
