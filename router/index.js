const authorization = require('./authorization');
const proxy = require('express-http-proxy');
const config = require('config');
const dataAccessConfig = require('../data-access-config');

console.log(config.get('data_server_address'));

const buildRouter = (app) => {
  app.use('/authorization', authorization);

  app.use('/api', proxy(config.get('data_server_address'), {
    https: true,
    proxyReqPathResolver: function(req) {
      const uri = '/api' + require('url').parse(req.url).path
      return uri;
    }
  }))
};

module.exports = {buildRouter};