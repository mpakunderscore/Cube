function saveScenario() {
    localStorage.setItem('scenario', $('#scenario > div')[0].innerText);
}

function getScenario() {
    return localStorage.getItem('scenario');
}