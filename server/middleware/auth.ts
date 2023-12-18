import { Request, Response, NextFunction } from 'express';
import { CatchAsyncError } from './catchAsyncError';
import ErrorHandler from '../utils/ErrorHandler';
import { ErrorMessage } from '../constant/ErrorMessage';
import { StatusCode } from '../constant/StatusCode';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { redis } from '../utils/redis';
import sendToken, {
  accessTokenOptions,
  refreshTokenOptions,
} from '../utils/jwt';

/** Authenticated User */
export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req?.cookies?.access_token as string;
    /** Check user login or not */
    if (!accessToken) {
      return next(
        new ErrorHandler(ErrorMessage.ACCESS_RESOURCE, StatusCode.UNAUTHORIZED)
      );
    }

    const decoded = (await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN as string
    )) as JwtPayload;

    /** Check access token valid or not */
    if (!decoded) {
      new ErrorHandler(
        ErrorMessage.ACCESS_TOKEN_INVALID,
        StatusCode.UNAUTHORIZED
      );
    }

    const user = await redis.get(decoded.id);
    /** Check user exist */
    if (!user) {
      new ErrorHandler(ErrorMessage.USER_NOT_FOUND, StatusCode.BAD_REQUEST);
    }

    // const userJsonParse = JSON.parse(user as string);

    req.user = JSON.parse(user as string);
    next();
  }
);

/** Validate user role */
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req?.user?.role || '')) {
      return next(
        new ErrorHandler(
          `Role: ${req?.user?.role} is not allowed to access this resource`,
          StatusCode.FORBIDDEN
        )
      );
    }
    next();
  };
};

/** Update access token */
export const updateAccessToken = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      const decoded = (await jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      )) as JwtPayload;

      if (!decoded) {
        return next(
          new ErrorHandler(
            ErrorMessage.COULD_NOT_REFRESH_TOKEN,
            StatusCode.BAD_REQUEST
          )
        );
      }
      /** Check on redis ( when login take on redis ) */
      const session = await redis.get(decoded.id as string);
      if (!session) {
        return next(
          new ErrorHandler(
            ErrorMessage.COULD_NOT_REFRESH_TOKEN,
            StatusCode.BAD_REQUEST
          )
        );
      }

      const user = JSON.parse(session);
      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        {
          expiresIn: '5m',
        }
      );
      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        {
          expiresIn: '3d',
        }
      );
      res.cookie('access_token', accessToken, accessTokenOptions);
      res.cookie('refresh_token', refreshToken, refreshTokenOptions);

      res.status(StatusCode.OK).json({
        status: 'Success',
        accessToken,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, StatusCode.BAD_REQUEST));
    }
  }
);
