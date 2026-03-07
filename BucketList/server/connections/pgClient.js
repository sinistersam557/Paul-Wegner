require('dotenv').config({});
const { Client } = require('pg')

//Destructure Environment Variables for DB Connection
const { DB_HOST, DATABASE, DB_USER, DB_PASS, DB_PORT } = process.env

// Client Object
const pgClient = new Client({
    host: DB_HOST,
    port: DB_PORT,
    database: DATABASE,
    user: DB_USER,
    password: DB_PASS
})

// Connect to PG Database
pgClient.connect()
.then(() => {
    console.log('Connected to Postgres DB', DATABASE)
})
.catch((err) => {
    console.error('Postgres Connection Error:', err)
})

module.exports = pgClient;