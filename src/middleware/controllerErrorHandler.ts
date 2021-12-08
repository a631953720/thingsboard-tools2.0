/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import WinstonLogger from '../helpers/loggers';
import HTTPError from '../constants/defaultHTTPCode';
import { HTTPStatusRes } from '../interface/HTTPStatus';

const loggers = new WinstonLogger({ type: 'User component' });

export default function controllerErrorHandler(
    err: HTTPStatusRes,
    _req: Request,
    res: Response,
    next: NextFunction
) {
    if (err.errorMessage) {
        loggers.error(err, 'Controller error handler');
        const response = HTTPError({ status: err.status, errorMessage: err.errorMessage });
        res.status(response.status).json(response);
    } else {
        next(err);
    }
}
