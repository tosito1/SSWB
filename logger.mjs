// logger.mjs
import winston from "winston"
const { combine, timestamp, printf, align} = winston.format
				
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss',
    }),
    align(),
    printf(info => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`)   // formato salida
  ),
  transports: [
    new winston.transports.Console(),        // siempre a consola

    new winston.transports.File({
      filename: 'app.log',                   // salida a partir de info
      level: 'info',
    }),		

    new winston.transports.File({
      filename: 'error.log',                // salida para error
      level: 'error',
    }),		
  ],
});
				
export default logger 