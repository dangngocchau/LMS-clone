import express from 'express';
import {
  activateUser,
  getUserInfoById,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updatePassword,
  updateProfilePicture,
  // updatePassword,
  updateUserInfo,
} from '../controllers/user.controller';
import { isAuthenticated, updateAccessToken } from '../middleware/auth';
import { asyncRouteHandler } from '../middleware/asyncRoute';
const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', isAuthenticated, logoutUser);
userRouter.get('/refresh', updateAccessToken);
userRouter.get('/me', isAuthenticated, asyncRouteHandler(getUserInfoById));
userRouter.post('/social-auth', asyncRouteHandler(socialAuth));
userRouter.put(
  '/update-user-info',
  isAuthenticated,
  asyncRouteHandler(updateUserInfo)
);
userRouter.post(
  '/update-password',
  isAuthenticated,
  asyncRouteHandler(updatePassword)
);
userRouter.put(
  '/update-avatar',
  isAuthenticated,
  asyncRouteHandler(updateProfilePicture)
);

export default userRouter;
