'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('golfbox-api')
      .service('myService')
      .getWelcomeMessage();
  },
});
