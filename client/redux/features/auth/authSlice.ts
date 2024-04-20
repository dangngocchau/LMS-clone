import {
  AuthState,
  LoggedInPayload,
  RegisterPayload,
} from '@/redux/features/auth/authInterface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  token: '',
  user: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<RegisterPayload>) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (state, action: PayloadAction<LoggedInPayload>) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = '';
      state.user = '';
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut } =
  authSlice.actions;

export default authSlice.reducer;