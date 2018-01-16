/* eslint no-global-assign: off */
require = require('@std/esm')(module);
module.exports = require('./server/app.js').default;
