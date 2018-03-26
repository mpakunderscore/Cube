let gpio = require('./gpio');

let timer = require('./timer');

module.exports = function (io) {

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

        socket.on('disconnect', () => {});
    });

    exports.broadcastState = function (id) {

        io.sockets.emit('state', JSON.stringify(gpio.pins));

        broadcastLogState(id);
    };

    exports.broadcastTime = function (time) {

        io.sockets.emit('time', time);
    };

    let broadcastLogState = function (id) {

        io.sockets.emit('log', id + ' ' + gpio.pins[id].pid + ' state to ' + gpio.pins[id].state);
    };

    exports.broadcastLog = function (text) {

        io.sockets.emit('log', text);
    }

    return module;
};


