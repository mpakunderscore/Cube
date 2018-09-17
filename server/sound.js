// const player = require('play-sound')(opts = {})

let api = require('./api');

// let Omx = require('node-omxplayer');

let OMXPlayer = require('omxplayer');

let configuration = {};
let omxplayer = new OMXPlayer(configuration);

// let sounds = ['one']

// const audioPlay = require('audio-play');
// const audioLoad = require('audio-loader');

exports.play = function (name) {

    api.broadcastLog('play ' + name);

    // Create an instance of the player with the source.
    // let player = Omx('./sounds/' + name, 'local', 100);

    // player.play();

    omxplayer.start('/home/pi/cube/sounds/' + name, function(error) {});
};

exports.stop = function () {

    omxplayer.stop();
};

omxplayer.start('/home/pi/cube/sounds/' + 'ufo.mp3', function(error) {});


// let api = require('./api');
//
// let OMXPlayer = require('omxplayer');
//
// exports.play = function (name, volume) {
//
//     if (!volume)
//         volume = 100;
//
//     api.broadcastLog('play ' + name);
//     let configuration = {Volume: volume};
//     let omxplayer = new OMXPlayer(configuration);
//     omxplayer.start('/home/pi/cube/sounds/' + name, function(error) {});
// };
//
// exports.play("ufo.mp3");
// exports.play("ufo.mp3", 50);
//
// let OMXPlayer = require('omxplayer');
// let configuration = {};
// let omxplayer = new OMXPlayer(configuration);
// exports.play = function (name, volume) {
//
//     // omxplayer.setVolume(volume, function(error) {});
//     omxplayer.start('/home/pi/cube/sounds/' + name, {volume: 0}, function(error) {});
// };
// exports.play("ufo.mp3", 0.1);



