const { format, transports, createLogger } = require('winston');
require('winston-daily-rotate-file');

const {combine,timestamp,json,colorsize,simple} = format;

const fileRotateTransport = new transports.DailyRotateFile({
  filename: 'logs/%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxFiles: '14d'
})

const logger = createLogger({
level:'silly',
format: json(),
transpots:[
    fileRotateTransport,
    new transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: combine(
            format.timestamp(),
            format.json()
        )
    })

]
});

if(process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: combine(
            format.colorize(),
            simple()
        )
    }));
}
module.exports = logger;