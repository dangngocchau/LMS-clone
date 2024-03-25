import { Request, Response, NextFunction } from 'express';
import { generateLast12MonthsData } from '../utils/analytics.generator';
import UserModel from '../models/User.model';
import CourseModel from '../models/Course.model';
import OrderModel from '../models/Order.model';

/**Get Users Analytics -- OnLy For Admin */
const getUserAnalyticsForAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await generateLast12MonthsData(UserModel);
    return users;
  } catch (error) {
    next(error);
  }
};

/**Get Courses Analytics -- OnLy For Admin */
const getCourseAnalyticsForAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await generateLast12MonthsData(CourseModel);
    return courses;
  } catch (error) {
    next(error);
  }
};

/**Get Orders Analytics -- OnLy For Admin */
const getOrderAnalyticsForAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await generateLast12MonthsData(OrderModel);
    return orders;
  } catch (error) {
    next(error);
  }
};

export {
  getUserAnalyticsForAdmin,
  getCourseAnalyticsForAdmin,
  getOrderAnalyticsForAdmin,
};
