const connect = require("./Node.js/Postgres/connect.js");

client = connect.connection();

client.query('SELECT * FROM customer', (err, res) => {
    console.log(res)
    client.end()
})