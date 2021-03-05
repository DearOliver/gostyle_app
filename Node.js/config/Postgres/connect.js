
import config from "./config.js"
import pg from "pg"
const {Client} = pg;
let db_config = config;

const client = new Client({
  user: db_config.PGUSER,
  host: db_config.PGHOST,
  database: db_config.PGDATABASE,
  password: db_config.PGPASSWORD,
  port: db_config.PGPORT,
})

function connection()
{
    client.connect();
    return client;
}

export default connection();
