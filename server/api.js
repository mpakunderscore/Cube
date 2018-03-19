let gpio = require('./gpio');

module.exports = function (io) {

    let module = {};

    io.on('connection', (socket) => {

        console.log('connect: ' + socket.id);

        // console.log(map);

        socket.emit('state', JSON.stringify(gpio.pins));

        socket.on('switch', (id) => {

            gpio.pins[id].state = !gpio.pins[id].state;
            gpio.pins[id].interface.writeSync(gpio.pins[id].state ? 1 : 0);

            module.broadcastState(gpio.pins);
            module.broadcastLog(id);
        });

        socket.on('start', () => {
        }

        socket.on('start', () => {
        }

        socket.on('disconnect', () => {});
    });

    module.broadcastState = function () {
        io.sockets.emit('state', JSON.stringify(gpio.pins));
    }

    module.broadcastLog = function (id) {
        io.sockets.emit('log', id + ' ' + gpio.pins[id].pid + ' state to ' + gpio.pins[id].state);
    }

    return module;
};


