import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { FormDataForLogin, AuthResponse, ApiError,  } from "../types";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL_AUTH}register`,
        data
      );
      return response.data as { success: string };
    },
  });
};
export const useLogin = () => {
  return useMutation<AuthResponse, ApiError, FormDataForLogin>({
    mutationFn: async (data: FormDataForLogin) => {
      const response = await axios.post<AuthResponse>(
        `${import.meta.env.VITE_SERVER_URL_AUTH}login`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("access", data.tokens.access);
      localStorage.setItem("refresh", data.tokens.refresh);
    },
  });
};