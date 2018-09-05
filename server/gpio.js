let data = require('./data');

let scenario = require('./scenario');

let api = require('./api');

let Gpio = require('onoff').Gpio;

exports.pins = {};

exports.resetGPIO = function () {

    for (let i in exports.pins) {

        if (exports.pins[i].type)
            exports.pins[i].state = data.gpioState[i].state;

        if (exports.pins[i].type) {
            exports.pins[i].interface.writeSync(exports.pins[i].state ? 0 : 1);
        }
    }
}

exports.initGPIO = function () {

    api.broadcastLog('init gpio')

    // exports.pins = {};

    for (let i in data.gpioState) {

        let id = data.gpioState[i].id;

        exports.pins[id] = {};

        exports.pins[id].id = data.gpioState[i].id;

        exports.pins[id].pid = data.gpioState[i].pid;

        exports.pins[id].name = data.gpioState[i].name;

        exports.pins[id].type = data.gpioState[i].type;

        exports.pins[id].state = data.gpioState[i].state;

        exports.pins[id].interface = exports.pins[id].type ? new Gpio(exports.pins[id].pid, 'out') : new Gpio(exports.pins[id].pid, 'in', 'both');

        if (!exports.pins[id].type) {

            exports.pins[id].interface.watch(function (err, value) {

                if (exports.pins[id].state === null)
                    return;

                exports.pins[id].state = (value === 0);

                api.broadcastState(id);

                // console.log(exports.pins[id].id + ' | ' + exports.pins[id].pid + ' | ' + value + ' | ' + exports.pins[id].state);

                scenario.checkScenario();
            })

        } else {

            // console.log(exports.pins[id]);
            exports.pins[id].interface.writeSync(exports.pins[id].state ? 0 : 1);
        }
    }
};

exports.changeInterface = function (id) {
    console.log('changeInterface: ' + id);
    exports.pins[id].interface.writeSync(exports.pins[id].state ? 0 : 1);
};
