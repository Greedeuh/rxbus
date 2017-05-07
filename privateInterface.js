const Rx = require('rxjs');
const lib = require('./amqp/servicebus');

function bind(observer, queue){
    queue.listen((event)=>{
        observer.next(event);
    });
}

function makeBus(amqp){
    return lib.makeBus(amqp);
}

function makeQueue(bus, channel){
    if(typeof channel === "string")
        return lib.makeQueue(bus, channel);
    else
        throw new Error("Channel is :" + typeof channel + "should be a string");
}

module.exports = {
    bind: bind,
    makeBus: makeBus,
    makeQueue: makeQueue
}