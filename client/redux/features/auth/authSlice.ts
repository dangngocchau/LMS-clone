import {
  AuthState,
  LoggedInPayload,
  RegisterPayload,
} from '@/redux/features/auth/authInterface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  token: '',
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
      state.token = '';
      state.user = '';
      state.isUserLogin = false;
    },
    userLoad: (state, action: PayloadAction<{ user: any }>) => {
      state.user = action.payload.user;
    },
    isUserLogin: (state, action: PayloadAction<{ token: string }>) => {
      state.isUserLogin = !!action.payload.token;
    },
  },
});

export const {
  userRegistration,
  userLoggedIn,
  userLoggedOut,
  userLoad,
  isUserLogin,
} = authSlice.actions;

export default authSlice.reducer;
