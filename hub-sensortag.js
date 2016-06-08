var SENSORTAG_ADDRESS = "b0:b4:48:c3:5a:03";
var HUB_ADDRESS = process.argv[2] || 'http://localhost:3000';

var socket = require('socket.io-client')(HUB_ADDRESS);
var SensorTag = require('sensortag');

var log = function(text) {
  if(text) {
    console.log(text);
  }
}

var _sensorData = {
  temp: []
};

var connected = new Promise((resolve, reject) => SensorTag.discoverByAddress(SENSORTAG_ADDRESS, (tag) => resolve(tag)))
  .then((tag) => new Promise((resolve, reject) => tag.connectAndSetup(() => resolve(tag), log)));

var sensor = connected.then(function(tag) {
  log('SensorTag: connected to ' + SENSORTAG_ADDRESS);
  tag.enableIrTemperature(log);
  tag.notifyIrTemperature(log);
  return tag;
});

sensor.then(function(tag) {
  tag.on('irTemperatureChange', function(objectTemp, ambientTemp) {
    _sensorData.temp.push({objectTemp, ambientTemp});
  });
});

socket.on('connect', function () {
    console.log('SensorTag logger: connected to hub ' + HUB_ADDRESS);
});

socket.on('logger:history', function () {
    socket.emit('server:results', _sensorData.temp);
});

socket.on('logger:read', function () {
  socket.emit('server:results', [_sensorData.temp[_sensorData.temp.length - 1]]);
});
