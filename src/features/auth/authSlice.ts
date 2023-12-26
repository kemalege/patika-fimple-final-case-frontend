import { createSlice, } from '@reduxjs/toolkit';
import axios from '../../app/config/axiosConfig';
import { RootState } from '../../app/store';
import { LoginInterface, userResponse } from '../../app/type';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initialState: LoginInterface = {
    userData: null,
    userToken: '',
    loginStatus: 'idle', // 'pending' | 'loading' | 'success' | 'failed'
    loginErrorMessage: '',
};

export const login = createAsyncThunk(
  'auth/login',
  ({ userName, password }: { userName: string, password: string }, thunkApi) =>
    axios.post<userResponse>('auth/login', { userName, password })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return thunkApi.rejectWithValue(error.response.data);
      })
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
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = 'failed';
        if (action.payload){
          state.loginErrorMessage = (action.payload as { message: string }).message;
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = 'success';
        state.userToken = action.payload.access_token;
        const { data, access_token } = action.payload;
        state.userData = data;
        localStorage.setItem('userToken', access_token );
      }) 
  },
});

export const selectUser = (state: RootState) => state.auth.userData; 
export const selectLoginStatus = (state: RootState) => state.auth.loginStatus; 
export const selectUserToken = (state: RootState) => state.auth.userToken;
export const selectLoginErrorMessage = (state: RootState) => state.auth.loginErrorMessage;


export const {
    applicationReset, logout
} = authSlice.actions;

export default authSlice.reducer;
