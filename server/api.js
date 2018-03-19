let gpio = require('./gpio');

module.exports = function (io) {

    let module = {};

    io.on('connection', (socket) => {

        console.log('connect: ' + socket.id);

        // console.log(map);

        socket.emit('state', JSON.stringify(gpio.pins));

        socket.on('switch', (id) => {

            gpio.pins[id].state = !gpio.pins[id].state;

            gpio.changeInterface();

            module.broadcastState(id);
        });

        socket.on('start', () => {});

        socket.on('disconnect', () => {});
    });

    module.broadcastState = function (id) {

        io.sockets.emit('state', JSON.stringify(gpio.pins));

        broadcastLogState(id);
    };

    let broadcastLogState = function (id) {
        io.sockets.emit('log', id + ' ' + gpio.pins[id].pid + ' state to ' + gpio.pins[id].state);
    };

    return module;
};


