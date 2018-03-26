let api = require('./api');

let gameState = false;
let time = 0;

let totalDefault = 1800;
let totalCurrent = totalDefault;

exports.startGame = function () {

    if (gameState)
        return;

    gameState = true;
    time = 0;

    totalCurrent = totalDefault;

    startGameTime();

    api.broadcastLog('start');
}

function stopGame() {

    api.broadcastLog('stop');

    gameState = false;
}

exports.resetGame = function () {

    stopGame();

    api.broadcastLog('reset');

    time = 0;

    api.broadcastTime(time);
};

function startGameTime() {

    if (gameState) {

        // updateTime();

        // let progress = (time / totalCurrent);

        api.broadcastTime(time);

        setTimeout(function() {
            startGameTime()
        }, 1000);

        time = time + 1;

        if (time > totalCurrent) {

            api.broadcastLog('timeout');

            stopGame();

            return;
        }
    }
}