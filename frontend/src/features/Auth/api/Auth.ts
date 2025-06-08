import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormDataForLogin, AuthResponse, ApiError, ITokens } from "../types";
import { useAuthStore } from "../../../core/Store/authStore";

const refreshToken = localStorage.getItem("refresh");

const authApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL_AUTH,
});
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: FormDataForLogin) => {
      const response = await authApi.post("register", data);
      return response.data as { success: string };
    },
  });
};

export const useLogin = () => {
  const { loginStore } = useAuthStore();

  return useMutation<AuthResponse, ApiError, FormDataForLogin>({
    mutationFn: async (data: FormDataForLogin) => {
      const response = await authApi.post<AuthResponse>("login", data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("access", data.tokens.access);
      localStorage.setItem("refresh", data.tokens.refresh);
      loginStore(data.user);
    },
  });
};

export const useAccessUpdate = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();

  return useMutation<ITokens, ApiError, void>({
    mutationFn: async () => {
      if (!refreshToken) throw new Error("No refresh token found");
      const response = await authApi.post<ITokens>("refresh", {
        refresh: refreshToken
      });
      return response.data;
    },
    onSuccess: (tokens) => {
      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);
    },
    onError: (error) => {
      console.error("Token refresh failed:", error);
      localStorage.clear();
      queryClient.clear();
      logout();
    }
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      if (!refreshToken) throw new Error("No refresh token found");
      return await authApi.post("logout", { refresh: refreshToken });
    },
    onSuccess: () => {
      localStorage.clear();
      queryClient.clear();
      logout();
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      localStorage.clear();
      queryClient.clear();
      logout();
    }
  });
};


export const useUserUpdate = () => {
  const { loginStore } = useAuthStore();
  return useMutation({
    mutationFn: async () => {
      const response = await authApi.get("me")
      return await response.data
    },
    onSuccess: (data) => {
      loginStore(data)
    },
    onError: (error) => {
      console.error(error)
    }
  });
};



