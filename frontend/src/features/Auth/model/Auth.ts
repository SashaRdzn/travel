import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { User } from "../types";
import { useAuth } from "../../../core/Store/authStore";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL_AUTH}register`,
        data
      );
      return response.data as { user: User; token: string };
    }
  });
};
export const useLogin = () => {
  const { setUser, setToken } = useAuth();
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL_AUTH}login`,
        data
      );
      return response.data as { user: User; token: string };
    },
    onSuccess: (data) => {
      console.log(data);
      
    },
  });
};
