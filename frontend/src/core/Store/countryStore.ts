import { create } from "zustand";
import { Country } from "../../features/Country/types";

interface CountryStore {
  countries: Country[];
  setCountries: (countries: Country[]) => void;
  updateCountry: (id: string, newData: Partial<Country>) => void;
  deleteCountry: (id: string) => void;
}

export const useCountryStore = create<CountryStore>((set) => ({
  countries: [],
  setCountries: (countries) => set({ countries }),
  updateCountry: (id, newData) =>
    set((state) => ({
      countries: state.countries.map((country) =>
        country.id === id ? { ...country, ...newData } : country
      ),
    })),
  deleteCountry: (id) =>
    set((state) => ({
      countries: state.countries.filter((country) => country.id !== id),
    })),
}));
