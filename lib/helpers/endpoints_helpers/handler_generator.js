'use strict';

var renderPage = require('../render/render.js');
var processPayload = require('../payload/process.js');

module.exports = function (page, method) {
  return function (request, reply) {
    if (method === 'GET') {
      reply(renderPage(page, request));
    } else if (method === 'POST') {
      processPayload(request, reply, page);
    }
  };
};
