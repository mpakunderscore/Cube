let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'qf.cube@gmail.com',
        pass: 'geekpower'
    }
});

exports.send = function (data) {

    // const bytes = new Uint8Array(data);
    // camera1.src = 'data:image/jpeg;base64,' + base64ArrayBuffer(bytes);

    mailOptions.attachments.push({path: 'data:image/jpeg;base64,' + base64ArrayBuffer(data)})

    // aGVsbG8gd29ybGQ=

    transporter.sendMail(mailOptions, function(error, info){

        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

let mailOptions = {

    from: 'qf.cube@gmail.com',
    to: ['cubequestmaya@gmail.com'],
    subject: new Date().toJSON().slice(0,19).replace(/-/g,'/').replace(/T/g,' '),
    text: '',
    attachments: []
};

// attachments: [
//     {   // utf-8 string as an attachment
//         filename: 'text1.txt',
//         content: 'hello world!'
//     },
//     {   // binary buffer as an attachment
//         filename: 'text2.txt',
//         content: new Buffer('hello world!','utf-8')
//     },
//     {   // file on disk as an attachment
//         filename: 'text3.txt',
//         path: '/path/to/file.txt' // stream this file
//     },
//     {   // filename and content type is derived from path
//         path: '/path/to/file.txt'
//     },
//     {   // stream as an attachment
//         filename: 'text4.txt',
//         content: fs.createReadStream('file.txt')
//     },
//     {   // define custom content type for the attachment
//         filename: 'text.bin',
//         content: 'hello world!',
//         contentType: 'text/plain'
//     },
//     {   // use URL as an attachment
//         filename: 'license.txt',
//         path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
//     },
//     {   // encoded string as an attachment
//         filename: 'text1.txt',
//         content: 'aGVsbG8gd29ybGQh',
//         encoding: 'base64'
//     },
//     {   // data uri as an attachment
//         path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
//     },
//     {
//         // use pregenerated MIME node
//         raw: 'Content-Type: text/plain\r\n' +
//         'Content-Disposition: attachment;\r\n' +
//         '\r\n' +
//         'Hello world!'
//     }
// ]

function base64ArrayBuffer(arrayBuffer) {

    var base64    = '';
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var bytes         = new Uint8Array(arrayBuffer);
    var byteLength    = bytes.byteLength;
    var byteRemainder = byteLength % 3;
    var mainLength    = byteLength - byteRemainder;
    var a, b, c, d;
    var chunk;
    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048)   >> 12; // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032)     >>  6; // 4032     = (2^6 - 1) << 6
        d = chunk & 63;               // 63       = 2^6 - 1
        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }
    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
        chunk = bytes[mainLength];
        a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2
        // Set the 4 least significant bits to zero
        b = (chunk & 3)   << 4; // 3   = 2^2 - 1
        base64 += encodings[a] + encodings[b] + '==';
    } else if (byteRemainder == 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
        a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008)  >>  4; // 1008  = (2^6 - 1) << 4
        // Set the 2 least significant bits to zero
        c = (chunk & 15)    <<  2; // 15    = 2^4 - 1
        base64 += encodings[a] + encodings[b] + encodings[c] + '=';
    }
    return base64;
}
