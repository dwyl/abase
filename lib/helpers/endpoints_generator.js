var routeGenerator = require('./route_generator.js');

/**
* @param {object}
* @return {array[object]} - return the Hapi routes
*/

module.exports = function(endpoints, html) {
  var routes = [];
  Object.keys(endpoints).forEach(function(endpoint_name) {
    var page = endpoints[endpoint_name];
    var methods = page.edit ? ['GET', 'POST'] : ['GET'];
    methods.forEach(function(method) {
      routes.push(routeGenerator(endpoint_name, page, method, html));
    });
  });
  return routes;
};
