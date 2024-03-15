import { Request, Response, NextFunction } from 'express';
import { IOrder } from '../interfaces/interface';
import UserModel from '../models/User.model';
import ErrorHandler from '../utils/ErrorHandler';
import { StatusCode } from '../constant/StatusCode';
import CourseModel from '../models/Course.model';
import OrderModel from '../models/Order.model';
import path from 'path';
import ejs from 'ejs';
import sendMail from '../utils/sendMail';
import NotificationModel from '../models/Notification.model';

/** New Order */
const newOrder = async (data: IOrder) => {
  const order = await OrderModel.create(data);
};

/** Creare Order */
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId, payment_info } = req.body as IOrder;
    const user = await UserModel.findById(req?.user?._id);

    /** Check course exist in user login */
    const courseExist = user?.courses?.some(
      (course: any) => course._id.toString() === courseId
    );
    if (courseExist) {
      return next(
        new ErrorHandler(
          'You have already purchased this course',
          StatusCode.BAD_REQUEST
        )
      );
    }

    const course = await CourseModel.findById(courseId);
    if (!course) {
      return next(new ErrorHandler('Course not found', StatusCode.BAD_REQUEST));
    }

    const data: any = {
      courseId: course._id,
      userId: user?._id,
      payment_info,
    };
    const mailData = {
      order: {
        _id: course._id.toString().slice(0, 6),
        name: course.name,
        price: course.price,
        data: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      },
    };

    /** Send email */
    const html = await ejs.renderFile(
      path.join(__dirname, '../mails/order-confirmation.ejs'),
      {
        order: mailData,
      }
    );

    try {
      if (user) {
        await sendMail({
          email: user.email,
          subject: 'Order Confirmation',
          template: 'order-confirmation.ejs',
          data: mailData,
        });
      }
    } catch (error: any) {
      return next(
        new ErrorHandler(error.message, StatusCode.INTERNAL_SERVER_ERROR)
      );
    }

    user?.courses.push({
      _id: course._id,
    });
    await user?.save();

    await NotificationModel.create({
      userId: user?._id,
      title: 'New Order',
      message: `You have a new order from ${course?.name}`,
    });

    /** Count puchase of course */
    if (course.purchased !== undefined) {
      course.purchased += 1;
    }
    await course.save();

    /** Create new order */
    const order = await OrderModel.create(data);

    return {
      ...order.toObject(),
    };
  } catch (error) {
    return next(error);
  }
};

//Get All Orders -- Only For Admin
const getAllOrdersForAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const usersJson = await redis.get("users");
  const orders = await OrderModel.find().sort({
    createdAt: -1,
  });

  return orders;
};

export { createOrder, getAllOrdersForAdmin };
