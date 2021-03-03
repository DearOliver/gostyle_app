const config = require("./config");
const { Client } = require('pg');

let db_config = config.db_config();

const client = new Client({
  user: db_config['PGUSER'],
  host: db_config['PGHOST'],
  database: db_config['PGDATABASE'],
  password: db_config['PGPASSWORD'],
  port: db_config['PGPORT'],
})

function connection()
{
    client.connect();
    return client;
}

module.exports = { connection };