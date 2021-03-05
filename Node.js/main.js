// QRCode.toDataURL('Romain', function (err, url) {
//   console.log(url)
// })
import express_server from "./config/express_server.js";
// import routes from "./routes/index.js";
import * as db from "./queries/customerQueries.js";
import customers from "./routes/index.js";

const PORT = process.env.PORT || 5003;
express_server.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});

// respond with "hello world" when a GET request is made to the homepage
express_server.get('/', function (req, res) {
    res.json({info: 'Node.js, Express, and Postgres API'})
})
express_server.use('/customer', customers)
