// database.js : initiates sequelize object to connect to database

const { Sequelize } = require('sequelize');
const pg  = require('pg');
const envConfig = require('./src/configs/config.js');

const env = process.env.NODE_ENV || 'development';
console.log('Loaded environment variables:', envConfig[env]);
const sequelize = new Sequelize(
    envConfig[env].database,
    envConfig[env].username,
    envConfig[env].password, {
        "host": envConfig[env].host,
        "port": envConfig[env].port,
        "dialect": envConfig[env].dialect,
    });


// const sequelize = new Sequelize(
//     '',
//     envConfig[env]['username'],
//     envConfig[env]['password'], {
//         "host": envConfig[env]['host'],
//         "port": envConfig[env]['port'],
//         "dialect": envConfig[env]['dialect'],
//     });
//
//
// const conn = envConfig[env]['dialect']+'://' + envConfig[env]['username'] + ':' + envConfig[env]['password'] + '@' + envConfig[env]['host'] + '/postgres';
// const pool = new pg.Pool({conn})
// sequelize.beforeConnect(async (config) => {
//     pool.connect(function(err, client, release) {
//         if (err) {
//             console.error("Error Connection: " + err);
//         }else{
//             client.query('CREATE DATABASE IF NOT EXISTS ' + envConfig[env]['database'], function(err) {
//             });
//             client.release();
//             config.database = envConfig[env]['database'];
//         }
//     });
// });


module.exports = sequelize;