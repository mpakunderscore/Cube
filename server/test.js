// let Omx = require('node-omxplayer');
//
// // Create an instance of the player with the source.
// let player = Omx('../sounds/scary.mp3', 'local', 100);
//
// player.play();

// Control video/audio playback.
// player.pause();
// player.volUp();
// player.quit();

var OMXPlayer = require('omxplayer');


let configuration = {};
let omxplayer = new OMXPlayer(configuration);

omxplayer.start('../sounds/scary.mp3', function(error) {
});

omxplayer.on("prop:position", function(newPosition) {

});