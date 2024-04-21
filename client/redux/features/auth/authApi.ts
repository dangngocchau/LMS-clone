import { apiSlice } from '@/redux/features/api/apiSlice';
import {
  userLoggedIn,
  userRegistration,
} from '@/redux/features/auth/authSlice';
import {
  IActivation,
  RegistrationData,
  RegistrationResponse,
} from '@/redux/features/auth/authInterface';
import { ILogin } from '@/app/components/Auth/IAuth.interface';

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
          console.log(error);
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
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useActivationMutation, useLoginMutation } =
  authApi;
