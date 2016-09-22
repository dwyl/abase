var handlerGenerator = require('./handler_generator.js');
module.exports = function(config) {
  return Object.keys(config.pages).map(function(page) {
    return {
      path: config.pages[page].path || '/' + page,
      method: 'GET',
      config: { handler: handlerGenerator() }
    }
  })
}
