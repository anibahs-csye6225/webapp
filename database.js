// database.js : initiates sequelize object to connect to database

const { Sequelize } = require('sequelize');
const pg  = require('pg');

const env = process.env.NODE_ENV || 'development';
//console.log('Environment: ', env)
//console.log('Loaded environment variables:', process.env);
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD, {
        "host": process.env.HOST,
        "port": process.env.DB_PORT,
        "dialect": process.env.DIALECT,
    });

module.exports = sequelize;

