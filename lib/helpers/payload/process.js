var createUser = require('../user/create_user.js');
var updateUser = require('../user/update_user.js');

module.exports = function(request, reply, page) {
  if (page.type === 'login') {
    console.log('login ok, cookie created');

    return reply.redirect('/').state('cookie', 'newvalue');
  }

  if (page.type === 'signup') {
    var users = createUser(request.payload);
    console.log('create new user in database');
    console.log('an email has been sent to your email address, please confirm your account');
    return reply.redirect('/user/list');
  }

  if (page.type === 'user_edit') {
    var users = updateUser(request.payload);
    console.log('user updated');
    return reply.redirect('/user/detail/' + request.params.id_user);
  }

}