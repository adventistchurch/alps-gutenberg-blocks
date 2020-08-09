const winston = require('winston');
const { combine, timestamp, printf } = winston.format;
const chalk = require('chalk');

const logger = winston.createLogger({
    format: combine(
        timestamp(),
        printf(({ message }) => {
            return message;
        })
    ),
    transports: [
        new winston.transports.Console(),
    ],
});

module.exports = logger;
