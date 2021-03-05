import config from "./config.js"
import pg from "pg"

const {Pool} = pg;
let db_config = config;

const pool = new Pool({
    user: db_config.PGUSER,
    host: db_config.PGHOST,
    database: db_config.PGDATABASE,
    password: db_config.PGPASSWORD,
    port: db_config.PGPORT,
})


const db = (text, params, callback) => {
    const start = Date.now()
    return pool.query(text, params, (err, res) => {
        const duration = Date.now() - start
        const rows = res ? res.rowCount : ""
        console.log('executed query', { text, duration, rows })
        callback(err, res)
    })
}

export default db;
