import { create } from "zustand";

interface SlideBarStore {
  states: Record<string, boolean>;
  toggle: (id: string) => void;
  open: (id: string) => void;
  close: (id: string) => void;
}

export const useSlideBarStore = create<SlideBarStore>((set) => ({
  states: {},

  toggle: (id) =>
    set((state) => ({
      states: {
        ...state.states,
        [id]: !state.states[id],
      },
    })),

  open: (id) =>
    set((state) => ({
      states: {
        ...state.states,
        [id]: true,
      },
    })),

  close: (id) =>
    set((state) => ({
      states: {
        ...state.states,
        [id]: false,
      },
    })),
}));
