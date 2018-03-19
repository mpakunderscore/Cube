let data = require('./data');

let scenario = require('./scenario');

let api = require('./api');

let Gpio = require('onoff').Gpio;

let pins = {};
exports.pins = pins;

for (let i in data.gpioState) {

    let id = data.gpioState[i].id;

    pins[id] = data.gpioState[i];

    pins[id].interface = pins[id].type ? new Gpio(pins[id].pid, 'out') : new Gpio(pins[id].pid, 'in', 'both');

    if (!pins[id].type) {

        pins[id].interface.watch(function (err, value) {

            pins[id].state = (value === 1);

            api.broadcastState(id);

            // console.log(pins[id].id + ' | ' + pins[id].pid + ' | ' + value + ' | ' + pins[id].state);

            scenario.checkScenario();
        })

    } else {

        console.log(pins[id]);

        pins[id].interface.writeSync(pins[id].state ? 1 : 0);
    }
}

exports.changeInterface = function (id) {
    pins[id].interface.writeSync(pins[id].state ? 1 : 0);
}