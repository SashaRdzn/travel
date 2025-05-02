// src/features/Auth/model/Auth.ts
type User = {
  email: string;
  password: string;
  name?: string;
};

export class AuthService {
  static async login(email: string, password: string): Promise<User> {
    // Реальная реализация будет делать запрос к API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ email, password });
      }, 1000);
    });
  }

  static async register(user: User): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(user);
      }, 1000);
    });
  }
}
