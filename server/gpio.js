let data = require('./data');

let Gpio = require('onoff').Gpio;

// exports.broadcast = function (pins) {
//     console.log('old exports.broadcast')
// };

let pins = {};
exports.pins = pins;

// module.exports.pins = pins;

// https://www.npmjs.com/package/onoff

for (let i in data.gpioState) {

    let id = data.gpioState[i].id;

    pins[id] = data.gpioState[i];

    pins[id].interface = pins[id].type ? new Gpio(pins[id].pid, 'out') : new Gpio(pins[id].pid, 'in', 'both');

    if (!pins[id].type) {

        pins[id].interface.watch(function (err, value) {

            pins[id].state = (value === 1);

            console.log(pins[id].id + ' | ' + pins[id].pid + ' | ' + value + ' | ' + pins[id].state);

            exports.broadcast(pins);
        })

    } else {
        console.log(pins[id]);
        pins[id].interface.writeSync(pins[id].state ? 1 : 0);
    }
}