import create from "zustand";

export const useStore = create((set) => ({
  lang: "en",

  setLang: (value) => set({ lang: value }),
}));
