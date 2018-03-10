let tabs;

let scenario;

let now;

function init() {

    window.$ = window.jQuery = module.exports;
    activeTab();
    initScenario();

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

    localStorage.setItem('tabs', JSON.stringify(tabs));

    // console.log(tabs)
}

function activeTab() {

    tabs = JSON.parse(localStorage.getItem('tabs'));

    console.log(tabs);

    if (tabs === null) {
        tabs = ['game'];
    }

    $('#menu > div').each(function () {

        let tab = this.innerText.toLowerCase();

        console.log();
        // console.log(tabs)

        if (tabs.indexOf(tab) > -1) {
            $(this).addClass('active');
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

    parseScenario(scenario);

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