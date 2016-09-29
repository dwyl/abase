'use strict';

var renderPage = require('../render/render.js');
var processPayload = require('../payload/process.js');

module.exports = function (page, method, pool) {
  return function (request, reply) {
    if (method === 'GET') {
      renderPage(page, request, pool, function (err, html) {
        if (err) {
          return reply(err).code(500);
        }

        return reply(html);
      });
    } else if (method === 'POST') {
      processPayload(request, reply, page, pool);
    }
  };
};
