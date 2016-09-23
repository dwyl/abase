var pageToHtml = require('./page_to_html');

module.exports = function (endpoint_name, page, method, html) {
  return function (request, reply) {
    if (method === 'GET') {
      var content = '';
      page.contents.forEach(function(tag) {
        if (tag.options.confirmation) {
          content += html[tag.field];
        }
        content += html[tag.field];
      });
      return reply(content);
    } else if (method === 'POST') {
      return reply('POST html for ' + endpoint_name);
    }
  };
};
