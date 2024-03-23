import express from 'express';
import {
  activateUser,
  deleteUser,
  getAllUsersForAdmin,
  getUserInfoById,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updatePassword,
  updateProfilePicture,
  // updatePassword,
  updateUserInfo,
  updateUserRole,
} from '../controllers/user.controller';
import {
  authorizeRoles,
  isAuthenticated,
  updateAccessToken,
} from '../middleware/auth';
import { asyncRouteHandler } from '../middleware/asyncRoute';
const userRouter = express.Router();

userRouter.get(
  '/get-users',
  isAuthenticated,
  authorizeRoles('admin'),
  getAllUsersForAdmin
);
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
userRouter.put(
  '/update-role',
  isAuthenticated,
  authorizeRoles('admin'),
  asyncRouteHandler(updateUserRole)
);
userRouter.put(
  '/delete-user/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  asyncRouteHandler(deleteUser)
);

export default userRouter;
