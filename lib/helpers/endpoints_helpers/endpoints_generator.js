'use strict';

var routeGenerator = require('./route_generator.js');

module.exports = function (schema, pool) {
  var endpoints = schema.pages || {};
  var routes = [];

  Object.keys(endpoints).forEach(function (endpointName) {
    var page = endpoints[endpointName];

    routes = routes.concat(routeGenerator(page, pool, schema));
  });

  return routes;
};
