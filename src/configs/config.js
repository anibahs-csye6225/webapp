//config - stores configuration details for database connection,
// reads sensitive data from env file using dotenv

const dotenv = require('dotenv');
dotenv.config({ path: '.env' });


module.exports = {
    development: {
        host: process.env.host,
        username: process.env.username,
        password: process.env.password,
        database: process.env.database,
        dialect: process.env.dialect,
        port: process.env.port
    },
    test: {
        host: process.env.host,
        username: process.env.username,
        password: process.env.password,
        database: process.env.database,
        dialect: process.env.dialect,
        port: process.env.port
    }
};