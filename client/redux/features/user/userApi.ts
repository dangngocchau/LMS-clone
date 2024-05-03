import { apiSlice } from '@/redux/features/api/apiSlice';
import { IProfileEdit } from '@/redux/features/user/userInterface';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: 'update-avatar',
        method: 'PUT',
        body: { avatar },
        credentials: 'include' as const,
      }),
      invalidatesTags: (result, error) => (error ? [] : ['EDIT']),
    }),
    editProfile: builder.mutation<IProfileEdit, Partial<IProfileEdit>>({
      query: ({ name }) => ({
        url: 'update-user-info',
        method: 'PUT',
        body: { name },
        credentials: 'include' as const,
      }),
      invalidatesTags: (result, error) => (error ? [] : ['EDIT']),
    }),
  }),
});

export const { useUpdateAvatarMutation, useEditProfileMutation } = userApi;
