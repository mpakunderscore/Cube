let rtsp = require('rtsp-ffmpeg');

let email = require('./email');

exports.sendPhoto = function () {

    let uri = 'rtsp://192.168.0.196/unicast';

    let rtspStream = new rtsp.FFMpeg({
        input: uri,
        rate: 10, // output framerate (optional)
        resolution: '320x240', // output resolution in WxH format (optional)
        quality: 3 // JPEG compression quality level (optional)});
    });

    let pipeStream = function (data) {

        email.send(data);
        rtspStream.removeListener('data', pipeStream);
    };

    rtspStream.on('data', pipeStream);
};