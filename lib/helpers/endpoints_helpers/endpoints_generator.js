'use strict';

var routeGenerator = require('./route_generator.js');

module.exports = function (endpoints) {
  var endpoints = pages || {};
  var routes = [];

  Object.keys(endpoints).forEach(function (endpointName) {
    var page = endpoints[endpointName];

    routes = routes.concat(routeGenerator(page));
  });

  return routes;
};
