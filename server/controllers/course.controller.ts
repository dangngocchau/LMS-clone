import { Request, Response, NextFunction } from 'express';
import * as courseService from '../services/course.service';
import { ApiResponse } from '../utils/response';
import { StatusCode } from '../constant/StatusCode';

/** Upload Course (Create Course) */
export const uploadCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await courseService.createCourse(req, res, next);
  if (result) {
    new ApiResponse(result, StatusCode.CREATED).send(res);
  }
};

/** Edit Course */
export const editCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await courseService.editCourse(req, res, next);
  if (result) {
    new ApiResponse(result, StatusCode.OK).send(res);
  }
};

/** Get Single Course */
export const getSingleCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await courseService.getSingleCourseById(req, res, next);
  if (result) {
    new ApiResponse(result, StatusCode.OK).send(res);
  }
};

/** Get Single Course */
export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await courseService.getAllCourses(req, res, next);

  if (result) {
    new ApiResponse(result, StatusCode.OK).send(res);
  }
};

/** Get Course Content */
export const getCourseContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await courseService.getCourseByUser(req, res, next);

  if (result) {
    new ApiResponse(result, StatusCode.OK).send(res);
  }
};

/** Add Question To Course */
export const addQuestionToCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await courseService.addQuestion(req, res, next);

  if (result) {
    new ApiResponse(result, StatusCode.OK).send(res);
  }
};

/** Add Anwer To Course */
export const addAnswerToCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await courseService.addAnswer(req, res, next);

  if (result) {
    new ApiResponse(result, StatusCode.OK).send(res);
  }
};

/** Add Review To Course */
export const addReviewToCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await courseService.addReview(req, res, next);

  if (result) {
    new ApiResponse(result, StatusCode.OK).send(res);
  }
};

/** Add Reply Review To Course */
export const addReplyReviewToCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await courseService.addReplyReviewCourse(req, res, next);

  if (result) {
    new ApiResponse(result, StatusCode.OK).send(res);
  }
};
