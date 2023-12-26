import { Request, Response, NextFunction } from 'express';
import cloudinary from 'cloudinary';
import { url } from 'inspector';
import CourseModel from '../models/Course.model';
import { ICourse } from '../interfaces/interface';

/** Create Course */
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

/** Create Course */
const editCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const thumbnail = data.thumbnail;
    const courseId = req.params.id;

    if (thumbnail) {
      await cloudinary.v2.uploader.destroy(thumbnail.public_id);
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: 'courses',
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const course = await CourseModel.findByIdAndUpdate(
      courseId,
      {
        $set: data,
      },
      {
        new: true,
      }
    );

    return {
      ...course?.toObject(),
    };
  } catch (error) {
    next(error);
  }
};

/** Get Single Course With Out Purchasing */
const getSingleCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseId = req.params.id;
    /** Avoid send private data to client */
    const course = await CourseModel.findById(courseId).select(
      '-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links'
    );

    return {
      ...course?.toObject(),
    };
  } catch (error) {
    next(error);
  }
};

/** Get All Courses Without Purchasing */
const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /** Avoid send private data to client */
    const courses = await CourseModel.find().select(
      '-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links'
    );

    return courses;
  } catch (error) {
    next(error);
  }
};

export { createCourse, editCourse, getSingleCourseById, getAllCourses };
