import { Request, Response, NextFunction } from 'express';
import cloudinary from 'cloudinary';
import CourseModel from '../models/Course.model';
import {
  IAddAnswerData,
  IAddQuestionData,
  IAnswer,
  IComment,
  ICommentDocument,
  ICourse,
  ICourseData,
  INewQuestion,
  IUser,
} from '../interfaces/interface';
import { redis } from '../utils/redis';
import ErrorHandler from '../utils/ErrorHandler';
import { StatusCode } from '../constant/StatusCode';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { title } from 'process';
import path from 'path';
import ejs, { name } from 'ejs';
import sendMail from '../utils/sendMail';

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
    let course = null;
    /** Get course detail in redis */
    const isCacheExist = await redis.get(courseId);
    if (isCacheExist) {
      course = JSON.parse(isCacheExist);
      return course;
    } else {
      /** Avoid send private data to client */
      course = await CourseModel.findById(courseId).select(
        '-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links'
      );
      /** Cache course into redis*/
      await redis.set(courseId, JSON.stringify(course));
      return {
        ...course?.toObject(),
      };
    }
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
    let courses = null;
    const isCacheExist = await redis.get('allCourses');
    if (isCacheExist) {
      courses = JSON.parse(isCacheExist);
    } else {
      /** Avoid send private data to client */
      courses = await CourseModel.find().select(
        '-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links'
      );
      await redis.set('allCourses', JSON.stringify(courses));
    }
    return courses;
  } catch (error) {
    next(error);
  }
};

/** Get Course Content With Purchased Course ( Only For Valid User ) */
const getCourseByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userCourseList = req?.user?.courses;

    const courseId = req.params.id;
    const courseExist = userCourseList?.find(
      (course) => course._id.toString() === courseId
    );
    if (!courseExist) {
      return next(
        new ErrorHandler(
          'You are not enrolled in this course',
          StatusCode.FORBIDDEN
        )
      );
    }

    const course = await CourseModel.findById(courseId);
    const content = course?.courseData;

    return content;
  } catch (error) {
    next(error);
  }
};

/** Add Question */
const addQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { question, courseId, contentId }: IAddQuestionData = req.body;
    const course = await CourseModel.findById(courseId);
    const courseContent = course?.courseData?.find((item: ICourseData) =>
      item._id?.equals(contentId)
    );

    if (!mongoose.Types.ObjectId.isValid(contentId) || !courseContent) {
      return next(
        new ErrorHandler('Invalid content Id', StatusCode.BAD_REQUEST)
      );
    }
    /** Create new question object */
    const newQuestion: IComment = {
      user: req?.user as IUser,
      question,
      questionReplies: [],
    };
    /** Add this question to our course content */
    courseContent.questions.push(newQuestion);
    /** Save the updated course */
    const updatedCourse = await course?.save();

    return {
      ...updatedCourse?.toObject(),
    };
  } catch (error) {
    next(error);
  }
};

/** Add Answer */
const addAnswer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { answer, contentId, courseId, questionId }: IAddAnswerData =
      req.body;

    const course = await CourseModel.findById(courseId);
    const courseContent = course?.courseData?.find((item: ICourseData) =>
      item._id?.equals(contentId)
    );

    if (!mongoose.Types.ObjectId.isValid(contentId) || !courseContent) {
      return next(
        new ErrorHandler('Invalid content Id', StatusCode.BAD_REQUEST)
      );
    }
    // TODO: Check type for item -> Add type Document of mongoose have _id

    const question = courseContent?.questions?.find((item: any) =>
      item._id?.equals(questionId)
    );

    // console.log(courseContent?.questions[0], question);

    if (!question) {
      return next(
        new ErrorHandler('This Question not found', StatusCode.BAD_REQUEST)
      );
    }
    /** Create answer object */
    const newAnswer: IAnswer = {
      user: req?.user as IUser,
      answer,
    };
    /** Add answer to course content */
    question?.questionReplies?.push(newAnswer);
    await course?.save();

    if (req.user?._id === question?.user._id) {
      // Create notification
    } else {
      const data = {
        name: question.user.name,
        title: courseContent.title,
      };
      /** Send email */
      const html = await ejs.renderFile(
        path.join(__dirname, '../mails/question-reply.ejs'),
        data
      );

      try {
        await sendMail({
          email: question?.user?.email,
          subject: 'Question Reply',
          template: 'question-reply.ejs',
          data,
        });
      } catch (error) {
        next(error);
      }
    }

    return {
      ...course?.toObject(),
    };
  } catch (error) {
    next(error);
  }
};

export {
  createCourse,
  editCourse,
  getSingleCourseById,
  getAllCourses,
  getCourseByUser,
  addQuestion,
  addAnswer,
};
