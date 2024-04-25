import { apiSlice } from '@/redux/features/api/apiSlice';
import {
  userLoggedIn,
  userLoggedOut,
  userRegistration,
} from '@/redux/features/auth/authSlice';
import {
  IActivation,
  RegistrationData,
  RegistrationResponse,
} from '@/redux/features/auth/authInterface';
import {
  ILogin,
  IRegister,
  ISocialAuth,
} from '@/app/components/Auth/IAuth.interface';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: 'registration',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error) {
          console.log('Registration error', error);
        }
      },
    }),
    activation: builder.mutation({
      query: (activation: IActivation) => ({
        url: 'activate-user',
        method: 'POST',
        body: {
          activation_token: activation.activation_token,
          activation_code: activation.activation_code,
        },
      }),
    }),
    login: builder.mutation({
      query: (loginData: ILogin) => ({
        url: 'login',
        method: 'POST',
        body: loginData,
        credentials: 'include' as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.data.accessToken,
              user: result.data.data.user,
            })
          );
        } catch (error) {
          console.log('Login error', error);
        }
      },
    }),
    socialAuth: builder.mutation({
      query: (authData: ISocialAuth) => ({
        url: 'social-auth',
        method: 'POST',
        body: authData,
        credentials: 'include' as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.data.accessToken,
              user: result.data.data.user,
            })
          );
        } catch (error) {
          console.log('Social Auth', error);
        }
      },
    }),
    logOut: builder.query({
      query: () => ({
        url: 'logout',
        method: 'GET',
        credentials: 'include' as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error) {
          console.log('Logout error:', error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogOutQuery,
} = authApi;
