module.exports = function (server, options, next) {
  console.log(options);

  next();
};

module.exports.attributes = {
  name: 'Abase'
};
