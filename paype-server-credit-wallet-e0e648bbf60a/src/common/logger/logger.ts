import moment = require('moment');
import { WinstonModule, utilities as nestWinstonModuleUtilities, } from 'nest-winston';
import * as winston from 'winston';
import DailyRotateFile = require("winston-daily-rotate-file");
const { combine, timestamp, ms, label, json, prettyPrint, printf, colorize, simple } = winston.format;

// ### Log Levels
const levels = [ 'info', 'warn', 'error' ]

// ### Log format
const format = (returnLevel?: string[] | undefined) => 
    printf(
        ({ timestamp, ms, level, message, ...rest}): any => {
            if(!returnLevel || returnLevel.includes(level))
                return `[${level}] >> [${moment(timestamp).format('"DD-MM-YYYY HH:mm:ss"')}] [${ms}]: ${message} ${'\n'} ${JSON.stringify(rest)} ${'\n'} `;
            return `[${level}] >> [${moment(timestamp).format('"DD-MM-YYYY HH:mm:ss"')}] [${ms}] ${'\n'} `
        }
    );

// ### Log unhandled exceptions to separate file
const exceptionHandlers = [
	new DailyRotateFile({
		filename: './logs/exceptions/%DATE%.log',
		datePattern: 'DD-MM-YYYY',
		zippedArchive: true,
		maxSize: '128m',
		maxFiles: '14d'
	})
]

export function loggerInit(){
    return WinstonModule.createLogger({
        transports: [
            ...levels.map((level) => 
                new DailyRotateFile({
                    filename: `./logs/${level}/%DATE%.log`,
                    datePattern: 'DD-MM-YYYY',
                    zippedArchive: true,
                    maxSize: '128m',
                    maxFiles: '14d',
                    level: level,
                    json: true,
                    format: combine( timestamp(), ms(), label(), prettyPrint(), json(), format([level]))
                })
            ),
            new (winston.transports.Console)({
                level: 'info',
                handleExceptions: true,
                format: combine(
                    colorize(),
                    simple()
                )
            })
        ],
        exceptionHandlers: exceptionHandlers,
        level: 'info',
        exitOnError: false,
        silent: false,
        format: combine( timestamp(), ms(), label(), prettyPrint(), json(), format()),
    })
}