/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import WinstonLogger from '../helpers/loggers';
import { HTTPError } from '../constants/defaultHTTPCode';

const loggers = new WinstonLogger({ type: 'User component' });

export default function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
    loggers.error(err, 'Common error handler');
    const response = HTTPError({ errorMessage: '123456' });
    res.status(response.status).json(response);
}
