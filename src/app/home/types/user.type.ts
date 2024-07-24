export interface user {
     username: string;
     email: string;
     firstName: string;
     lastName: string;
     password: string;
}

export interface userLogin {
     email: string;
     password: string;
}

export interface loginToken {
      token: string;
      expiresInSeconds: number;
}