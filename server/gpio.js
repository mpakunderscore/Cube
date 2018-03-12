let data = require('./data.js');

// let Gpio = require('onoff').Gpio;

let pins = {};

exports.pins = pins;

// https://www.npmjs.com/package/onoff

for (let i in data.gpioState) {

    let id = data.gpioState[i].id;

    pins[id] = data.gpioState[i];

    continue;

    pins[id].interface = !data.gpioState[i].type ? new Gpio(pins[id].pid, 'out') : new Gpio(pins[id].pid, 'in', 'both');

    if (data.gpioState[i].type) {

        pins[id].interface.watch(function (err, value) {
            console.log(data.gpioState[i].id + ' | ' + data.gpioState[i].pid + ' | ' + value);
        })

    } else {
        pins[id].interface.writeSync(1);
    }
}