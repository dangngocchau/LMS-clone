import {
  userLoad,
  userLoggedIn,
  userLoggedOut,
} from '@/redux/features/auth/authSlice';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
  credentials: 'include',
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(userLoggedOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
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
              user: result?.data?.data,
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
