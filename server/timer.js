let api = require('./api');

let gpio = require('./gpio');

let scenario = require('./scenario');

let camera = require('./camera');

let sound = require('./sound');

let gameState = false;
let time = 0;

let totalDefault = 900;
let totalCurrent = totalDefault;

let photoTime = 240;

exports.getState = function () {
    return gameState;
};

exports.getTotal = function () {
    return totalCurrent;
};

exports.startGame = function () {

    if (gameState)
        return;

    gpio.resetGPIO();

    api.broadcastState();

    if (!scenario.startScenario()) {
        api.broadcastLog('Игра не собрана. Запустить квест?');
        return;
    }

    gameState = true;
    time = 0;

    totalCurrent = totalDefault;

    startGameTime();

    api.broadcastLog('start');
};

exports.stopGame = function () {

    api.broadcastLog('stop');

    gameState = false;

    sound.stop();
};

exports.resetGame = function () {

    exports.stopGame();

    api.broadcastLog('reset');

    time = 0;

    api.broadcastTime(time);

    gpio.resetGPIO();

    api.broadcastState();
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

        if (time === 1 || time === photoTime) {

            camera.sendPhoto();
        }

        if (time > totalCurrent) {

            api.broadcastLog('timeout');

            exports.stopGame();

            scenario.endTimeScenario();
        }
    }
}

exports.addTime = function (t) {

    api.broadcastLog('add time: ' + fromSec(totalCurrent) + ' + ' + t)

    // api.broadcastLog('set total time: ' + fromSec(totalDefault))

    totalCurrent = totalCurrent + t;

    // $('#total').text(fromSec(totalCurrent));
}

exports.setTime = function (t) {

    totalDefault = t;
    totalCurrent = totalDefault;

    api.broadcastLog('set total time: ' + fromSec(totalDefault))

    // $('#total').text(fromSec(totalDefault));
};

function fromSec(time) {

    let sec = '00';

    if (time%60 < 10)
        sec = '0' + time%60;

    else
        sec = time%60;

    return Math.floor(time/60) + ':' + sec;
}