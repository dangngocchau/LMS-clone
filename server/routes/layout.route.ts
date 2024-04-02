import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { asyncRouteHandler } from '../middleware/asyncRoute';
import {
  createLayout,
  editLayout,
  getLayout,
} from '../controllers/layout.controller';
const layoutRouter = express.Router();

layoutRouter.post(
  '/create-layout',
  isAuthenticated,
  authorizeRoles('admin'),
  asyncRouteHandler(createLayout)
);

layoutRouter.post(
  '/edit-layout',
  isAuthenticated,
  authorizeRoles('admin'),
  asyncRouteHandler(editLayout)
);

layoutRouter.post(
  '/get-layout',
  isAuthenticated,
  authorizeRoles('admin'),
  asyncRouteHandler(getLayout)
);

export default layoutRouter;
