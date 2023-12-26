import express from 'express';
import {
  authorizeRoles,
  isAuthenticated,
  updateAccessToken,
} from '../middleware/auth';
import { asyncRouteHandler } from '../middleware/asyncRoute';
import {
  editCourse,
  getAllCourses,
  getSingleCourse,
  uploadCourse,
} from '../controllers/course.controller';
const courseRouter = express.Router();

courseRouter.post(
  '/create-course',
  isAuthenticated,
  authorizeRoles('admin'),
  asyncRouteHandler(uploadCourse)
);

courseRouter.put(
  '/edit-course/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  asyncRouteHandler(editCourse)
);

courseRouter.get('/get-course/:id', asyncRouteHandler(getSingleCourse));
courseRouter.get('/get-all-courses', asyncRouteHandler(getAllCourses));

export default courseRouter;
