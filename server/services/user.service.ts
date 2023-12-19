import { NextFunction, Response } from 'express';
import { StatusCode } from '../constant/StatusCode';
import UserModel from '../models/User.model';
import ErrorHandler from '../utils/ErrorHandler';
import { SuccessMessage } from '../constant/Common';

/** Get user by ID */
export const getUserById = async (id: string, next: NextFunction) => {
  try {
    const user = await UserModel.findById(id);

    return {
      ...user?.toObject(),
    };
  } catch (error: any) {
    next(new ErrorHandler(error.message, StatusCode.BAD_REQUEST));
  }
};
