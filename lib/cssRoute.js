'use strict';

var path = require('path');

module.exports = {
  method: 'GET',
  path: '/resources/style.css',
  handler: function (request, reply) {
    reply.file(path.join(__dirname, 'style.css'));
  }
};
