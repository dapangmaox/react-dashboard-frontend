export interface ApiResponse<T> {
  message: string;
  statusCode: number;
  data: T;
}

export interface Profile {
  access_token: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
}
