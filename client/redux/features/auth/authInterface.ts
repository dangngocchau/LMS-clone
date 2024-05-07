export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  token?: string;
  user: any;
  isUserLogin: boolean | null;
}

export interface RegisterPayload {
  token: string;
  user?: any;
}

export interface LoggedInPayload {
  accessToken: string;
  user: any;
}

export type RegistrationResponse = {
  message: string;
  activationToken: string;
};

export interface IActivation {
  activation_token: string;
  activation_code: string;
}

export type RegistrationData = {};
