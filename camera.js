let express = require('express');

let app = express();

app.use('/', express.static(__dirname));

let server = require('http').Server(app);

let io = require('socket.io')(server);

const socketPort = 8080;

server.listen(socketPort, () => console.log('socket listening on: ' + socketPort));

let email = require('./server/email');

let rtsp = require('rtsp-ffmpeg');

let uri = 'rtsp://192.168.0.196/unicast';

let rtspStream = new rtsp.FFMpeg({
    input: uri,
    rate: 10, // output framerate (optional)
    resolution: '320x240', // output resolution in WxH format (optional)
    quality: 3 // JPEG compression quality level (optional)});
});

// we give out socket io stream with images

let pipeStream = function(data) {

    console.log('send')
    email.send(data);
};

rtspStream.on('data', pipeStream);
