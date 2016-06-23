# MySensorTag

Examples using Node.js library [node-sensortag][1] for [TI SensorTag][2]. 

Some of the examples are based on [Bluetooth LE examples for sensorTag][3] by Tom Igoe.

## Installation

* [Prerequisites][4] 
* [Install][5]
* [Upgrade NodeJS via NPM][8]
* [Raspberry Pi requirements][7] Note that you simply need the bluetooth libraries, not the node-RED specific stuff.

## Getting Started

Sensortag library functions are asynchronous. There is a sequence you need to follow in order to successfully read data from a tag:

1. Discover the tag
2. Connect to and set up the tag
3. Turn on the sensor you want to use
4. Turn on notifications for the sensor
5. Listen for changes from the sensortag

## Documentation

Full package documentation can be found on [node-sensortag homepage][6].


[1]: https://github.com/sandeepmistry/node-sensortag
[2]: http://www.ti.com/ww/en/wireless_connectivity/sensortag2015/
[3]: https://github.com/tigoe/BluetoothLE-Examples/tree/master/sensorTag
[4]: https://github.com/sandeepmistry/node-sensortag#prerequisites
[5]: https://github.com/sandeepmistry/node-sensortag#install
[6]: https://github.com/sandeepmistry/node-sensortag#usage
[7]: https://www.npmjs.com/package/node-red-node-sensortag
[8]: https://davidwalsh.name/upgrade-nodejs
