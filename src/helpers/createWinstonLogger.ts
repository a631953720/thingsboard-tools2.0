import {
    createLogger,
    format,
    transports,
} from 'winston';

const {
    combine,
    timestamp,
    simple,
    colorize,
    printf,
    prettyPrint,
} = format;

// This logger will show information to user
const ShowSimpleMessage = createLogger({
    format: combine(
        colorize(),
        simple(),
    ),
    transports: [new transports.Console()],
});

// Modify log format and colors
const alignColorsAndTime = combine(
    colorize({
        all: true,
    }),
    timestamp({
        format: 'YYYY-MM-DD HH:MM:SS',
    }),
    printf(
        // (info) => (`${info.level} ${info.timestamp} ${info.label}: ${info.message} `),
        (info) => {
            if (info.level.includes('info')) {
                // eslint-disable-next-line no-param-reassign
                info.level = info.level.replace(/info/i, 'debug');
            }
            return `${info.level} ${info.timestamp} ${info.label}: ${info.message} `;
        },
    ),
);

// This logger will show log likes debug, warning, error, etc...
const CommonLoggerConfig = createLogger({
    transports: [
        new transports.Console({
            format: alignColorsAndTime,
        }),
        new transports.File({
            format: prettyPrint(), // Log file don't need color!
            filename: './output/error.log',
            level: 'error',
        }),
    ],
});

const createWinstonLogger = {
    ShowSimpleMessage,
    CommonLoggerConfig,
};

export default createWinstonLogger;
