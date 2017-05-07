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

module.exports = {
    from : from
}