// QRCode.toDataURL('Romain', function (err, url) {
//   console.log(url)
// })
import express_server from "./config/express_server.js";
import customers from "./routes/customers_route.js";
import options from "./config/swagger_options.js";
import swaggerUi from "swagger-ui-express";

const PORT = process.env.PORT || 5003;
express_server.listen(PORT, () => {
    console.log(`app running on port http://localhost:${PORT} `);
    console.log(`doc url: http://localhost:${PORT}/docs `);
});


// respond with "hello world" when a GET request is made to the homepage
express_server.get('/', function (req, res) {
    res.json({info: 'GoStyle API'})
})
express_server.use('/customer', customers)

console.log(options.definition)
express_server.use('/docs', swaggerUi.serve, swaggerUi.setup(options, {explorer: true}));
