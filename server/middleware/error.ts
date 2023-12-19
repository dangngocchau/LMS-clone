import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/ErrorHandler';
import { StatusCode } from '../constant/StatusCode';
import { ErrorMessage, ErrorName } from '../constant/ErrorMessage';

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /** NOTE: Default if not have statusCode and message it will Internal server error' */
  err.statusCode = err.statusCode || StatusCode.INTERNAL_SERVER_ERROR;
  err.message = err.message || ErrorMessage.INTERNAL_SERVER_ERROR;

  /** Wrong mongo id error */
  if (err.name === ErrorName.CastError) {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, StatusCode.BAD_REQUEST);
  }

  /** Duplicate key error */
  if (err.code === StatusCode.DUPLICATE_KEY) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, StatusCode.BAD_REQUEST);
  }

  res.status(err.statusCode).json({
    success: false,
    name: err.name,
    message: err.message,
    statusCode: err.statusCode,
  });
};
