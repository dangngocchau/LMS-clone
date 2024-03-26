import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { asyncRouteHandler } from '../middleware/asyncRoute';
import { createLayout } from '../controllers/layout.controller';
const layoutRouter = express.Router();

layoutRouter.post(
  '/create-layout',
  isAuthenticated,
  authorizeRoles('admin'),
  asyncRouteHandler(createLayout)
);

export default layoutRouter;
