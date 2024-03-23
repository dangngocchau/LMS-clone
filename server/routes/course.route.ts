import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { asyncRouteHandler } from '../middleware/asyncRoute';
import {
  addAnswerToCourse,
  addQuestionToCourse,
  addReplyReviewToCourse,
  addReviewToCourse,
  deleteCourse,
  editCourse,
  getAllCourses,
  getAllCoursesForAdmin,
  getCourseContent,
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
courseRouter.get(
  '/get-courses',
  isAuthenticated,
  authorizeRoles('admin'),
  asyncRouteHandler(getAllCoursesForAdmin)
);
courseRouter.get(
  '/get-course-content/:id',
  isAuthenticated,
  asyncRouteHandler(getCourseContent)
);
courseRouter.put(
  '/add-question',
  isAuthenticated,
  asyncRouteHandler(addQuestionToCourse)
);
courseRouter.put(
  '/add-question',
  isAuthenticated,
  asyncRouteHandler(addQuestionToCourse)
);

courseRouter.put(
  '/add-answer',
  isAuthenticated,
  asyncRouteHandler(addAnswerToCourse)
);

courseRouter.put(
  '/add-review/:id',
  isAuthenticated,
  asyncRouteHandler(addReviewToCourse)
);

courseRouter.put(
  '/add-reply-review',
  isAuthenticated,
  authorizeRoles('admin'),
  asyncRouteHandler(addReplyReviewToCourse)
);

courseRouter.delete(
  '/delete-course/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  asyncRouteHandler(deleteCourse)
);

export default courseRouter;
