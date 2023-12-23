export interface LoginInterface {
    userData: userData | null;
    userToken: string;
    loginStatus: string;
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
  