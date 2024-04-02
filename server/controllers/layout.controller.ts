import { Request, Response, NextFunction } from 'express';
import * as layoutServices from '../services/layout.service';
import { ApiResponse } from '../utils/response';
import { StatusCode } from '../constant/StatusCode';

/** Create Layout -- Only For Admin */
export const createLayout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await layoutServices.createLayoutForAdmin(req, res, next);
  if (result) {
    new ApiResponse(result, StatusCode.OK).send(res);
  }
};

/** Edit Layout -- Only For Admin */
export const editLayout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await layoutServices.editLayoutForAdmin(req, res, next);
  if (result) {
    new ApiResponse(result, StatusCode.OK).send(res);
  }
};

/** Get Layout -- Only For Admin */
export const getLayout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await layoutServices.getLayoutForAdmin(req, res, next);
  if (result) {
    new ApiResponse(result, StatusCode.OK).send(res);
  }
};
