import { AxiosError } from "axios";

export interface FormDataForLogin {
  email: string;
  password: string;
}

export interface ITokens {
  access: string;
  refresh: string;
}

export interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  user: IUser;
  tokens: ITokens;
}
export interface ApiErrorResponse {
  error?: string;
}

export type ApiError = AxiosError<ApiErrorResponse>;