//config - stores configuration details for database connection,
// reads sensitive data from env file using dotenv

const dotenv = require('dotenv').config();

module.exports = {
    development: {
        host: process.env.host,
        username: process.env.username,
        password: process.env.password,
        database: process.env.database,
        dialect: process.env.dialect,
        port: process.env.port
        // pool: {
        //     max: 5,
        //     min: 0,
        //     acquire: 30000,
        //     idle: 10000
        // }
    }
};