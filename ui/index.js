let tabs = [];

let scenario;

let now;

let gpioState = {};

function init() {

    try {
        window.$ = window.jQuery = module.exports;
    } catch(err) {
    }

    initTabs();
    initScenario();
    renderGPIO();

    log('init')
}

function tab(element) {

    let id = element.innerText.toLowerCase();

    // console.log(id)

    if (tabs.indexOf(id) < 0) {

        tabs.push(id);
        $("#" + id).css('display', 'block');
        $(element).addClass('active');

        // console.log('Show: ' + id);

    } else {

        tabs.splice(tabs.indexOf(id), 1);

        $("#" + id).css('display', 'none');
        $(element).removeClass('active');

        // console.log('Hide: ' + id);
    }

    setTabs(tabs);

    // console.log(tabs)
}

function initTabs() {

    tabs = getTabs();

    // console.log(tabs);

    $('#menu > div').each(function () {

        let tab = this.innerText.toLowerCase();

        console.log();
        // console.log(tabs)

        if (tabs.indexOf(tab) > -1) {
            $(this).addClass('active');
            $('#' + tab).css('display', 'block');
        } else {
            $('#' + tab).css('display', 'none');
        }
    });
}

function initScenario() {

    scenario = getScenario();

    // console.log(scenario);

    if (scenario === null) {
        scenario = 'if (4) { 5 = false }';
    }

    $('#scenario > div')[0].innerText = scenario;

    // parseScenario(scenario);

    // console.log($('#scenario > div')[0].innerHTML)
}

function img(id) {
    // $(id).css('height', '100%');
}

function log(text) {
    $('#logs').prepend($('<div>' + now + ' '  + text + '</div>'))
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function renderGPIO() {

    $('#gpio > table').first().html('');
    $('#gpio > table').first().append($('<tr> <th onclick="sortTable(0)">#</th> <th onclick="sortTable(1)">PID</th> <th>Name</th> <th onclick="sortTable(3)" style="float: right">State</th> <th onclick="sortTable(3)" style="padding-left: 20px">T</th> </tr>'))

    for (let i in gpioState) {

        let id =  gpioState[i].id;

        let tr = $('<tr id="gpio'+ gpioState[i].id +'"></tr>');
        tr.append('<td>' + gpioState[i].id + '</td>');
        tr.append('<td>' + gpioState[i].pid + '</td>');
        tr.append('<td>' + gpioState[i].name + '</td>');
        tr.append('<td class="state">' + (gpioState[i].type ?

            '<span class="' + (gpioState[i].state ? 'active' : '') + '">YES</span>' +
            '<span class="' + (gpioState[i].state === null ? 'active' : '') + '"> / </span>' +
            '<span class="' + (gpioState[i].state === false ? 'active' : '') + '">NO</span>'
            :
            '<span class="' + (gpioState[i].state ? 'active' : '') + '" onclick="changeGPIOState(' + id + ')">ON</span>' +
            ' / ' +
            '<span class="' + (!gpioState[i].state ? 'active' : '') + '" onclick="changeGPIOState(' + id + ')">OFF</span>') + '</td>');
        tr.append('<td><span class="' + (gpioState[i].type ? 'white' : '') +'">&middot;<span>');

        $('#gpio > table').first().append(tr)
    }
}

function changeGPIOState(id) {

    // console.log(id)
    gpioState[id].state = !gpioState[id].state;

    //if come back as true
    $('#gpio > table').first().html('');
    renderGPIO();
}

function startTime() {

    let t;

    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);

    now = h + ":" + m + ":" + s;

    document.getElementById('date').innerHTML = h + ":" + m + ":" + s;
    t = setTimeout(function() {
        startTime()
    }, 500);
}

startTime();

// $( document ).ready(function() {
//     console.log( "ready!" );
// });