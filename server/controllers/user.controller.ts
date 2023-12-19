import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/User.model';
require('dotenv').config();
import {
  IActivateUser,
  IActivationRequest,
  IActivationToken,
  ILoginRequest,
  IRegistrationBody,
  IUser,
} from '../interfaces/interface';
import ErrorHandler from '../utils/ErrorHandler';
import { CatchAsyncError } from '../middleware/catchAsyncError';
import { StatusCode } from '../constant/StatusCode';
import { ErrorMessage } from '../constant/ErrorMessage';
import jwt, { Secret } from 'jsonwebtoken';
import ejs from 'ejs';
import path from 'path';
import sendMail from '../utils/sendMail';
import { ValidateMessage } from '../constant/ValidateMessage';
import sendToken from '../utils/jwt';
import { SuccessMessage } from '../constant/Common';
import { redis } from '../utils/redis';
import { getUserById } from '../services/user.service';
import { ApiResponse } from '../utils/response';

/** Register User */
export const registrationUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const isEmailExist = await UserModel.findOne({ email });
      /** Check if email exist */
      if (isEmailExist) {
        return next(
          new ErrorHandler(ErrorMessage.EMAIL_EXIST, StatusCode.BAD_REQUEST)
        );
      }

      const user: IRegistrationBody = {
        name,
        email,
        password,
      };

      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;

      const data = {
        user: {
          name: user.name,
        },
        activationCode,
      };
      /** Send html file to email in order to activate account */
      await ejs.renderFile(
        path.join(__dirname, '../mails/activation-mail.ejs'),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: 'Active your account',
          template: 'activation-mail.ejs',
          data,
        });

        res.status(StatusCode.OK).json({
          success: true,
          message: `Please check your email: ${user.email} to activate your account`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, StatusCode.BAD_REQUEST));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, StatusCode.BAD_REQUEST));
    }
  }
);

export const createActivationToken = (
  user: IRegistrationBody
): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: '5m',
    }
  );

  return { token, activationCode };
};

/** Active user register */
export const activateUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_code, activation_token } =
        req.body as IActivationRequest;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      ) as IActivateUser;

      if (newUser.activationCode !== activation_code) {
        return next(
          new ErrorHandler(
            ValidateMessage.InvalidActivationCode,
            StatusCode.BAD_REQUEST
          )
        );
      }

      const { name, email, password } = newUser.user;
      /** Check if user exist on database */
      const existUser = await UserModel.findOne({ email });
      if (existUser) {
        return next(
          new ErrorHandler(ValidateMessage.ExistUser, StatusCode.BAD_REQUEST)
        );
      }

      const user = await UserModel.create({
        name,
        email,
        password,
      });
      res.status(StatusCode.CREATED).json({
        succes: true,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, StatusCode.BAD_REQUEST));
    }
  }
);

/** Login User */
export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;

      /** Return error if invalid email or password not require */
      if (!email || !password) {
        return next(
          new ErrorHandler(
            ValidateMessage.RequireEmailOrPassword,
            StatusCode.BAD_REQUEST
          )
        );
      }

      const user = await UserModel.findOne({ email }).select('+password');

      /** Return error if invalid email or password */
      if (!user) {
        return next(
          new ErrorHandler(
            ValidateMessage.InvalidEmailOrPassword,
            StatusCode.BAD_REQUEST
          )
        );
      }

      /** Check password is match */
      const isPasswordMatch = await user.comparePassword(password);
      /** Return error if password not match */
      if (!isPasswordMatch) {
        return next(
          new ErrorHandler(
            ValidateMessage.InvalidEmailOrPassword,
            StatusCode.BAD_REQUEST
          )
        );
      }

      sendToken(user, StatusCode.OK, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, StatusCode.BAD_REQUEST));
    }
  }
);

/** Logout User */
export const logoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie('access_token', '', {
        maxAge: 1,
      });
      res.cookie('refresh_token', '', {
        maxAge: 1,
      });
      const userId = req?.user?._id || '';
      /** Delete cache on redis */
      redis.del(userId);
      res.status(StatusCode.OK).json({
        success: true,
        message: SuccessMessage.logoutUser,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, StatusCode.BAD_REQUEST));
    }
  }
);

/** Get User Info */
export const getUserInfoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req?.user?._id;
  const result = await getUserById(userId, next);
  if (result) {
    new ApiResponse(result, StatusCode.OK).send(res);
  }
};
