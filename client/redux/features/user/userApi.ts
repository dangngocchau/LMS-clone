import { apiSlice } from '@/redux/features/api/apiSlice';
import { updateUser } from '@/redux/features/auth/authSlice';
import {
  IChangePassword,
  IProfileEdit,
} from '@/redux/features/user/userInterface';
// import { updateUser } from '@/redux/features/user/userSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: 'update-avatar',
        method: 'PUT',
        body: { avatar },
        credentials: 'include' as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(updateUser(result?.data?.data));
        } catch (error) {
          console.log('updateAvatar error', error);
        }
      },
      // invalidatesTags: (result, error) => (error ? [] : ['EDIT']),
    }),
    editProfile: builder.mutation<any, any>({
      query: ({ name }) => ({
        url: 'update-user-info',
        method: 'PUT',
        body: { name },
        credentials: 'include' as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(updateUser(result?.data?.data));
        } catch (error) {
          console.log('editProfile error', error);
        }
      },
      // invalidatesTags: (result, error) => (error ? [] : ['EDIT']),
    }),
    updatePassword: builder.mutation<IChangePassword, Partial<IChangePassword>>(
      {
        query: ({ oldPassword, newPassword }) => ({
          url: 'update-password',
          method: 'POST',
          body: { oldPassword, newPassword },
          credentials: 'include' as const,
        }),
        // invalidatesTags: (result, error) => (error ? [] : ['EDIT']),
      }
    ),
  }),
});

export const { useUpdateAvatarMutation, useEditProfileMutation } = userApi;
