var pageToHtml = require('./page_to_html');

module.exports = function (endpoint_name, page, method, html) {
  var path = page.path ? page.path : '/' + endpoint_name;
  return function (request, reply) {
    if (method === 'GET') {
      var content = '<form method="POST" action="' + path + '">';
      page.contents.forEach(function(tag) {
        if (tag.options.confirmation) {
          content += html[tag.field];
        }
        content += html[tag.field];
      });
      content += '<button type="submit">SUBMIT</button></form>';
      return reply(content);
    } else if (method === 'POST') {
      return reply('POST html for ' + endpoint_name);
    }
  };
};
