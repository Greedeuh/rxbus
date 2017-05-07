let chai = require('chai');
let Rx = require('rxjs');
let assert = chai.assert;
let rxbus = require('../publicInterface');
let config = require('../config/config');
let servicebus = require("servicebus");
let bus;
let channel;
let servicebusObj;
let i = 0;

beforeEach(()=>{
  bus = config.amqp.host;
  servicebusObj = servicebus.bus({url: bus});
  channel = "test" + i;
  i++;
});


describe('from()', function() {

  it('should return an observable', ()=>{
    const res = rxbus.from(bus, channel);
    assert.instanceOf(res, Rx.Observable);
  });

  it('should throw an error if amqp down', ()=>{
    assert.throw(()=>{ rxbus.from("downIp", channel) }, Error);
  });

  it('should throw an error if channel is not a string', ()=>{
    assert.throw(()=>{ rxbus.from(bus, 1) }, Error);
  });

  it('should return an observable listening on amqp channel', function(done){
    const a = 1;
    const b = "2";
    const c = "bonsoir";
    
    const expect = [a, b, c];
    const res = [];

    const observable = rxbus.from(bus, channel);

    observable.take(3).subscribe(nextVal=>{
      res.push(nextVal);
    }, error=>{
      done(error);
    }, complete=>{
      assert.equal(res[0], expect[0]);
      assert.equal(res[1], expect[1]);
      assert.equal(res[2], expect[2]);
      done();
    });
    
    servicebusObj.send(channel, a);
    servicebusObj.send(channel, b);
    servicebusObj.send(channel, c);

  });

});

describe('to()', function() {
  
  beforeEach(()=>{
    bus = config.amqp.host;
    servicebusObj = servicebus.bus({url: bus});
    channel = "test";
  });

  it("should throw an error if the observable is not an observable", ()=>{

  });

  it("should throw an error if the the channel is not a string", ()=>{
    
  });

  it("should publish on the queue", ()=>{

  });


});