import { apiSlice } from '@/redux/features/api/apiSlice';
import { userRegistration } from '@/redux/features/auth/authSlice';
import {
  IActivation,
  RegistrationData,
  RegistrationResponse,
} from '@/redux/features/auth/authInterface';

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
  }),
});

export const { useRegisterMutation, useActivationMutation } = authApi;
