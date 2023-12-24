require('dotenv').config();
import { Response, Request, NextFunction } from 'express';
import { ITokenOption, IUser } from '../interfaces/interface';
import { redis } from './redis';
import { ApiResponse } from './response';
import { StatusCode } from '../constant/StatusCode';
import { SuccessMessage } from '../constant/Common';

/** Parse enviroment variables to integrates with fallback values */
export const accessTokenExpired = parseInt(
  process.env.ACCESS_TOKEN_EXPIRE || '300',
  10
);
export const refreshTokenExpired = parseInt(
  process.env.REFRESH_TOKEN_EXPIRE || '1200',
  10
);

/** Option for cookies */
export const accessTokenOptions: ITokenOption = {
  expires: new Date(Date.now() + accessTokenExpired * 60 * 60 * 1000),
  maxAge: accessTokenExpired * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};
export const refreshTokenOptions: ITokenOption = {
  expires: new Date(Date.now() + refreshTokenExpired * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpired * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

const sendToken = (
  user: IUser,
  statusCode: number,
  res: Response,
  message: string = SuccessMessage.SendTokenSuccess
) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  /** Upload session to redis */
  redis.set(user._id, JSON.stringify(user) as any);

  /** Only set secure to true in production (Deploy to production) */
  if (process.env.NODE_ENV === 'production') {
    accessTokenOptions.secure = true;
  }

  res.cookie('access_token', accessToken, accessTokenOptions);
  res.cookie('refresh_token', refreshToken, refreshTokenOptions);

  const result = {
    user,
    accessToken,
  };

  new ApiResponse(result, statusCode, message).send(res);
};

export default sendToken;
