import { Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

interface IActivationToken {
  token: string;
  activationCode: string;
}

interface Emailoptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

interface IActivateUser {
  user: IUser;
  activationCode: string;
}

interface ILoginRequest {
  email: string;
  password: string;
}

interface ITokenOption {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: 'lax' | 'strict' | 'none' | undefined;
  secure?: boolean;
}

export {
  IUser,
  IRegistrationBody,
  IActivationToken,
  Emailoptions,
  IActivationRequest,
  IActivateUser,
  ILoginRequest,
  ITokenOption,
};
