let scenarioData = "exports.startScenario = function () {\n" +
    "\n" +
    "\n" +
    "    for (let i = 9; i < 17; i++) {\n" +
    "\n" +
    "        // console.log(typeof gpio.pins[i]);\n" +
    "        // if (gpio.pins[i] !== undefined && gpio.pins[i].state === true)\n" +
    "        //     return false;\n" +
    "    }\n" +
    "\n" +
    "    sound.play('scary.mp3');\n" +
    "\n" +
    "    return true;\n" +
    "};\n" +
    "\n" +
    "exports.endTimeScenario = function () {\n" +
    "\n" +
    "    sound.play('failed.mp3');\n" +
    "\n" +
    "    changeState(2, false);\n" +
    "\n" +
    "    setTimeout(function(){ changeState(1, false) }, 10000);\n" +
    "};\n" +
    "\n" +
    "exports.checkScenario = function () {\n" +
    "\n" +
    "    api.broadcastLog('check scenario');\n" +
    "\n" +
    "    if (gpio.pins[9].state === true) {\n" +
    "\n" +
    "        changeState(4, false);\n" +
    "    }\n" +
    "\n" +
    "    // if (gpio.pins[10].state === true) {\n" +
    "    //     changeState(5, false);\n" +
    "    // }\n" +
    "\n" +
    "    if (gpio.pins[11].state === true) {\n" +
    "        changeState(6, false);\n" +
    "    }\n" +
    "\n" +
    "    if (gpio.pins[14].state === true) {\n" +
    "        changeState(8, false);\n" +
    "    }\n" +
    "\n" +
    "    // Еще одна задача выполняется параллельно этим, но её шаги должны быть последовательны:\n" +
    "    // При срабатывании сенсора 12 устанавливаем 17 в значение ON и начинаем слушать сенсоры 16 и 13.\n" +
    "    // На сенсор 16 реагируем многоразово, при его срабатывании ставим 2 в OFF и 3 в ON,\n" +
    "    // при его деактивации - ставим 2 в ON и 3 в OFF. При срабатывании сенсора 13 ставим 7 в OFF,\n" +
    "    // 3 в OFF, 2 в ON, 17 в OFF, перестаем слушать сенсор 16.\n" +
    "\n" +
    "    if (gpio.pins[12].state === true) {\n" +
    "        changeState(17, true);\n" +
    "\n" +
    "        // теперь слушаем эти сенсоры\n" +
    "        changeState(16, false);\n" +
    "        changeState(13, false);\n" +
    "    }\n" +
    "\n" +
    "    if (gpio.pins[16].state === true) {\n" +
    "        changeState(2, false);\n" +
    "        changeState(3, true);\n" +
    "    }\n" +
    "\n" +
    "    if (gpio.pins[16].state === false) {\n" +
    "        changeState(2, true);\n" +
    "        changeState(3, false);\n" +
    "    }\n" +
    "\n" +
    "    if (gpio.pins[13].state === true)  {\n" +
    "\n" +
    "        changeState(2, true);\n" +
    "        changeState(3, false);\n" +
    "        changeState(7, false);\n" +
    "        changeState(17, false);\n" +
    "\n" +
    "        // TODO это сенсор, и его неперь не слушаем\n" +
    "        changeState(16, null);\n" +
    "    }\n" +
    "\n" +
    "    // if (gpio.pins[9].state === true &&\n" +
    "    //     gpio.pins[11].state === true &&\n" +
    "    //     gpio.pins[12].state === true &&\n" +
    "    //     gpio.pins[13].state === true &&\n" +
    "    //     gpio.pins[14].state === true) {\n" +
    "    //\n" +
    "    //     // начинаем слушать сенсор\n" +
    "    //     changeState(15, false);\n" +
    "    // }\n" +
    "\n" +
    "    if (gpio.pins[15].state === true) {\n" +
    "\n" +
    "        // меняем проигрываемый трек\n" +
    "        sound.play('cat.mp3');\n" +
    "        changeState(2, false);\n" +
    "\n" +
    "        // wait(10)\n" +
    "        setTimeout(function(){ changeState(1, true); }, 10000);\n" +
    "    }\n" +
    "};";