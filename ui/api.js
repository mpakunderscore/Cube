const port = 8080;
const ip = 'http://localhost:' + port;

let socket = io(ip, {secure: false});

socket.on('state', (state) => {
    gpioState = JSON.parse(state);
    initGPIO();
});