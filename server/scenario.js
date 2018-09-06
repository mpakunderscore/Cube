let scenarioArray = {};

let gpio = require('./gpio');

let sound = require('./sound');

let api = require('./api');

let timer = require('./timer');

function parseScenario(text) {

    let scenarioRows = text.split("\n");

    console.log(scenarioRows.length + ' rows in scenario');
    log(scenarioRows.length + ' rows in scenario');

    for (let i = 0; i < scenarioRows.length; i++) {

        let row = scenarioRows[i].trim();

        if (row.startsWith("if")) {
            console.log("if")
        }
    }
}

function initState(id) {

    gpio.initInterface(id);
    api.broadcastState(id);
}

function changeState(id, state) {

    if (gpio.pins[id].state === state)
        return;

    gpio.pins[id].state = state;

    if (gpio.pins[id].type === true)
        gpio.changeInterface(id);

    api.broadcastState(id);
}

exports.startScenario = function () {


    for (let i = 9; i < 17; i++) {

        // console.log(typeof gpio.pins[i]);
        // if (gpio.pins[i] !== undefined && gpio.pins[i].state === true)
        //     return false;
    }

    sound.play('scary.mp3');

    return true;
};

exports.endTimeScenario = function () {

    sound.play('failed.mp3');

    changeState(2, false);

    setTimeout(function(){ changeState(1, false) }, 10000);
};

exports.checkScenario = function () {

    if (!timer.getState())
        return;

    api.broadcastLog('check scenario');

    if (gpio.pins[9].state === true) {

        changeState(4, false);
    }

    // if (gpio.pins[10].state === true) {
    //     changeState(5, false);
    // }

    if (gpio.pins[11].state === true) {
        changeState(6, false);
    }

    if (gpio.pins[14].state === true) {
        changeState(8, false);
    }

    // Еще одна задача выполняется параллельно этим, но её шаги должны быть последовательны:
    // При срабатывании сенсора 12 устанавливаем 17 в значение ON и начинаем слушать сенсоры 16 и 13.
    // На сенсор 16 реагируем многоразово, при его срабатывании ставим 2 в OFF и 3 в ON,
    // при его деактивации - ставим 2 в ON и 3 в OFF. При срабатывании сенсора 13 ставим 7 в OFF,
    // 3 в OFF, 2 в ON, 17 в OFF, перестаем слушать сенсор 16.

    if (gpio.pins[12].state === true) {
        changeState(17, true);

        // теперь слушаем эти сенсоры
        initState(16);
        initState(13);
    }

    if (gpio.pins[16].state === true) {
        changeState(2, false);
        changeState(3, true);
    }

    if (gpio.pins[16].state === false) {
        changeState(2, true);
        changeState(3, false);
    }

    if (gpio.pins[13].state === true)  {

        changeState(2, true);
        changeState(3, false);
        changeState(7, false);
        changeState(17, false);

        // TODO это сенсор, и его неперь не слушаем
        changeState(16, null);
    }

    // if (gpio.pins[9].state === true &&
    //     gpio.pins[11].state === true &&
    //     gpio.pins[12].state === true &&
    //     gpio.pins[13].state === true &&
    //     gpio.pins[14].state === true) {
    //
    //     // начинаем слушать сенсор
    //     changeState(15, false);
    // }

    if (gpio.pins[15].state === true) {

        // меняем проигрываемый трек
        sound.play('cat.mp3');
        changeState(2, false);

        // wait(10)
        setTimeout(function(){ changeState(1, false); }, 10000);
    }
};