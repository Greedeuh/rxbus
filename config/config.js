const env = require('common-env')();
module.exports = env.getOrElseAll({
  amqp: {
    host: "amqp://192.168.99.100"
  }
});