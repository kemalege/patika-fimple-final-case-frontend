import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../app/config/axiosConfig';
import { RootState } from '../../app/store';
import { ApiResponse, Application, ApplicationForm, ApplicationInterface, IError } from '../../app/type';

export const initialState: ApplicationInterface = {
  pendingApplicationList: [],
  pendingApplicationStatus: 'idle', // 'pending' | 'loading' | 'success' | 'failed'
  
  newApplication: null,
  applyToNewApplicationStatus: 'idle',

  applicationByCode: null,
  applicationByCodeStatus: 'idle',
  applicationByCodeError: null,

  addAnswerToApplication: null,
  addAnswerToApplicationStatus: 'idle',

  adjustApplicationStatus: null,
  adjustApplicationStatusStatus: 'idle'
  
};

// ----------------- Get Pending Application List  -----------------
export const getPendingApplications = createAsyncThunk(
  'application/getPendingApplications',
  async (_, { rejectWithValue }) => {
    return await axios
      .get<ApiResponse<Application[]>>('application/pendingApplications')
      .then(response => response.data)
      .catch(error => {
        return rejectWithValue(error.response.data);
      });
  }
);

export const getApplicationByCode = createAsyncThunk(
  'application/getApplicationByCode',
  async ({code}:{code:string}, {rejectWithValue}) => {
    return await axios.get<ApiResponse<Application>>(`application/${code}`)
    .then(response => response.data)
      .catch(error => {
        return rejectWithValue(error.response.data)
      });
  }
);

export const getApplicationById = createAsyncThunk(
  'application/getApplicationById',
  async ({id}:{id:string}, {rejectWithValue}) => {
    return await axios.get<ApiResponse<Application>>(`application/${id}`)
    .then(response => response.data)
      .catch(error => {
        return rejectWithValue(error.response.data)
      });
  }
);

// ----------------- Apply To New Application -----------------
export const applyToNewApplication = createAsyncThunk(
  'application/apply',
  async (applicationBody: ApplicationForm) => {
    const response = await axios
      .post<ApiResponse<Application>>('application/apply', applicationBody)
      return response.data;
  }
);

// ----------------- Add Answer To Application -----------------
export const addAnswerToApplication = createAsyncThunk(
  'application/addAnswerToApplication',
  async ({id, answerObj}:{id:string, answerObj:{answer: string}}, {rejectWithValue}) => {
    return await axios.post<ApiResponse<Application>>(`application/answerApply/${id}`, answerObj)
    .then(response => response.data)
      .catch(error => {
        return rejectWithValue(error.response.data);
      });
  }
);

// ----------------- Adjust Application Status -----------------
export const adjustApplicationStatus = createAsyncThunk(
  'application/adjustStatus',
  async ({id, statusObj}:{id:string, statusObj:{status: string}}, {rejectWithValue}) => {
    return await axios.post<ApiResponse<Application>>(`application/adjustStatus/${id}`, statusObj)
    .then(response => response.data)
      .catch(error => {
        return rejectWithValue(error.response.data);
      });
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
        state.pendingApplicationList = data
      })
      // ----------------- Apply To New Application  -----------------
      .addCase(applyToNewApplication.pending, (state) => {
        state.applyToNewApplicationStatus = 'loading';
      })
      .addCase(applyToNewApplication.fulfilled, (state, action) => {
        state.applyToNewApplicationStatus = 'success';
        state.newApplication = action.payload.data;
      })
      .addCase(applyToNewApplication.rejected, (state) => {
        state.applyToNewApplicationStatus = 'failed';
      })
      // ----------------- Get Application By Code  -----------------
      .addCase(getApplicationByCode.pending, (state) => {
        state.applicationByCodeStatus = 'loading';
      })
      .addCase(getApplicationByCode.fulfilled, (state, action) => {
        state.applicationByCodeStatus = 'success';
        const { data } = action.payload;
        state.applicationByCode = data
      })
      .addCase(getApplicationByCode.rejected, (state, action) => {
        state.applicationByCodeStatus = 'failed';
        state.applicationByCodeError = action.payload as IError;
      })
      // ----------------- Get Application By Id  -----------------
      // .addCase(getApplicationByCode.pending, (state) => {
      //   state.applicationByCodeStatus = 'loading';
      // })
      // .addCase(getApplicationByCode.fulfilled, (state, action) => {
      //   state.applicationByCodeStatus = 'success';
      //   const { data } = action.payload;
      //   state.applicationByCode = data
      // })
      // .addCase(getApplicationByCode.rejected, (state, action) => {
      //   state.applicationByCodeStatus = 'failed';
      //   state.applicationByCodeError = action.payload as IError;
      // })
       // ----------------- Add Answer to Application  -----------------
      .addCase(addAnswerToApplication.pending, (state) => {
        state.addAnswerToApplicationStatus = 'loading';
      })
      .addCase(addAnswerToApplication.fulfilled, (state, action) => {
        state.addAnswerToApplicationStatus = 'success';
        const { data } = action.payload;
        state.addAnswerToApplication = data
      })
       // ----------------- Adjust Application Status  -----------------
       .addCase(adjustApplicationStatus.pending, (state) => {
        state.adjustApplicationStatusStatus = 'loading';
      })
      .addCase(adjustApplicationStatus.fulfilled, (state) => {
        state.adjustApplicationStatusStatus = 'success';
      })
  },
});

export const selectPendingApplications = (state: RootState) => state.application.pendingApplicationList;
export const selectPendingApplicationStatus = (state: RootState) => state.application.pendingApplicationStatus;
export const selectNewApplication = (state: RootState) => state.application.newApplication;
export const selectApplyToNewApplicationStatus = (state: RootState) => state.application.applyToNewApplicationStatus;
export const selectApplicationByCode = (state: RootState) => state.application.applicationByCode;
export const selectApplicationByCodeStatus = (state: RootState) => state.application.applicationByCodeStatus;
export const selectApplicationByCodeError = (state: RootState) => state.application.applicationByCodeError;
export const selectAddAnswerToApplication = (state: RootState) => state.application.addAnswerToApplication;
export const selectAddAnswerToApplicationStatus = (state: RootState) => state.application.addAnswerToApplicationStatus;
export const selectAdjustApplicationStatus = (state: RootState) => state.application.adjustApplicationStatus;
export const selectAdjustApplicationStatusStatus = (state: RootState) => state.application.adjustApplicationStatusStatus;



export const {
    applicationReset
} = applicationSlice.actions;

export default applicationSlice.reducer;
