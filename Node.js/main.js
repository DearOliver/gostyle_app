const connect = require("./Postgres/connect.js");
const QRCode = require('qrcode');

// QRCode.toDataURL('Romain', function (err, url) {
//   console.log(url)
// })

// client = connect.connection();

// client.query('SELECT * FROM customer', (err, res) => {
//     console.log(res)
//     client.end()
// })

// const express = require('express')
// const app = express()
const bodyParser = require('body-parser')
const server = require("./config/server");


const PORT = process.env.PORT || 5003;
server.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});


// respond with "hello world" when a GET request is made to the homepage
server.get('/', function (req, res) {
    res.send('hello world')
})
