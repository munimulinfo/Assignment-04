/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const routeNOtFound = (req: Request, res: Response, next: NextFunction) => {
  const message = 'This Api NOt Found';
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message,
    error: '',
  });
};

export default routeNOtFound;
