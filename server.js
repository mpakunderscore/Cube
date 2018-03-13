let express = require('express');

let gpio = require('./server/gpio');

let app = express();

app.use('/', express.static(__dirname));

let server = require('http').Server(app);

let io = require('socket.io')(server);

const socketPort = process.env.PORT || 8080;

server.listen(socketPort, () => console.log('socket listening on: ' + socketPort));

io.on('connection', (socket) => {

    console.log('connect: ' + socket.id);

    // console.log(map);

    socket.emit('state', JSON.stringify(gpio.pins));

    socket.on('switch', (id) => {

        gpio.pins[id].state = !gpio.pins[id].state;

        gpio.pins[id].interface.writeSync(gpio.pins[id].state ? 1 : 0);

        broadcast(gpio.pins);
    });

    socket.on('disconnect', () => {});
});

function broadcast(pins) {
    io.sockets.emit('state', JSON.stringify(pins));
}

gpio.broadcast = broadcast;