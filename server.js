let express = require('express');

let app = express();

app.use('/', express.static(__dirname));

let server = require('http').Server(app);

let io = require('socket.io')(server);

const socketPort = 8080;

server.listen(socketPort, () => console.log('socket listening on: ' + socketPort));

let api = require('./server/api')(io);