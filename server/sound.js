let api = require('./api');

let OMXPlayer = require('omxplayer');

let sounds = [];

exports.play = function (name) {

    api.broadcastLog('play ' + name);

    let configuration = {};
    let omxplayer = new OMXPlayer(configuration);
    omxplayer.start('/home/pi/cube/sounds/' + name, function (error) {});

    sounds.push(omxplayer);
};

exports.stop = function () {

    for (let i = 0; i < sounds.length; i++) {
        sounds[i].stop();
    }

    sounds = [];
};

// let configuration = {};
// let omxplayer = new OMXPlayer(configuration);
// omxplayer.start('/home/pi/cube/sounds/ufo.mp3', function (error) {});
