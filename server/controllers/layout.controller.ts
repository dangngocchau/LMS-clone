import { Request, Response, NextFunction } from 'express';
import * as layoutServices from '../services/layout.service';
import { ApiResponse } from '../utils/response';
import { StatusCode } from '../constant/StatusCode';

/** Create Layout */
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
