import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { asyncRouteHandler } from '../middleware/asyncRoute';
import { createOrder, getAllOrders } from '../controllers/order.controller';

const orderRouter = express.Router();
orderRouter.post(
  '/create-order',
  isAuthenticated,
  asyncRouteHandler(createOrder)
);

orderRouter.get(
  '/get-orders',
  isAuthenticated,
  authorizeRoles('admin'),
  asyncRouteHandler(getAllOrders)
);

export default orderRouter;
