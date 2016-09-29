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

function successiveHash (saltNumber, data, cb) {
  return function hashStep (hashed, hashQueue) {
    var toBeHashed = hashQueue.pop();

    if (typeof toBeHashed === 'undefined') {
      return cb(null, hashed);
    }

    return bcrypt.hash(data[toBeHashed], saltNumber, function (err, hash) {
      if (err) {
        return cb(err);
      }
      hashed[toBeHashed] = hash;

      return hashStep(hashed, hashQueue);
    });
  };
}

module.exports = function (config, data, cb) {
  var hashQueue = Object.keys(data).reduce(addToQueue(config), []);
  var hashed = except(hashQueue, data);
  var saltNumber = config.salt_number || 10;

  return successiveHash(saltNumber, data, cb)(hashed, hashQueue);
};
