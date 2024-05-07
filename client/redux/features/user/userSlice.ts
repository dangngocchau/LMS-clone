import { UserSlice } from '@/redux/features/user/userInterface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserSlice = {
  user: '',
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

// export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
