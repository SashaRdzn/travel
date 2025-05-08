import { create } from "zustand";
import { User } from "../../features/Auth/types";
import { immer } from "zustand/middleware/immer";

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
};

type AuthActions = {
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearUser: () => void;
};

export const useAuth = create<AuthState & AuthActions>()(
  immer((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    setToken: (token) => set({ token }),
    clearUser: () => set({ user: null, token: null, isAuthenticated: false }),
  }))
);
