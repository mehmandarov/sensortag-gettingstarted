# MySensorTag

Exmaples using Node.js library [node-sensortag][1] for [TI SensorTag][2]. 

Some of the examples are based on [Bluetooth LE examples for sensorTag][3] by Tom Igoe.

## Installation

See [prerequisites][4] and [install][5].

## Getting Started

Sensortag library functions are asynchronous. There is a sequence you need to follow in order to successfully read data from a tag:

1. Discover the tag
2. Connect to and set up the tag
3. Turn on the sensor you want to use (in this case, accelerometer)
4. Turn on notifications for the sensor
5. Listen for changes from the sensortag


[1]: https://github.com/sandeepmistry/node-sensortag
[2]: http://www.ti.com/ww/en/wireless_connectivity/sensortag2015/
[3]: https://github.com/tigoe/BluetoothLE-Examples/tree/master/sensorTag
[4]: https://github.com/sandeepmistry/node-sensortag#prerequisites
[5]: https://github.com/sandeepmistry/node-sensortag#install