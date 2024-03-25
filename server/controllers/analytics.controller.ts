import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/response';
import { StatusCode } from '../constant/StatusCode';
import * as analyticsService from '../services/analytics.service';

/** Get Users Analytics -- For Admin Only */
export const getUserAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await analyticsService.getUserAnalyticsForAdmin(
    req,
    res,
    next
  );
  if (result) {
    new ApiResponse(result, StatusCode.OK).send(res);
  }
};

/** Get Courses Analytics -- For Admin Only */
export const getCourseAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await analyticsService.getCourseAnalyticsForAdmin(
    req,
    res,
    next
  );
  if (result) {
    new ApiResponse(result, StatusCode.OK).send(res);
  }
};
/** Get Orders Analytics -- For Admin Only */
export const getOrderAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await analyticsService.getOrderAnalyticsForAdmin(
    req,
    res,
    next
  );
  if (result) {
    new ApiResponse(result, StatusCode.OK).send(res);
  }
};
