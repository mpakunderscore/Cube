let game = false;
let time = 0;

let total = 1800;

function startGame() {

    game = true;
    time = 0;

    $('#progress > div').css('width', '0');

    $('#total').text(sec(total));

    startGameTime();
}

function startGameTime() {

    if (game) {

        updateTime();

        $('#progress > div').css('width', (time / total) * 100 + '%')

        time = time + 1;

        if (time > total) {


            return;
        }


        setTimeout(function() {
            startGameTime()
        }, 1000);
    }
}

function updateTime() {

    $('#current').text(sec(time));
}

function sec(time) {

    let sec = '00';

    if (time%60 < 10)
        sec = '0' + time%60;

    else
        sec = time%60;

    return Math.floor(time/60) + ':' + sec;
}