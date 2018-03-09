let Gpio = require('onoff').Gpio;

//PID or GPIO green on PINS image
let gpio17 = new Gpio(17, 'out');
let gpio4 = new Gpio(4, 'in', 'both');

button.watch(function(err, value) {

    led.writeSync(value);
});

module.exports = Gpio;