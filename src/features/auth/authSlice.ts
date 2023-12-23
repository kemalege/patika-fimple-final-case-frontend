import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../app/config/axiosConfig';
import { RootState } from '../../app/store';
import { LoginInterface, userResponse } from './authTypes';

export const initialState: LoginInterface = {
    userData: null,
    loginStatus: 'idle', // 'pending' | 'loading' | 'success' | 'failed'

};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string, password: string }) => {
    const response = await axios.post<userResponse>('auth/login', { username, password });
    return {
      data: response.data,
    };
  }
);

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    applicationReset: () => initialState,
    
    },
    
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loginStatus = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = 'success';
        const { data } = action.payload;
        state.userData = data.data;
      })
  },
});

export const selectApplications = (state: RootState) => state.application.pendingApplicationList;


export const {
    applicationReset
} = applicationSlice.actions;

export default applicationSlice.reducer;
