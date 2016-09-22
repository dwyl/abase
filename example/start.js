var server = require('./server');
var hoek = require('hoek');

server.init(process.env.PORT || 8000, function (err, server) {

  hoek.assert(!err, err);
  console.log('The server is running on: ', server.info.uri);
});
