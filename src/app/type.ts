export type Status = 'idle' | 'pending' | 'loading' | 'success' | 'failed';

export interface ApplicationInterface {
  pendingApplicationList: Application[];
  pendingApplicationStatus: string;

  newApplication: Application | null,
  applyToNewApplicationStatus: string;

  applicationByCode: Application | null,
  applicationByCodeStatus: Status
  applicationByCodeError: IError | null

  addAnswerToApplication: Application | null,
  addAnswerToApplicationStatus: Status

  adjustApplicationStatus: Application | null,
  adjustApplicationStatusStatus: Status
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface IError {
  message: string;
  code: number;
}
export interface Application {
  [key: string]: any;
  _id: string;
  status: applicationStatus;
  firstName: string;
  lastName: string;
  age: number;
  identity: number;
  applicationReason: string;
  answers: any[];
  code: string;
  createdAt: string;
  __v: number;
}

export interface ApplicationForm {
  firstName: string;
  lastName: string;
  age: number;
  identity: string;
  address: string;
  applicationReason: string;
}

export interface INavigation {
    activeTab: string;
    activeSubTab: string;
}

export interface LoginInterface {
    userData: userData | null;
    userToken: string;
    loginStatus: string;
    loginErrorMessage: string;
}

export interface userResponse {
    success: boolean
    access_token: string
    data: userData
  }
  
  export interface userData {
    _id: string
    userName: string
    role: string
  }

  export enum applicationStatus {
    Pending = 'pending',
    Rejected = 'rejected',
    Solved = 'solved'
  }
  