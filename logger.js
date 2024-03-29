
const winston = require('winston');
const { combine, timestamp, json, errors } = winston.format;

const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const logger = winston.createLogger({
  level: 'info',
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [
    new winston.transports.File({ filename: process.env.LOGPATH? process.env.LOGPATH:'./webapp.log'})

 ]
});

module.exports = logger;


