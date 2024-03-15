import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { asyncRouteHandler } from '../middleware/asyncRoute';
import { createOrder } from '../controllers/order.controller';
import {
  getAllNotifications,
  updateNotification,
} from '../controllers/notification.controller';

const notificationsRouter = express.Router();
notificationsRouter.get(
  '/get-all-notifications',
  isAuthenticated,
  authorizeRoles('admin'),
  asyncRouteHandler(getAllNotifications)
);

notificationsRouter.put(
  '/update-notificaiton/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  asyncRouteHandler(updateNotification)
);

export default notificationsRouter;
