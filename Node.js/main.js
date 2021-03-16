// QRCode.toDataURL('Romain', function (err, url) {
//   console.log(url)
// })
import express_server from "./config/express_server.js";
import * as db from "./queries/customerQueries.js";
import customers from "./routes/customers_route.js";
import coupons from "./routes/coupons_route.js";

const PORT = process.env.PORT || 5000;
express_server.listen(PORT, () => {
    console.log(`app running on port http://localhost:${PORT} `);
});

// respond with "hello world" when a GET request is made to the homepage
express_server.get('/', function (req, res) {
    res.json({info: 'GoStyle API'})
})
express_server.use('/customer', customers);
express_server.use('/coupon', coupons);
