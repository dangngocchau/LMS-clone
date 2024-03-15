import { Request, Response, NextFunction } from 'express';
import NotificationModel from '../models/Notification.model';
import ErrorHandler from '../utils/ErrorHandler';
import { StatusCode } from '../constant/StatusCode';
import cron from 'node-cron';

/** Get all notifications -- Only for Admin */
const getNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notifications = await NotificationModel.find().sort({
      createdAt: -1,
    });

    return notifications;
  } catch (error) {
    next(error);
  }
};

/** Update Notifications Status -- Only for Admin */
const updateNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notification = await NotificationModel.findById(req.params.id);
    if (!notification) {
      return next(
        new ErrorHandler('Notification not found', StatusCode.NOT_FOUND)
      );
    }
    notification.status = 'read';

    await notification?.save();

    const notifications = await NotificationModel.find().sort({
      createdAt: -1,
    });

    return notifications;
  } catch (error) {
    next(error);
  }
};

/** Delete Notifications -- Only for Admin */
cron.schedule('0 0 0 * * *', async function () {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await NotificationModel.deleteMany({
    status: 'read',
    createdAt: {
      $lt: thirtyDaysAgo,
    },
  });
});

export { getNotifications, updateNotification };
