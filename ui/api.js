const port = 8080;
const ip = 'localhost:' + port;

const remote = 'http://raspberrypi.local:8080/';

let socket = io(remote);

socket.on('state', (state) => {

    gpioState = JSON.parse(state);
    renderGPIO();
});

function switchPIN(id) {
    socket.emit('switch', id);
}