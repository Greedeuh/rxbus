const Rx = require('rxjs');
const p = require('./privateInterface.js');

function from(amqp, channel){

    const bus = p.makeBus(amqp);
    const queue = p.makeQueue(bus, channel);
    const observable = Rx.Observable.create((observer)=>{
        p.bind(observer, queue);
    });
    
    return observable;
}

function to(amqp, channel, observable){
    if(!p.checkChannel(channel))
        throw Error("param channel is : " + typeof channel + " but should be a string");
    if(!p.checkObservable(observable))
        throw Error("param observable is : " + typeof observable + " but should be an Observable");

    const bus = p.makeBus(amqp);
    observable.subscribe(value=>{
        p.publish(bus, channel, value);
    });

}

module.exports = {
    from : from,
    to: to
}