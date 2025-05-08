import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { User } from "../types";
import { useAuth } from "../../../core/Store/authStore";

export const useRegister = () => {
  const { setUser, setToken } = useAuth();
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL_AUTH}register/`,
        data
      );
      return response.data as { user: User; token: string };
    },
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
    },
  });
};
