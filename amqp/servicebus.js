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

function publish(bus, channel, value){
    bus.publish(channel, value);
}

module.exports = {
    makeBus: makeBus,
    makeQueue: makeQueue,
    publish: publish
}