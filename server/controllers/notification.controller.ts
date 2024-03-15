import { Request, Response, NextFunction } from 'express';
import * as notificationService from '../services/notification.service';
import { ApiResponse } from '../utils/response';
import { StatusCode } from '../constant/StatusCode';

/** Get All Notifications */
export const getAllNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await notificationService.getNotifications(req, res, next);
  if (result) {
    new ApiResponse(result, StatusCode.OK).send(res);
  }
};

/** Update Notifications */
export const updateNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await notificationService.updateNotification(req, res, next);
  if (result) {
    new ApiResponse(result, StatusCode.OK).send(res);
  }
};
