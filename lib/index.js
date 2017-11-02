'use strict';

const Assert = require('assert');

exports.register = function (server, options, next) {

  Assert(server.realm.modifiers.route.vhost, 'Must specify one or more vhosts');

  const vhosts = [].concat(server.realm.modifiers.route.vhost);
  const fullHosts = {};
  for (const vhost of vhosts) {
    fullHosts[`www.${vhost}`] = vhost;
  }

  server.ext('onRequest', (request, reply) => {

    if (request.headers.host &&
        fullHosts.hasOwnProperty(request.headers.host)) {

      return reply().header('location', `//${fullHosts[request.headers.host]}${request.raw.req.url}`).code(307);
    }

    return reply.continue();
  });

  return next();
};

exports.register.attributes = {
  pkg: require('../package.json')
};
