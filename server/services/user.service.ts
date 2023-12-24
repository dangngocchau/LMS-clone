import { NextFunction, Response, Request } from 'express';
import { StatusCode } from '../constant/StatusCode';
import UserModel from '../models/User.model';
import sendToken from '../utils/jwt';
import {
  ISocialAuthBody,
  IUpdatePassword,
  IUpdateProfilePicture,
  IUpdateUserInfo,
} from '../interfaces/interface';
import ErrorHandler from '../utils/ErrorHandler';
import { ErrorMessage } from '../constant/ErrorMessage';
import { redis } from '../utils/redis';
import { ValidateMessage } from '../constant/ValidateMessage';
import cloudinary from 'cloudinary';

/** Get user by ID */
export const getUserById = async (id: string, next: NextFunction) => {
  try {
    let user = await redis.get(id);
    if (user) {
      return JSON.parse(user);
    } else {
      user = await UserModel.findById(id);
    }
    return user;
  } catch (error: any) {
    next(error);
  }
};

/** Get user by social auth login */
export const getUserBySocialAuthLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, avatar } = req.body as ISocialAuthBody;
    const user = await UserModel.findOne({ email });

    if (!user) {
      const newUser = await UserModel.create({
        email,
        name,
        avatar,
      });
      /** User not authenticated -> Create new user */
      sendToken(newUser, StatusCode.OK, res);
    } else {
      /** User authenticated -> Next middleware with this user */
      sendToken(user, StatusCode.OK, res);
    }
  } catch (error) {
    next(error);
  }
};

/** Update User Info By Id */
export const updateUserInfoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email } = req.body as IUpdateUserInfo;
    const userId = req.user?._id;
    const user = await UserModel.findById(userId);

    if (email && user) {
      const isEmailExist = await UserModel.findOne({ email });
      /** Check email exist or not */
      if (isEmailExist) {
        return next(
          new ErrorHandler(ErrorMessage.EMAIL_EXIST, StatusCode.BAD_REQUEST)
        );
      }
      user.email = email;
    }
    /** Check email exist or not */
    if (name && user) {
      user.name = name;
    }

    /** Update user to database */
    const newUser = await user?.save();
    await redis.set(userId, JSON.stringify(user));

    return {
      ...newUser?.toObject(),
    };
  } catch (error) {
    next(error);
  }
};

/** Update Password */
export const updatePasswordById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { oldPassword, newPassword } = req.body as IUpdatePassword;
  const user = await UserModel.findById(req.user?._id).select('+password');

  if (!oldPassword || !newPassword) {
    return next(
      new ErrorHandler(
        ValidateMessage.RequireNewAndOldPassword,
        StatusCode.BAD_REQUEST
      )
    );
  }

  if (user?.password === undefined) {
    return next(
      new ErrorHandler(ErrorMessage.INVALID_USER, StatusCode.BAD_REQUEST)
    );
  }

  const isPasswordMatch = await user?.comparePassword(oldPassword);
  if (!isPasswordMatch) {
    return next(
      new ErrorHandler(
        ErrorMessage.INVALID_OLD_PASSWORD,
        StatusCode.BAD_REQUEST
      )
    );
  }

  user.password = newPassword;
  await user.save();
  await redis.set(req.user?._id, JSON.stringify(user));

  return {
    ...user.toObject(),
  };
};

/** Update Avatar ( Profile Picture ) */
export const updateProfilePictureById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { avatar } = req.body as IUpdateProfilePicture;

    const useId = req?.user?._id;
    const user = await UserModel.findById(useId);

    if (avatar && user) {
      /** If user already have avatar -> delete old avatar and update the new one */
      if (user?.avatar?.public_id) {
        await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: 'avatars',
          width: 150,
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      } else {
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: 'avatars',
          width: 150,
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }

    await user?.save();
    await redis.set(useId, JSON.stringify(user));

    return {
      ...user?.toObject(),
    };
  } catch (error) {
    next(error);
  }
};
