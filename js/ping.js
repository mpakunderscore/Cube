var ping = require('ping');
var ip = require('ip');

function scan() {

    let address = ip.address(); // my ip address

    console.log('my ip: ' + address)

    for (let i = 0; i < 260; i++) {

        let host = address.split('.')[0] + '.' + address.split('.')[1] + '.' + address.split('.')[2] + '.' + i;

        ping.sys.probe(host, function(isAlive){

            var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';

            if (isAlive)
                console.log(msg);
        });
    }
}

scan();