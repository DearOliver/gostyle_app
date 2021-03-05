// QRCode.toDataURL('Romain', function (err, url) {
//   console.log(url)
// })

// client = connect.connection();

// client.query('SELECT * FROM customer', (err, res) => {
//     console.log(res)
//     client.end()
// })
import express_server from "./config/express_server.js";
import connect from "./Postgres/connect.js";
// const QRCode = require('qrcode');
const PORT = process.env.PORT || 5003;
express_server.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});


// respond with "hello world" when a GET request is made to the homepage
express_server.get('/', function (req, res) {
    res.json({info: 'Node.js, Express, and Postgres API'})
})
