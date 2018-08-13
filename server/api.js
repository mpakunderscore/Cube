let gpio = require('./gpio');

let timer = require('./timer');

let request = require('request');

// camera stream

let rtsp = require('rtsp-ffmpeg');

let uri = 'rtsp://192.168.0.196/unicast';

let rtspStream = new rtsp.FFMpeg({
    input: uri,
    rate: 10, // output framerate (optional)
    resolution: '320x240', // output resolution in WxH format (optional)
    quality: 3 // JPEG compression quality level (optional)});
});

// we give out socket io stream with images

function streamCamera(io) {

    let cameraStream = io.of('/camera1');

    cameraStream.on('connection', function(socket) {

        console.log('connected to /camera1');

        let pipeStream = function(data) {
            socket.emit('data', data);
        };

        rtspStream.on('data', pipeStream);

        socket.on('disconnect', function() {

            console.log('disconnected from /camera1');
            rtspStream.removeListener('data', pipeStream);
        });
    });
}

//

module.exports = function (io) {

    streamCamera(io);

    let module = {};

    io.on('connection', (socket) => {

        console.log('connect: ' + socket.id);

        // console.log(map);

        socket.emit('state', JSON.stringify(gpio.pins));

        socket.emit('total', timer.getTotal());

        socket.on('switch', (id) => {

            gpio.pins[id].state = !gpio.pins[id].state;

            gpio.changeInterface(id);

            exports.broadcastState(id);
        });

        socket.on('start', () => {
            timer.startGame();
        });

        socket.on('reset', () => {
            timer.resetGame();
        });

        socket.on('add', (t) => {
            timer.addTime(t);
            socket.emit('total', timer.getTotal());
        });

        socket.on('set', (t) => {
            timer.setTime(t);
            socket.emit('total', timer.getTotal());
        });
        // socket.on('disconnect', () => {});
    });

    exports.broadcastState = function (id) {

        io.sockets.emit('state', JSON.stringify(gpio.pins));

        if (typeof id !== 'undefined')
            broadcastLogState(id);
    };

    exports.broadcastTime = function (time) {

        io.sockets.emit('time', time);

        // sendLogToCloud(getTime(), time);
    };

    let broadcastLogState = function (id) {

        exports.broadcastLog('(' + id + ', ' + gpio.pins[id].pid + ') ' + ' - ' + gpio.pins[id].name + ' - ' +

            (gpio.pins[id].type ? (gpio.pins[id].state ? '<b>ON</b>' : 'OFF') : (gpio.pins[id].state ? '<b>YES</b>' : 'NO')))
    };

    exports.broadcastLog = function (text) {

        io.sockets.emit('log', getTime() + ' ' + text);

        sendLogToCloud(getTime(), text);
    };

    return module;
};

function sendLogToCloud(time, text) {

    // console.log(text);

    let url = '/upload';
    let options = {
        method: 'post',
        body: {time: time, text: text},
        json: true,
        url: url
    };

    request(options, function (error, response, body) {

        // console.log(response)
    });
}

function getTime() {

    let now;

    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);

    now = h + ":" + m + ":" + s;

    return now;
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

