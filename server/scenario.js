let scenarioArray = {};

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