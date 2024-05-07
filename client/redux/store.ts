'use client';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/api/apiSlice';
import authSlice from '@/redux/features/auth/authSlice';
import userSlice from '@/redux/features/user/userSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    profile: userSlice,
  },
  middleware: (getDefaultMiddleeate) =>
    getDefaultMiddleeate().concat(apiSlice.middleware),
});

/** Call the refresh token on every page load  */
const initializeApp = async () => {
  await store.dispatch(
    apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
  );
  // await store.dispatch(
  //   apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
  // );
};

initializeApp();
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
