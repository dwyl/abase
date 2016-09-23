var handlerGenerator = require('./handler_generator.js');

module.exports = function(endpoint_name, page, method) {
  var path = page.path ? page.path : '/' + endpoint_name;
  return {
    path: path,
    method: method,
    config: { handler: handlerGenerator(endpoint_name, page) }
  }
}