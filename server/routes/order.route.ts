import express from 'express';
import { isAuthenticated } from '../middleware/auth';
import { asyncRouteHandler } from '../middleware/asyncRoute';
import { createOrder } from '../controllers/order.controller';

const orderRouter = express.Router();
orderRouter.post(
  '/create-order',
  isAuthenticated,
  asyncRouteHandler(createOrder)
);

export default orderRouter;
