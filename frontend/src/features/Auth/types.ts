export type User = {
  email: string;
  password: string;
  username?: string;
};

export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}