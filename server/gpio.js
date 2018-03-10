let Gpio = require('onoff').Gpio;

// https://www.npmjs.com/package/onoff

// In addition to specifying that the button is an input,
// the constructors optional third argument is used to specify that 'both'
// rising and falling interrupt edges should be configured for the button GPIO
// as both button presses and releases should be handled.

//PID or GPIO green on PINS image
let gpio4 = new Gpio(4, 'in', 'both');
let gpio5 = new Gpio(5, 'out');
let gpio6 = new Gpio(6, 'out');

let gpio12 = new Gpio(12, 'out');
let gpio13 = new Gpio(13, 'out');

let gpio16 = new Gpio(16, 'out');

let gpio17 = new Gpio(17, 'in', 'both');
let gpio18 = new Gpio(18, 'in', 'both');

let gpio19 = new Gpio(19, 'in', 'both');
let gpio20 = new Gpio(20, 'in', 'both');
let gpio21 = new Gpio(21, 'in', 'both');
let gpio22 = new Gpio(17, 'out');
let gpio23 = new Gpio(17, 'out');
let gpio24 = new Gpio(17, 'out');
let gpio25 = new Gpio(17, 'out');
let gpio26 = new Gpio(17, 'out');
let gpio27 = new Gpio(17, 'out');


button.watch(function(err, value) {

    led.writeSync(value);
});

module.exports = Gpio;