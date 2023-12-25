import { Request, Response, NextFunction } from 'express';
import cloudinary from 'cloudinary';
import { url } from 'inspector';
import CourseModel from '../models/Course.model';

const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const thumbnail = data.thumbnail;
    if (thumbnail) {
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: 'courses',
      });
      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const course = await CourseModel.create(data);
    return {
      ...course.toObject(),
    };
  } catch (error: any) {
    return next(error);
  }
};

export { createCourse };
