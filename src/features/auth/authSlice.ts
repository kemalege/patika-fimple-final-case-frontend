import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../app/config/axiosConfig';
import { RootState } from '../../app/store';
import { LoginInterface, userResponse } from '../../app/type';

export const initialState: LoginInterface = {
    userData: null,
    userToken: '',
    loginStatus: 'idle', // 'pending' | 'loading' | 'success' | 'failed'
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ userName, password }: { userName: string, password: string }) => {
    const response = await axios.post<userResponse>('auth/login', { userName, password });
    return {
      data: response.data,
    };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    applicationReset: () => initialState,
    logout: (state) => {
      state.userData = null;
      state.userToken = '';
      state.loginStatus = 'idle';
      localStorage.removeItem('userToken');
    },
    },
    
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loginStatus = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = 'success';
        state.userToken = action.payload.data.access_token;
        const { data } = action.payload;
        state.userData = data.data;
        localStorage.setItem('userToken', data.access_token);
      })
  },
});

export const selectUser = (state: RootState) => state.auth.userData;
export const selectUserToken = (state: RootState) => state.auth.userToken;


export const {
    applicationReset, logout
} = authSlice.actions;

export default authSlice.reducer;
