// const player = require('play-sound')(opts = {})

let api = require('./api');

// let Omx = require('node-omxplayer');

var OMXPlayer = require('omxplayer');

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

omxplayer.start('/home/pi/cube/sounds/' + 'ufo.mp3', function(error) {});




