function saveScenario() {
    localStorage.setItem('scenario', $('#scenario > pre > code')[0].innerText);
}

function getScenario() {
    return localStorage.getItem('scenario');
}

function getTabs() {

    let tabs = JSON.parse(localStorage.getItem('tabs'));

    if (tabs === null) {
        tabs = ['game', 'gpio', 'camera'];
    }

    return tabs;
}

function setTabs(tabs) {
    localStorage.setItem('tabs', JSON.stringify(tabs));
}