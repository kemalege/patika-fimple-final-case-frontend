export type Status = 'idle' | 'pending' | 'loading' | 'success' | 'failed';

export interface ApplicationInterface {
  pendingApplicationList: Application[];
  pendingApplicationStatus: string;

  newApplication: Application | null,
  applyToNewApplicationStatus: string;

  applicationByCode: Application | null,
  applicationByCodeStatus: Status

  addAnswerToApplication: Application | null,
  addAnswerToApplicationStatus: Status

  adjustApplicationStatus: Application | null,
  adjustApplicationStatusStatus: Status
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface Application {
  _id: string;
  status: string;
  name: string;
  surname: string;
  age: number;
  identity: number;
  answer: any[];
  code: string;
  createdAt: string;
  __v: number;
}
