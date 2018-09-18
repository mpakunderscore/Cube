let api = require('./api');

let Omx = require('node-omxplayer');

let sounds = [];

exports.play = function (name) {

    api.broadcastLog('play ' + name);

    // let configuration = {};
    // let omxplayer = new OMXPlayer(configuration);
    // omxplayer.start('/home/pi/cube/sounds/' + name, function (error) {});

    let omxplayer = Omx('/home/pi/cube/sounds/' + name);
    sounds.push(omxplayer);
};

exports.stop = function () {

    console.log("sounds length " + sounds.length);

    for (let i = 0; i < sounds.length; i++) {

        if (sounds[i].running)
            sounds[i].quit();
    }

    sounds = [];
};

// let configuration = {};
// let omxplayer = new OMXPlayer(configuration);
// omxplayer.start('/home/pi/cube/sounds/ufo.mp3', function (error) {});
