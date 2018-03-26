const port = 8080;
const ip = 'localhost:' + port;

const remote = 'http://raspberrypi.local:8080/';

let socket;

function initSocket() {

    socket = io(remote, {'forceNew': true});

    socket.on('connect', function() {
        console.log('connect');
        log('connect');
    });

    socket.on('disconnect', function(){
        console.log('disconnect');
        gpioState = {};
        renderGPIO();
        log('disconnect');
    });

    socket.on('state', (state) => {
        gpioState = JSON.parse(state);
        renderGPIO();
    });

    socket.on('log', (text) => {
        console.log(text);
        log(text);
    });

    socket.on('time', (time) => {
        console.log(time);
        // log(time);
        $('#current').text(fromSec(time));
    });
}

function switchPIN(id) {
    socket.emit('switch', id);
}

function startGame() {
    socket.emit('start', null);
}

function resetGame() {
    socket.emit('reset', null);
}

