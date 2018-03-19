let gameState = false;
let time = 0;

let totalDefault = 1800;
let totalCurrent = totalDefault;

function startGame() {

    if (gameState)
        return;

    log('start game');

    gameState = true;
    time = 0;

    totalCurrent = totalDefault;

    // $('#progress > div').css('width', '0');
    //
    // $('#total').text(fromSec(totalCurrent));
    //
    // $('#start').addClass('off');
    //
    // $('#logo').addClass('rotating');

    // $('#start').css('box-shadow', 'none');

    startGameTime();
}

function stopGame() {

    log('stop game');

    gameState = false;

    // $('#start').removeClass('off');

    // $('#logo').removeClass('rotating');
}

function resetGame() {

    stopGame();

    log('reset game')

    time = 0;

    // $('#current').text(fromSec(time));

    // $('#total').text(fromSec(totalDefault));

    // $('#progress > div').css('width', 0);
}

function startGameTime() {

    if (gameState) {

        updateTime();

        let progress = (time / totalCurrent);

        // $('#progress > div').css('width', progress * 100 + '%');

        setTimeout(function() {
            startGameTime()
        }, 1000);

        time = time + 1;

        if (time > totalCurrent) {

            log('time end')

            stopGame();
            return;
        }
    }
}

function updateTime() {

    // $('#current').text(fromSec(time));
}

function addTime() {

    // log('add time: ' + fromSec(totalCurrent) + ' + ' + $('#addTimeField').text())

    // totalCurrent = totalCurrent + toSec($('#addTimeField').text());

    // $('#total').text(fromSec(totalCurrent));
}

function setTime() {

    // totalDefault = toSec($('#setTimeField').text());
    // totalCurrent = totalDefault;

    log('set total time: ' + fromSec(totalDefault))

    // $('#total').text(fromSec(totalDefault));
}

function fromSec(time) {

    let sec = '00';

    if (time%60 < 10)
        sec = '0' + time%60;

    else
        sec = time%60;

    return Math.floor(time/60) + ':' + sec;
}

function toSec(time) {

    console.log(time)
    console.log(time.split(":"));

    let sec = (time.split(":")[0] * 60) * 1 + (time.split(":")[1]) * 1;

    console.log(sec)

    return sec;
}