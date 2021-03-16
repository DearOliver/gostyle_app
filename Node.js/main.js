// QRCode.toDataURL('Romain', function (err, url) {
//   console.log(url)
// })
import express_server from "./config/express_server.js";
import customers from "./routes/customers_route.js";
import options from "./config/swagger_options.js";
import swaggerUi from "swagger-ui-express";

const PORT = process.env.PORT || 80;
express_server.listen(PORT, () => {
    console.log(`app running on port http://localhost:${PORT} `);
});

express_server.use('/', swaggerUi.serve, swaggerUi.setup(options, {explorer: true}));

express_server.use('/customer', customers)

