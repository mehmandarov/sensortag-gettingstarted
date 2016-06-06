/*
    SensorTag IR Temperature sensor example
    This example uses Sandeep Mistry's sensortag library for node.js to
    read data from a TI sensorTag.
    The sensortag library functions are all asynchronous and there is a
    sequence that must be followed to connect and enable sensors.
      To connect:
        1) discover the tag
        2) connect to and set up the tag
      To activate sensor:
        3) turn on the sensor you want to use (in this case, IR temp)
        4) turn on notifications for the sensor
        5) listen for changes from the sensortag
*/
var SensorTag = require('sensortag');

var log = function(text) {
  if(text) {
    console.log(text);
  }
}

// Connect to sensortag device. It's address is printed on the inside of the red sleeve (replace the one below).
var connected = new Promise((resolve, reject) => SensorTag.discoverByAddress("b0:b4:48:c3:5a:03", (tag) => resolve(tag)))
  .then((tag) => new Promise((resolve, reject) => tag.connectAndSetup(() => resolve(tag))));

// Enable the sensors you need. For a list of available sensors, and other functions, see https://github.com/sandeepmistry/node-sensortag.
// For each sensor enable it and activate notifications.
// Remember that the tag object must be returned to be able to call then on the sensor and register listeners.
var sensor = connected.then(function(tag) {
  log("connected");

  tag.enableIrTemperature(log);
  tag.notifyIrTemperature(log);

  tag.enableHumidity(log);
  tag.notifyHumidity(log);

  tag.enableGyroscope(log);
  tag.notifyHumidity(log);
  return tag;
});

//------------------------------------------------------------------------------
// Register listeners on the sensor.
// You can register multiple listeners per sensor.
//

// A simple example of an act on the humidity sensor.
var prev = 0;
sensor.then(function(tag) {
  tag.on("humidityChange", function(temp, humidity){
    if(prev < 35 && humidity > 35) {
      log("Don't slobber all over the SensorTag please...");
    }
    prev = humidity;
  });
});

// A simple example of an act on the irTemperature sensor.
sensor.then(function(tag) {
  tag.on("irTemperatureChange", function(objectTemp, ambientTemp) {
    if(objectTemp > 25) {
      log("You're so hot");
    }
  })
});

//------------------------------------------------------------------------------
// Configure periods for sensor reads. The registered listeners will be invoked
// with the specified interval.
sensor.then(function(tag) {
  tag.setIrTemperaturePeriod(3000, log);
});
