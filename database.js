// database.js : initiates sequelize object to connect to database

const { Sequelize } = require('sequelize');
const config = require('./src/configs/config.js');
console.log('Loaded environment variables:', process.env);

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(
    config[env].database,
    config[env].username,
    config[env].password, {
            "host": config[env].host,
            "port": config[env].port,
            "dialect": config[env].dialect,
    });


module.exports = sequelize;