'use strict';

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    console.log('getWelcomeMessage');
    return 'Welcome to Strapi 🚀';
  },
});
