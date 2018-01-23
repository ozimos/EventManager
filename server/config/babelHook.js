require('@babel/register')({
  plugins: [
    'add-module-exports'
  ]
});
module.exports = require('./config.js');