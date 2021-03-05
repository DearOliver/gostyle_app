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