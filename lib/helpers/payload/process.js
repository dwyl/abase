'use strict';

var createUser = require('../user/create_user.js');
var updateUser = require('../user/update_user.js');

module.exports = function (request, reply, page) {
  if (page.type === 'login') {
    return reply.redirect('/').state('cookie', 'newvalue');
  }

  if (page.type === 'signup') {
    createUser(request.payload);

    return reply.redirect('/user/list');
  }

  if (page.type === 'user_edit') {
    updateUser(request.payload);

    return reply.redirect('/user/detail/' + request.params.id_user);
  }

  return reply.redirect('/404');
};
