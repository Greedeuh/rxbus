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

function publish(bus, channel, value){
    lib.publish(bus, channel, value);
}

function checkObservable(observable){
    if(typeof observable === "observable")
        return true;
    else
        return false;
}

function checkChannel(channel){
    if(typeof channel === "string")
        return true;
    else
        return false;
}

module.exports = {
    bind: bind,
    makeBus: makeBus,
    makeQueue: makeQueue,
    publish: publish,
    checkObservable: checkObservable,
    checkChannel: checkChannel

}