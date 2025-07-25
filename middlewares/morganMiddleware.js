const morgan = require("morgan");
import logger from '../config/loggers.js';

const morganMiddleware = morgan(":method :url :status :res[content-length] - :response-time ms",
{stream:{
    write:(message)=>logger.http(message.trim()),
},}
);

