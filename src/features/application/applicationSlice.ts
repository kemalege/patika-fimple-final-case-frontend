import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../app/config/axiosConfig';
import { RootState } from '../../app/store';
import { ApiResponse, Application, ApplicationInterface } from './applicationTypes';

export const initialState: ApplicationInterface = {
  pendingApplicationList: [],
  pendingApplicationStatus: 'idle', // 'pending' | 'loading' | 'success' | 'failed'
  
  newApplication: null,
  applyToNewApplicationStatus: 'idle',

  applicationByCode: null,
  applicationByCodeStatus: 'idle',

  addAnswerToApplication: null,
  addAnswerToApplicationStatus: 'idle',

  adjustApplicationStatus: null,
  adjustApplicationStatusStatus: 'idle'
  
};

// ----------------- Get Pending Application List  -----------------
export const getPendingApplications = createAsyncThunk(
  'application/getPendingApplications',
  async () => {
    const response = await axios.get<ApiResponse<Application[]>>('application/pendingApplications');
    return {
      data: response.data,
    };
  }
);

export const getApplicatonByCode = createAsyncThunk(
  'application/getApplicatonByCode',
  async (code) => {
    const response = await axios.get<ApiResponse<Application>>(`application/getApplicatonByCode/${code}`);
    return {
      data: response.data,
    };
  }
);

// ----------------- Apply To New Application -----------------
export const applyToNewApplication = createAsyncThunk(
  'application/applyToNewApplication',
  async (applicationBody) => {
    const response = await axios.post<ApiResponse<Application>>('application/applyToNewApplication', applicationBody);
    return {
      data: response.data,
    };
  }
);

// ----------------- Add Answer To Application -----------------
export const addAnswerToApplication = createAsyncThunk(
  'application/addAnswerToApplication',
  async (answer, id) => {
    const response = await axios.post<ApiResponse<Application>>(`application/answerApply/${id}`, answer);
    return {
      data: response.data,
    };
  }
);

// ----------------- Add Answer To Application -----------------
export const adjustApplicationStatus = createAsyncThunk(
  'application/adjustApplicationStatus',
  async (id) => {
    const response = await axios.post<ApiResponse<Application>>(`application/adjustStatus/${id}`);
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
      // ----------------- Get Pending Application list  -----------------
      .addCase(getPendingApplications.pending, (state) => {
        state.pendingApplicationStatus = 'loading';
      })
      .addCase(getPendingApplications.fulfilled, (state, action) => {
        state.pendingApplicationStatus = 'success';
        const { data } = action.payload;
        state.pendingApplicationList = data.data;
      })
      // ----------------- Apply To New Application  -----------------
      .addCase(applyToNewApplication.pending, (state) => {
        state.applyToNewApplicationStatus = 'loading';
      })
      .addCase(applyToNewApplication.fulfilled, (state, action) => {
        state.applyToNewApplicationStatus = 'success';
        const { data } = action.payload;
        state.newApplication = data.data;
      })
      // ----------------- Get Application By Code  -----------------
      .addCase(getApplicatonByCode.pending, (state) => {
        state.applicationByCodeStatus = 'loading';
      })
      .addCase(getApplicatonByCode.fulfilled, (state, action) => {
        state.applicationByCodeStatus = 'success';
        const { data } = action.payload;
        state.applicationByCode = data.data;
      })
       // ----------------- Add Answer to Application  -----------------
      .addCase(addAnswerToApplication.pending, (state) => {
        state.addAnswerToApplicationStatus = 'loading';
      })
      .addCase(addAnswerToApplication.fulfilled, (state, action) => {
        state.addAnswerToApplicationStatus = 'success';
        const { data } = action.payload;
        state.addAnswerToApplication = data.data;
      })
       // ----------------- Adjust Application Status  -----------------
       .addCase(adjustApplicationStatus.pending, (state) => {
        state.adjustApplicationStatusStatus = 'loading';
      })
      .addCase(adjustApplicationStatus.fulfilled, (state, action) => {
        state.adjustApplicationStatusStatus = 'success';
        const { data } = action.payload;
        state.addAnswerToApplication = data.data;
      })
  },
});

export const selectApplications = (state: RootState) => state.application.pendingApplicationList;
export const selectPendingApplicationStatus = (state: RootState) => state.application.pendingApplicationStatus;
export const selectNewApplication = (state: RootState) => state.application.newApplication;
export const selectApplyToNewApplicationStatus = (state: RootState) => state.application.applyToNewApplicationStatus;
export const selectApplicationByCode = (state: RootState) => state.application.applicationByCode;
export const selectApplicationByCodeStatus = (state: RootState) => state.application.applicationByCodeStatus;
export const selectAddAnswerToApplication = (state: RootState) => state.application.addAnswerToApplication;
export const selectAddAnswerToApplicationStatus = (state: RootState) => state.application.addAnswerToApplicationStatus;
export const selectAdjustApplicationStatus = (state: RootState) => state.application.adjustApplicationStatus;
export const selectAdjustApplicationStatusStatus = (state: RootState) => state.application.adjustApplicationStatusStatus;



export const {
    applicationReset
} = applicationSlice.actions;

export default applicationSlice.reducer;
