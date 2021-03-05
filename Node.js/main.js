// QRCode.toDataURL('Romain', function (err, url) {
//   console.log(url)
// })
import express_server from "./config/express_server.js";
import * as db from "./queries/userQueries.js";

const PORT = process.env.PORT || 5003;
express_server.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});


// respond with "hello world" when a GET request is made to the homepage
express_server.get('/', function (req, res) {
    res.json({info: 'Node.js, Express, and Postgres API'})
})

express_server.get('/user/:id', db.getUserById)
