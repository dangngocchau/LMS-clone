import {
  AuthState,
  LoggedInPayload,
  RegisterPayload,
} from '@/redux/features/auth/authInterface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  user: '',
  isUserLogin: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<RegisterPayload>) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (state, action: PayloadAction<LoggedInPayload>) => {
      localStorage.setItem('token', action.payload.accessToken);
      state.user = action.payload.user;
      state.isUserLogin = true;
    },
    userLoggedOut: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.isUserLogin = false;
    },
    userLoad: (state, action: PayloadAction<{ user: any }>) => {
      state.user = action.payload.user;
      state.isUserLogin = true;
    },
    isUserLogin: (state, action: PayloadAction<{ token: string }>) => {
      state.isUserLogin = !!action.payload.token;
    },
    updateUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const {
  userRegistration,
  userLoggedIn,
  userLoggedOut,
  userLoad,
  isUserLogin,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;
