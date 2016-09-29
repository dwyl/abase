'use strict';

var bcrypt = require('bcrypt');

var except = require('./utils').except;

function addToQueue (config) {
  return function (queue, field) {
    var fieldConfig = config.fields[field];
    var needsHash = fieldConfig.password === true;

    return needsHash ? queue.concat(field) : queue;
  };
}

function successiveHash (data, hashed, hashQueue, cb) {
  var toBeHashed = hashQueue.pop();

  if (typeof toBeHashed === 'undefined') {
    return cb(null, hashed);
  }

  return bcrypt.hash(data[toBeHashed], 10, function (err, hash) {
    if (err) {
      return cb(err);
    }
    hashed[toBeHashed] = hash;

    return successiveHash(data, hashed, hashQueue, cb);
  });
}

module.exports = function (config, data, cb) {
  var hashQueue = Object.keys(data).reduce(addToQueue(config), []);
  var hashed = except(hashQueue, data);

  return successiveHash(data, hashed, hashQueue, cb);
};
