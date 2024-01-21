import { Request, Response, NextFunction } from 'express';
import * as orderService from '../services/order.service';
import { ApiResponse } from '../utils/response';
import { StatusCode } from '../constant/StatusCode';

/** Create Order (Create Course) */
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await orderService.createOrder(req, res, next);
  if (result) {
    new ApiResponse(result, StatusCode.CREATED).send(res);
  }
};
