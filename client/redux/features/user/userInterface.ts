export interface IProfileEdit {
  name: string;
  email?: string;
}
export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface UserSlice {
  user: any;
}
