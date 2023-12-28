/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import handleZodError from '../errors/handleZodError';
import handleCastError from '../errors/handleCastError';
import config from '../config';
import { ZodError } from 'zod';
import handleMongooseValidationError from '../errors/handleMongooseValidatorError';

const globalErrorHandalers: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'something went worng';
  let errorMessage = 'something went worng';
  let errorDetails = {};

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
    errorDetails = simplifiedError?.err;
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleMongooseValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
    errorDetails = simplifiedError?.errorDetails[0];
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError.errorMessage;
    errorDetails = simplifiedError?.err;
  } else if (error instanceof Error) {
    message = error.message;
    errorMessage = error.message;
  }

  //ultimate return
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorMessage,
    errorDetails,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandalers;
