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

    socket.on('sound', (message) => {});

    socket.on('disconnect', () => {});
});

gpio.broadcasts = io.broadcast.emit('state', JSON.stringify(gpio.pins));


