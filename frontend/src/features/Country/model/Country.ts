import { useQuery } from "@tanstack/react-query";
import { Country } from "../types";

export function useCountries() {
  return useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL_CATALOG}/country/`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json() as Promise<Country[]>;
    },
  });
}
