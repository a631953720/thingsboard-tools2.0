/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import WinstonLogger from '../helpers/loggers';
import HTTPError from '../constants/defaultHTTPCode';

const loggers = new WinstonLogger({ type: 'API router error' });

export default function notFoundError(req: Request, res: Response, _next: NextFunction) {
  // 找不到該路由
  if (!req.route) {
    loggers.error(`API ${req.path} not found`, 'API error');
    const response = HTTPError({ status: 404, errorMessage: 'API not found' });
    res.status(response.status).json(response);
  }
}
