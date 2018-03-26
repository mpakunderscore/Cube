let gpio = require('./gpio');

let timer = require('./timer');

let rtsp = require('rtsp-ffmpeg');


let uri = 'rtsp://192.168.0.196/unicast';

let rtspStream = new rtsp.FFMpeg({
    input: uri,
    rate: 10, // output framerate (optional)
    resolution: '320x240', // output resolution in WxH format (optional)
    quality: 3 // JPEG compression quality level (optional)});
});


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

module.exports = function (io) {

    streamCamera(io);

    let module = {};

    io.on('connection', (socket) => {

        console.log('connect: ' + socket.id);

        // console.log(map);

        socket.emit('state', JSON.stringify(gpio.pins));

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

        socket.on('add', () => {});

        socket.on('set', () => {});

        // socket.on('disconnect', () => {});
    });

    exports.broadcastState = function (id) {

        io.sockets.emit('state', JSON.stringify(gpio.pins));

        broadcastLogState(id);
    };

    exports.broadcastTime = function (time) {

        io.sockets.emit('time', time);
    };

    let broadcastLogState = function (id) {

        io.sockets.emit('log', id + ' ' + gpio.pins[id].pid + ' ' + gpio.pins[id].state);
    };

    exports.broadcastLog = function (text) {

        io.sockets.emit('log', text);
    }

    return module;
};


