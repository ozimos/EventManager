/* eslint no-global-assign: off */
require = require('@std/esm')(module);
require('@babel/register');
module.exports = require('./config.js').default;
