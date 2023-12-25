import express from 'express';
import {
  authorizeRoles,
  isAuthenticated,
  updateAccessToken,
} from '../middleware/auth';
import { asyncRouteHandler } from '../middleware/asyncRoute';
import { uploadCourse } from '../controllers/course.controller';
const courseRouter = express.Router();

courseRouter.post(
  '/create-course',
  isAuthenticated,
  authorizeRoles('admin'),
  asyncRouteHandler(uploadCourse)
);

export default courseRouter;
