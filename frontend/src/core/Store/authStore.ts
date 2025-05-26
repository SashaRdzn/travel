import { create } from "zustand";

type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loginStore: (userData: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  loginStore: (userData) =>
    set({
      user: userData,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
