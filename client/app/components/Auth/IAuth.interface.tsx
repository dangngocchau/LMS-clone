export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
}
export interface ISocialAuth {
  name: string | null | undefined;
  email: string | null | undefined;
  avatar: string | null | undefined;
}
