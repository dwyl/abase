var createContent = require('./html_transform/create_content.js');

module.exports = function (endpoint_name, page, method, html) {
  var path = page.path ? page.path : '/' + endpoint_name;

  var content = createContent(path, page.contents, html);

  return function (request, reply) {
    if (method === 'GET') {
      return reply(content);
    } else if (method === 'POST') {
      return reply('POST request for ' + endpoint_name);
    }
  };
};
