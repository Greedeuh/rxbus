const env = require('common-env')();
module.exports = config = env.getOrElseAll({
  a: {
    b: 'localhost'
  }
});