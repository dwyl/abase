var renderPage = require('../render/render.js');
var processPayload = require('../payload/process.js');

module.exports = function (page, method) {
  return function (request, reply) {
    if (method === 'GET') {
      var htmlRender = renderPage(page, request);
      return reply(htmlRender);
    } else if (method === 'POST') {
      return processPayload(request, reply, page);
    }
  };
};
