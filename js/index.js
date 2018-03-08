// let Gpio = require('onoff').Gpio,
//
//     led = new Gpio(17, 'out'),
//     button = new Gpio(4, 'in', 'both');
//
// button.watch(function(err, value) {
//
//     led.writeSync(value);
// });

// module.exports = Gpio;

let tabs = ['game', 'gpio', 'scenario', 'scheme', 'logs', 'pins', 'sounds'];

function tab(id) {

    console.log(id)

    if (tabs.indexOf(id) < 0) {

        tabs.push(id);
        $("#" + id).css('display', 'block');

        console.log('Show: ' + id);

    } else {

        tabs.splice(tabs.indexOf(id), 1);

        $("#" + id).css('display', 'none');

        console.log('Hide: ' + id);

    }

    console.log(tabs)
}

function img(id) {
    // $(id).css('min-height', '10%');
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startTime() {

    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('date').innerHTML = h + ":" + m + ":" + s;
    t = setTimeout(function() {
        startTime()
    }, 500);
}
startTime();