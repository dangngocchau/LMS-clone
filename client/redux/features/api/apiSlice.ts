import { userLoad, userLoggedIn } from '@/redux/features/auth/authSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
  }),
  tagTypes: ['EDIT'],
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: (data) => ({
        url: 'refresh',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    loadUser: builder.query({
      query: (data) => ({
        url: 'me',
        method: 'GET',
        credentials: 'include' as const,
      }),
      providesTags: ['EDIT'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLoad({
              user: result.data.data,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
