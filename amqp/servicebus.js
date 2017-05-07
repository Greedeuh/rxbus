const servicebus = require('servicebus');


function makeBus(amqp){
    return bus = servicebus.bus({url: amqp});
}

function makeQueue(bus, channel){
    const listen = (callback) => {
        bus.listen(channel, callback);
    }
    return { listen:listen };
}

module.exports = {
    makeBus: makeBus,
    makeQueue: makeQueue 
}