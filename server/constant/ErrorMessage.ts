const ErrorMessage = {
  INTERNAL_SERVER_ERROR: 'Internal server error',
  EMAIL_EXIST: 'Email already exist',
  USER_NOT_LOGIN: 'User is not Authenticated',
  ACCESS_RESOURCE: 'Please login to access this resource',
  ACCESS_TOKEN_INVALID: 'Access token is not valid',
  USER_NOT_FOUND: 'User not found',
  COULD_NOT_REFRESH_TOKEN: 'Could not refresh token',
  INVALID_OLD_PASSWORD: 'Invalid old password',
  INVALID_USER: 'Invalid user',
};

const ErrorName = {
  CastError: 'Cast Error',
  JWT: 'JsonWebTokenError',
  TokenExpired: 'TokenExpiredError',
};

export { ErrorMessage, ErrorName };
