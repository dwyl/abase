var routeGenerator = require('./route_generator.js');

module.exports = function(endpoints) {
  var routes = [];
  Object.keys(endpoints).forEach(function(endpoint_name) {
    var page = endpoints[endpoint_name];
    routes = routes.concat(routeGenerator(page));
  });
  return routes;
};
