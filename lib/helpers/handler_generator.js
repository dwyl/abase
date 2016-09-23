var pageToHtml = require('./page_to_html');

module.exports = function (endpoint_name, page) {
  return function (request, reply) {
    // var html = pageToHtml(page);
    return reply('html for ' + endpoint_name);
  }
}
