import { utilities, WinstonModule } from 'nest-winston';
import winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';
import { Environment } from '../config/env.validation';

const generateFormat = (isConsole: boolean) =>
  winston.format.combine(
    winston.format.timestamp(),
    utilities.format.nestLike(process.env.NODE_ENV, {
      colors: isConsole,
      prettyPrint: true,
    }),
  );

const loggerOption =
  process.env.NODE_ENV === Environment.Production
    ? {
        transports: [
          new WinstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: './logs',
            filename: '%DATE%.log',
            maxFiles: 30,
            format: generateFormat(false),
          }),
        ],
      }
    : {
        transports: [
          new winston.transports.Console({
            level: 'debug',
            format: generateFormat(true),
          }),
        ],
      };

export const winstonLogger = WinstonModule.createLogger(loggerOption);
